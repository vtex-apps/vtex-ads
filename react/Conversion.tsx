/* eslint-disable no-console */
import React from 'react'

import { VTEXAdsProvider } from './hooks/useAds'
import ConversionComponent from './components/Conversion'

const Conversion: React.FC = () => {
  return (
    <VTEXAdsProvider adType="conversion">
      <ConversionComponent />
    </VTEXAdsProvider>
  )
}

export default Conversion
