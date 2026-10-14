/** Code borrowed from vtex.render-runtime */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'

interface IntersectionEvent {
  entry: IntersectionObserverEntry
  unobserve: () => void
}

interface HookOptions {
  ref: MutableRefObject<HTMLElement | null>
  onView?: (event: IntersectionEvent) => void
  threshold?: number
  /** Time (ms) the element must stay continuously at or above `threshold`, with the page visible, before `onView` is called */
  minVisibleTime?: number
  once?: boolean
  bailOut?: boolean
  initializeOnInteraction?: boolean
}

/** Hook for detecting when an element is inside the viewport.
 * Differs from react-intersection-observer (https://www.npmjs.com/package/react-intersection-observer)
 * in that this hook doesn't use setState, using a callback approach instead, to improve
 * performance by preventing re-rendering.
 */
const useOnView = ({
  ref,
  onView,
  threshold = 0,
  minVisibleTime = 0,
  once = false,
  bailOut = false,
  initializeOnInteraction = false,
}: HookOptions) => {
  const isObserving = useRef(false)
  const didIntersect = useRef(false)

  // Keeps the latest callback without restarting the observer, which would
  // reset a running visibility timer on every re-render of the caller.
  const onViewRef = useRef(onView)

  onViewRef.current = onView

  const hasOnView = !!onView

  useEffect(() => {
    const initializeObserver = () => {
      const element = ref.current

      if (
        bailOut ||
        isObserving.current ||
        !element ||
        !hasOnView ||
        (once && didIntersect.current)
      ) {
        return () => {}
      }

      isObserving.current = true

      let isVisible = false
      let lastEntry: IntersectionObserverEntry | null = null
      let timer: ReturnType<typeof setTimeout> | null = null

      const clearTimer = () => {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
      }

      const unobserve = () => {
        clearTimer()

        if (minVisibleTime > 0) {
          document.removeEventListener(
            'visibilitychange',
            handleVisibilityChange
          )
        }

        if (isObserving.current) {
          observer.unobserve(element)
          isObserving.current = false
        }
      }

      const notify = (entry: IntersectionObserverEntry) => {
        // Entries already queued can still be delivered after unobserve()
        if (once && didIntersect.current) {
          return
        }

        if (once) {
          unobserve()
        }

        didIntersect.current = true
        onViewRef.current?.({ entry, unobserve })
      }

      const startTimer = () => {
        if (!lastEntry) {
          return
        }

        if (minVisibleTime <= 0) {
          notify(lastEntry)

          return
        }

        if (timer || document.visibilityState === 'hidden') {
          return
        }

        const entry = lastEntry

        timer = setTimeout(() => {
          timer = null
          notify(entry)
        }, minVisibleTime)
      }

      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          clearTimer()

          return
        }

        if (isVisible) {
          startTimer()
        }
      }

      // The default observer only reports crossings of 0%, so a non-zero
      // threshold has to be registered to be notified when it is crossed.
      const observer = new IntersectionObserver(
        ([entry]) => {
          lastEntry = entry
          isVisible =
            entry.isIntersecting && entry.intersectionRatio >= threshold

          if (!isVisible) {
            clearTimer()

            return
          }

          startTimer()
        },
        threshold > 0 ? { threshold: [0, threshold] } : undefined
      )

      observer.observe(element)

      if (minVisibleTime > 0) {
        document.addEventListener('visibilitychange', handleVisibilityChange)
      }

      return unobserve
    }

    if (initializeOnInteraction) {
      const cleanUpEvents = () => {
        window?.document?.removeEventListener('scroll', handleInteraction)
        window?.document?.removeEventListener('mouseover', handleInteraction)
      }

      let unobserve = () => {
        cleanUpEvents()
      }

      const handleInteraction = () => {
        cleanUpEvents()
        unobserve = initializeObserver()
      }

      window?.document?.addEventListener('scroll', handleInteraction)
      window?.document?.addEventListener('mouseover', handleInteraction)

      return unobserve
    }

    return initializeObserver()
  }, [
    bailOut,
    hasOnView,
    initializeOnInteraction,
    minVisibleTime,
    once,
    ref,
    threshold,
  ])
}

export { useOnView }
