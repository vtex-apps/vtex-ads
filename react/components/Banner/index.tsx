import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useAds } from '../../hooks/useAds'
import ItemBanner from './ItemBanner'

const CSS_HANDLES = ['banner-container'] as const

const Banner = () => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const { banners } = useAds()

  return banners?.length ? (
    <section className={handles['banner-container']}>
      {banners.map((banner) => (
        <ItemBanner data={banner} key={banner.ad_id} />
      ))}
    </section>
  ) : (
    <></>
  )
}

export default Banner
