import { useMemo } from 'react'
import type { SessionSuccess } from 'vtex.session-client'
import { useRenderSession } from 'vtex.session-client'
import { canUseDOM } from 'vtex.render-runtime'


function getCookie(name:string) {
  if(!canUseDOM) return null

  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  
  if (match) return match[2];

  return null;
}

export const useSessionData = () => {
  const { session } = useRenderSession() as { session: SessionSuccess }

  const vtexRCMacId = getCookie('VtexRCMacIdv7');

  const sessionId = useMemo(() => vtexRCMacId || session?.id || null, [session])
  
  const userId = useMemo(
    () => session?.namespaces?.profile?.id?.value || null,
    [session]
  )

  return { sessionId, userId }
}
