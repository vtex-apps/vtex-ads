import React, { useCallback, useMemo, useRef } from 'react'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'

import type { ProductContextValue } from '../../typings/ProductContextValue'
import { useOnView } from '../../hooks/useOnView'
import { useAds } from '../../hooks/useAds'

const CSS_HANDLES = ['product-tag-label'] as const

const ProductSponsoredTag: StorefrontFunctionComponent = () => {
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
    <small className={handles['product-tag-label']} ref={adRef}>
      patrocinado
    </small>
  )
}

export default ProductSponsoredTag
