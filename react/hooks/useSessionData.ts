import { useCallback, useMemo, useRef } from 'react'
import type { SessionSuccess } from 'vtex.session-client'
import { useRenderSession } from 'vtex.session-client'
import { canUseDOM } from 'vtex.render-runtime'

export const SESSION_ID_COOKIE = 'VtexRCMacIdv7'

function getCookie(name: string) {
  if (!canUseDOM) return null

  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))

  if (match) return match[2]

  return null
}

const getProfileId = (session?: SessionSuccess) =>
  session?.namespaces?.profile?.id?.value || null

export const useSessionData = () => {
  const { session } = useRenderSession() as { session: SessionSuccess }

  const vtexRCMacId = getCookie(SESSION_ID_COOKIE)

  // The cookie is left out of the dependencies on purpose: the ads request
  // body depends on sessionId, so a value that changes after the first render
  // would fire a second request and could swap an ad already on screen.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sessionId = useMemo(() => vtexRCMacId || session?.id || null, [session])

  const userId = useMemo(() => getProfileId(session), [session])

  // Latest values for code that runs after the render that scheduled it, such
  // as event retries.
  const latest = useRef({ sessionId, session })

  latest.current = { sessionId, session }

  // The cookie can be created after the first render, so events that find no
  // session id read it again at send time instead of reusing the memoized value.
  const getSessionId = useCallback(
    () =>
      latest.current.sessionId ??
      getCookie(SESSION_ID_COOKIE) ??
      latest.current.session?.id ??
      null,
    []
  )

  // The shopper may log in while an event waits for a session id
  const getUserId = useCallback(() => getProfileId(latest.current.session), [])

  return { sessionId, userId, getSessionId, getUserId }
}
