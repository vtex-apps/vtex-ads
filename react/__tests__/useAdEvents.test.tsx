import { act, renderHook } from '@vtex/test-tools/react'

import { useAdsEvents } from '../hooks/useAdEvents'

jest.mock(
  'vtex.session-client',
  () => ({ useRenderSession: () => ({ session: undefined }) }),
  { virtual: true }
)

jest.mock('vtex.render-runtime', () => ({ canUseDOM: true }), {
  virtual: true,
})

const EVENT_URL = 'https://events.newtail-media.newtail.com.br/v1/beacon/view/1'

const sendBeacon = jest.fn()

const setSessionCookie = (value: string) => {
  document.cookie = `VtexRCMacIdv7=${value}; path=/`
}

const clearSessionCookie = () => {
  document.cookie =
    'VtexRCMacIdv7=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
}

const elapse = (ms: number) => {
  act(() => {
    jest.advanceTimersByTime(ms)
  })
}

beforeEach(() => {
  jest.useFakeTimers()
  sendBeacon.mockReset()
  clearSessionCookie()
  Object.defineProperty(navigator, 'sendBeacon', {
    configurable: true,
    value: sendBeacon,
  })
})

afterEach(() => {
  jest.useRealTimers()
})

describe('useAdsEvents fireEvent', () => {
  it('sends the event right away when the session id exists', () => {
    setSessionCookie('mac-id')
    const { result } = renderHook(() => useAdsEvents())

    result.current.fireEvent({ url: EVENT_URL })

    expect(sendBeacon).toHaveBeenCalledTimes(1)
    expect(sendBeacon.mock.calls[0][0]).toBe(EVENT_URL)
    expect(sendBeacon.mock.calls[0][1].toString()).toBe('session_id=mac-id')
  })

  it('sends the event once the session cookie is created after the event fired', () => {
    const { result } = renderHook(() => useAdsEvents())

    result.current.fireEvent({ url: EVENT_URL })
    elapse(1000)
    expect(sendBeacon).not.toHaveBeenCalled()

    setSessionCookie('late-mac-id')
    elapse(1000)

    expect(sendBeacon).toHaveBeenCalledTimes(1)
    expect(sendBeacon.mock.calls[0][1].toString()).toBe(
      'session_id=late-mac-id'
    )
  })

  it('gives up after 5 attempts without a session id', () => {
    const { result } = renderHook(() => useAdsEvents())

    result.current.fireEvent({ url: EVENT_URL })
    elapse(5000)

    setSessionCookie('too-late')
    elapse(5000)

    expect(sendBeacon).not.toHaveBeenCalled()
  })
})
