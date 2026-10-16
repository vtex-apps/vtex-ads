import { act, renderHook } from '@vtex/test-tools/react'

import { useOnView } from '../hooks/useOnView'

type FakeObserver = {
  callback: (entries: Array<Partial<IntersectionObserverEntry>>) => void
  options?: IntersectionObserverInit
  observe: jest.Mock
  unobserve: jest.Mock
}

let observers: FakeObserver[] = []

const setVisibilityState = (state: 'visible' | 'hidden') => {
  Object.defineProperty(document, 'visibilityState', {
    configurable: true,
    get: () => state,
  })
}

const changeVisibility = (state: 'visible' | 'hidden') => {
  setVisibilityState(state)
  act(() => {
    document.dispatchEvent(new Event('visibilitychange'))
  })
}

const intersect = (ratio: number) => {
  act(() => {
    observers[observers.length - 1].callback([
      { isIntersecting: ratio > 0, intersectionRatio: ratio },
    ])
  })
}

const elapse = (ms: number) => {
  act(() => {
    jest.advanceTimersByTime(ms)
  })
}

const renderOnView = (options = {}) => {
  const onView = jest.fn()
  const ref = { current: document.createElement('div') }

  renderHook(() =>
    useOnView({
      ref,
      onView,
      once: true,
      threshold: 0.5,
      minVisibleTime: 1000,
      ...options,
    })
  )

  return onView
}

beforeEach(() => {
  jest.useFakeTimers()
  observers = []
  setVisibilityState('visible')

  // jsdom has no IntersectionObserver to spy on
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, jest/prefer-spy-on
  ;(window as any).IntersectionObserver = jest.fn((callback, options) => {
    const observer = {
      callback,
      options,
      observe: jest.fn(),
      unobserve: jest.fn(),
    }

    observers.push(observer)

    return observer
  })
})

afterEach(() => {
  jest.useRealTimers()
})

describe('useOnView with a viewability rule', () => {
  it('registers the threshold so the observer reports when it is crossed', () => {
    renderOnView()

    expect(observers[0].options).toEqual({ threshold: [0, 0.5] })
  })

  it('calls onView after the element stays at 50% for 1 second', () => {
    const onView = renderOnView()

    intersect(0.5)
    elapse(999)
    expect(onView).not.toHaveBeenCalled()

    elapse(1)
    expect(onView).toHaveBeenCalledTimes(1)
  })

  it('ignores an element visible below the threshold', () => {
    const onView = renderOnView()

    intersect(0.3)
    elapse(5000)

    expect(onView).not.toHaveBeenCalled()
  })

  it('restarts the count when the element leaves before 1 second', () => {
    const onView = renderOnView()

    intersect(0.8)
    elapse(600)
    intersect(0.2)
    elapse(600)
    intersect(0.8)
    elapse(600)
    expect(onView).not.toHaveBeenCalled()

    elapse(400)
    expect(onView).toHaveBeenCalledTimes(1)
  })

  it('does not count time while the page is hidden', () => {
    const onView = renderOnView()

    intersect(1)
    elapse(500)
    changeVisibility('hidden')
    elapse(5000)
    expect(onView).not.toHaveBeenCalled()

    changeVisibility('visible')
    elapse(999)
    expect(onView).not.toHaveBeenCalled()

    elapse(1)
    expect(onView).toHaveBeenCalledTimes(1)
  })

  it('does not start counting while the page is hidden', () => {
    setVisibilityState('hidden')
    const onView = renderOnView()

    intersect(1)
    elapse(5000)

    expect(onView).not.toHaveBeenCalled()
  })

  it('calls onView only once with once enabled', () => {
    const onView = renderOnView()

    intersect(1)
    elapse(1000)
    intersect(0)
    intersect(1)
    elapse(1000)

    expect(onView).toHaveBeenCalledTimes(1)
    expect(observers[0].unobserve).toHaveBeenCalled()
  })

  it('starts observing without waiting for a user interaction', () => {
    renderOnView()

    expect(observers).toHaveLength(1)
    expect(observers[0].observe).toHaveBeenCalled()
  })
})

describe('useOnView without a viewability rule', () => {
  it('keeps calling onView as soon as any pixel is visible', () => {
    const onView = renderOnView({ threshold: 0, minVisibleTime: 0 })

    expect(observers[0].options).toBeUndefined()

    intersect(0.01)

    expect(onView).toHaveBeenCalledTimes(1)
  })
})
