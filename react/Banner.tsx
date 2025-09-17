/* eslint-disable no-console */
import type { PropsWithChildren } from 'react'
import React from 'react'
import { defineMessages } from 'react-intl'

import { VTEXAdsProvider } from './hooks/useAds'
import Banners from './components/Banner'
import { useDebug } from './utils/debug'

function Banner(props: PropsWithChildren<NewtailMediaBannerProps>) {
  useDebug({
    name: 'Banner',
    props,
    template: 'primary',
  })

  const isActive = props.active ?? true

  if (!isActive) return <></>

  return (
    <VTEXAdsProvider adType="banner" {...props}>
      <Banners />
    </VTEXAdsProvider>
  )
}

const messages = defineMessages({
  'banner.title': {
    id: 'admin/vtex-vtex-ads.banner.title',
    defaultMessage: '',
  },
  'common.active.title': {
    id: 'admin/vtex-vtex-ads.common.active.title',
    defaultMessage: '',
  },
  'common.placementNameAdmin.title': {
    id: 'admin/vtex-vtex-ads.common.placementNameAdmin.title',
    defaultMessage: '',
  },
  'banner.placementNameAdmin.description': {
    id: 'admin/vtex-vtex-ads.banner.placementNameAdmin.description',
    defaultMessage: '',
  },
  'banner.sizeAdmin.title': {
    id: 'admin/vtex-vtex-ads.banner.sizeAdmin.title',
    defaultMessage: '',
  },
  'banner.sizeAdmin.description': {
    id: 'admin/vtex-vtex-ads.banner.sizeAdmin.description',
    defaultMessage: '',
  },
  'banner.sizeMobileAdmin.title': {
    id: 'admin/vtex-vtex-ads.banner.sizeMobileAdmin.title',
    defaultMessage: '',
  },
  'banner.sizeMobileAdmin.description': {
    id: 'admin/vtex-vtex-ads.banner.sizeMobileAdmin.description',
    defaultMessage: '',
  },
  'common.quantityAdmin.title': {
    id: 'admin/vtex-vtex-ads.common.quantityAdmin.title',
    defaultMessage: '',
  },
  'common.quantityAdmin.banner.description': {
    id: 'admin/vtex-vtex-ads.common.quantityAdmin.banner.description',
    defaultMessage: '',
  },
  'common.categoryNameAdmin.title': {
    id: 'admin/vtex-vtex-ads.common.categoryNameAdmin.title',
    defaultMessage: '',
  },
  'common.categoryNameAdmin.description': {
    id: 'admin/vtex-vtex-ads.common.categoryNameAdmin.description',
    defaultMessage: '',
  },
})

Banner.schema = {
  title: messages['banner.title'].id,
  type: 'object',
  properties: {
    placementName: {
      default: 'banner',
      isLayout: true,
      type: 'string',
    },
    size: {
      default: 'banner',
      isLayout: true,
      type: 'string',
    },
    sizeMobile: {
      default: null,
      isLayout: true,
      type: 'string',
    },
    quantity: {
      default: 1,
      isLayout: true,
      type: 'string',
    },
    categoryName: {
      default: null,
      isLayout: true,
      type: 'string',
    },
  },
}

export default Banner
