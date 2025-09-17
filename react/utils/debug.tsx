/* eslint-disable no-console */
import { useMemo } from 'react'
import { useRuntime } from 'vtex.render-runtime'

export const debugTemplates = {
  primary: 'color:white;background:#E31C58;padding:4px;border-radius:4px;',
}

type UseDebugProps = {
  name: string
  template: keyof typeof debugTemplates
  props: Record<string, unknown>
}

export const useDebug = ({ name, template, props }: UseDebugProps) => {
  const { query: queryRaw } = useRuntime()

  const safeTemplate = debugTemplates?.[template] || debugTemplates.primary

  const debugModeOn = useMemo(() => {
    const query = queryRaw?.debug ?? null

    return query === 'vtexads'
  }, [queryRaw])

  if (debugModeOn) {
    console.log(`%c 🚀 VTEX Ads :: ${name}}`, safeTemplate)
    console.log('%c 🚀 ~ props:', safeTemplate, props)
  }
}
