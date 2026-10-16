import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useProduct } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'

import type { ProductContextValue } from '../../typings/ProductContextValue'
import { useOnView } from '../../hooks/useOnView'
import { useAds } from '../../hooks/useAds'
import {
  VIEWABILITY_MIN_TIME,
  VIEWABILITY_THRESHOLD,
  getProductAdElement,
} from '../../utils/viewability'

const CSS_HANDLES = ['product-pixel-event'] as const

const PixelEvent: StorefrontFunctionComponent = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const adRef = useRef<HTMLDivElement | null>(null)
  const viewRef = useRef<HTMLElement | null>(null)

  const { handleEvents } = useAds()

  const productContextValue = useProduct() as
    | Partial<ProductContextValue>
    | undefined

  const itemId = useMemo(
    () => productContextValue?.product?.sku?.itemId ?? null,
    [productContextValue]
  )

  const onImpression = useCallback(() => {
    if (itemId) {
      handleEvents({ type: 'product', event: 'impression', itemId })
    }
  }, [handleEvents, itemId])

  const onView = useCallback(() => {
    if (itemId) {
      handleEvents({ type: 'product', event: 'view', itemId })
    }
  }, [handleEvents, itemId])

  // Must run before the view observer below is set up
  useEffect(() => {
    viewRef.current = getProductAdElement(adRef.current)
  }, [])

  useOnView({
    ref: adRef,
    onView: onImpression,
    once: true,
  })

  useOnView({
    ref: viewRef,
    onView,
    once: true,
    threshold: VIEWABILITY_THRESHOLD,
    minVisibleTime: VIEWABILITY_MIN_TIME,
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
