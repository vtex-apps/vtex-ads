import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useAds } from '../../hooks/useAds'
import { useOnView } from '../../hooks/useOnView'
import { ImageFixedSize } from '../UI/Image'

const CSS_HANDLES = ['banner-item', 'banner-image'] as const

const ItemBanner = ({ data }: { data: BannerAd }) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const bannerRef = useRef<HTMLDivElement | null>(null)

  const { handleEvents } = useAds()

  const adId = useMemo(
    () => data.ad_id || null,

    [data]
  )

  const handleImpression = useCallback(() => {
    if (adId) {
      handleEvents({ type: 'banner', event: 'impression', adId })
    }
  }, [handleEvents, adId])

  const onView = useCallback(() => {
    if (adId) {
      handleEvents({ type: 'banner', event: 'view', adId })
    }
  }, [handleEvents, adId])

  const handleClick = useCallback(() => {
    if (adId) {
      handleEvents({ type: 'banner', event: 'click', adId })
    }
  }, [handleEvents, adId])

  useOnView({
    ref: bannerRef,
    onView,
    once: true,
    initializeOnInteraction: true,
  })

  useEffect(() => {
    handleImpression()
  }, [handleImpression])

  return (
    <div
      ref={bannerRef}
      className={`${handles['banner-item']} ${handles['banner-item']}__${data.ad_id}`}
      data-van-aid={data.ad_id}
    >
      {data.destination_url ? (
        <a href={data.destination_url} onClick={handleClick}>
          <ImageFixedSize data={data} handles={handles} prefix="banner" />
        </a>
      ) : (
        <ImageFixedSize data={data} handles={handles} prefix="banner" />
      )}
    </div>
  )
}

export default ItemBanner
