import { useCallback } from 'react'

import { useSessionData } from '../useSessionData'

type UseAdEvents = () => {
  handleAdsEvents: (props: HandleAdEvents) => void
  fireEvent: (props: { url: string }) => void
}

type HandleAdEvents = {
  event: ValidVtexEvent
  ads?: SponsoredBrandAdProduct[] | ProductAd[] | BannerAd[] | null | undefined
}

type FireEventBody =
  | {
      session_id: string
    } & {
      user_id: string
    }

export const useAdsEvents: UseAdEvents = () => {
  const { getSessionId, getUserId } = useSessionData()

  const sendEvent = useCallback(
    (finalUrl: string, sessionId: string) => {
      const body: FireEventBody = {
        session_id: sessionId,
      } as FireEventBody

      const userId = getUserId()

      if (userId) {
        body.user_id = userId
      }

      navigator.sendBeacon(finalUrl, new URLSearchParams(body))
    },
    [getUserId]
  )

  const fireEvent = useCallback(
    ({ url }: { url: string }) => {
      const sessionId = getSessionId()

      if (sessionId) {
        sendEvent(url, sessionId)

        return
      }

      // Each retry reads the session id again: a value captured when the
      // event was fired would stay empty forever.
      // The interval is not cleared on unmount on purpose: the ad was already
      // rendered, so the event must still be sent if the shopper navigates
      // away. It stops by itself after maxRetries.
      let retries = 0
      const maxRetries = 5
      const interval = setInterval(() => {
        const retrySessionId = getSessionId()

        if (retrySessionId) {
          clearInterval(interval)
          sendEvent(url, retrySessionId)

          return
        }

        retries++
        if (retries >= maxRetries) {
          clearInterval(interval)
        }
      }, 1000)
    },
    [getSessionId, sendEvent]
  )

  const handleAdsEvents = useCallback(
    ({ ads, event }: HandleAdEvents) => {
      const eventsKeys = {
        'vtex:productImpression': 'impression',
        'vtex:productView': 'view',
        'vtex:productClick': 'click',
        'vtex:productClickOnShelf': 'click',
      }

      const eventKey = eventsKeys[event]

      ads?.forEach((ad: ProductAd | BannerAd | SponsoredBrandAdProduct) => {
        let url = null
        const eventKeyUrl = `${eventKey}_url` as keyof EventsUrl

        url = ad?.[eventKeyUrl]

        !!url && fireEvent({ url })
      })
    },
    [fireEvent]
  )

  return { handleAdsEvents, fireEvent }
}
