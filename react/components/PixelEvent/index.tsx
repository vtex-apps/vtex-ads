import React, { useCallback, useMemo, useRef } from 'react'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'

import type { ProductContextValue } from '../../typings/ProductContextValue'
import { useOnView } from '../../hooks/useOnView'
import { useAds } from '../../hooks/useAds'

const CSS_HANDLES = ['product-pixel-event'] as const

const PixelEvent: StorefrontFunctionComponent = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const adRef = useRef<HTMLDivElement | null>(null)

  const { handleEvents } = useAds()

  const productContextValue = useProduct() as
    | Partial<ProductContextValue>
    | undefined

  const itemId = useMemo(
    () => productContextValue?.product?.sku?.itemId ?? null,
    [productContextValue]
  )

  const onView = useCallback(() => {
    if (itemId) {
      handleEvents({ type: 'product', event: 'impression', itemId })
    }
  }, [handleEvents, itemId])

  useOnView({
    ref: adRef,
    onView,
    once: true,
    initializeOnInteraction: true,
  })

  return (
    <span
      className={handles['product-pixel-event']}
      ref={adRef}
      style={{ width: 0, height: 0, zIndex: -1 }}
    />
  )
}

export default PixelEvent
