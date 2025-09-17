import React, { useCallback } from 'react'
import { canUseDOM } from 'vtex.render-runtime'

import { useAds } from '../../hooks/useAds'

const Conversion: React.FC = () => {
  const { handleConversion } = useAds()

  const handleEvents = useCallback(
    (event: VtexEvent) => {
      const { data } = event

      if (data.eventName === 'vtex:orderPlaced') {
        handleConversion(data)
      }
    },
    [handleConversion]
  )

  if (canUseDOM) {
    window.addEventListener('message', handleEvents)
  }

  return <></>
}

export default Conversion
