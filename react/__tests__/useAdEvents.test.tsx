import { act, renderHook } from '@vtex/test-tools/react'

import { useAdsEvents } from '../hooks/useAdEvents'
import { SESSION_ID_COOKIE } from '../hooks/useSessionData'

let mockSession: unknown

jest.mock(
  'vtex.session-client',
  () => ({ useRenderSession: () => ({ session: mockSession }) }),
  { virtual: true }
)

jest.mock('vtex.render-runtime', () => ({ canUseDOM: true }), {
  virtual: true,
})

const EVENT_URL = 'https://events.newtail-media.newtail.com.br/v1/beacon/view/1'

const sendBeacon = jest.fn()

const setSessionCookie = (value: string) => {
  document.cookie = `${SESSION_ID_COOKIE}=${value}; path=/`
}

const clearSessionCookie = () => {
  document.cookie = `${SESSION_ID_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
}

const loggedInSession = (profileId: string) => ({
  namespaces: { profile: { id: { value: profileId } } },
})

const elapse = (ms: number) => {
  act(() => {
    jest.advanceTimersByTime(ms)
  })
}

beforeEach(() => {
  jest.useFakeTimers()
  sendBeacon.mockReset()
  clearSessionCookie()
  mockSession = undefined
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

  it('sends the user id of a shopper who logs in while the event waits', () => {
    const { result, rerender } = renderHook(() => useAdsEvents())

    result.current.fireEvent({ url: EVENT_URL })
    elapse(1000)

    mockSession = loggedInSession('profile-1')
    rerender()
    setSessionCookie('mac-id')
    elapse(1000)

    expect(sendBeacon).toHaveBeenCalledTimes(1)
    expect(sendBeacon.mock.calls[0][1].toString()).toBe(
      'session_id=mac-id&user_id=profile-1'
    )
  })

  it('still sends the event after the component unmounts', () => {
    const { result, unmount } = renderHook(() => useAdsEvents())

    result.current.fireEvent({ url: EVENT_URL })
    unmount()
    setSessionCookie('mac-id')
    elapse(1000)

    expect(sendBeacon).toHaveBeenCalledTimes(1)
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
