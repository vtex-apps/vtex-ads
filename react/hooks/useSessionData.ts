import { useCallback, useMemo } from 'react'
import type { SessionSuccess } from 'vtex.session-client'
import { useRenderSession } from 'vtex.session-client'
import { canUseDOM } from 'vtex.render-runtime'

function getCookie(name: string) {
  if (!canUseDOM) return null

  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))

  if (match) return match[2]

  return null
}

export const useSessionData = () => {
  const { session } = useRenderSession() as { session: SessionSuccess }

  const vtexRCMacId = getCookie('VtexRCMacIdv7')

  const sessionId = useMemo(() => vtexRCMacId || session?.id || null, [session])

  const userId = useMemo(
    () => session?.namespaces?.profile?.id?.value || null,
    [session]
  )

  // The VtexRCMacIdv7 cookie can be created after the first render, so events
  // that find no session id read it again at send time instead of reusing the
  // memoized value.
  const getSessionId = useCallback(
    () => sessionId ?? getCookie('VtexRCMacIdv7') ?? session?.id ?? null,
    [sessionId, session]
  )

  return { sessionId, userId, getSessionId }
}
