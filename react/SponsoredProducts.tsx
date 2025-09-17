/* eslint-disable no-console */
import React from 'react'
import type { PropsWithChildren } from 'react'
import { defineMessages } from 'react-intl'

import Products from './components/Products'
import { VTEXAdsProvider } from './hooks/useAds'
import { useDebug } from './utils/debug'

function SponsoredProducts(
  props: PropsWithChildren<NewtailMediaProductsProps>
) {
  useDebug({
    name: 'Sponsored products',
    props,
    template: 'primary',
  })

  const isActive = props.active ?? true

  if (!isActive) return <></>

  return (
    <VTEXAdsProvider adType="product" {...props}>
      <Products />
    </VTEXAdsProvider>
  )
}

const messages = defineMessages({
  'shelf.title': {
    id: 'admin/vtex-vtex-ads.shelf.title',
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
  'shelf.placementNameAdmin.description': {
    id: 'admin/vtex-vtex-ads.shelf.placementNameAdmin.description',
    defaultMessage: '',
  },
  'common.quantityAdmin.title': {
    id: 'admin/vtex-vtex-ads.common.quantityAdmin.title',
    defaultMessage: '',
  },
  'common.quantityAdmin.product.description': {
    id: 'admin/vtex-vtex-ads.common.quantityAdmin.product.description',
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

SponsoredProducts.schema = {
  title: messages['shelf.title'].id,
  type: 'object',
  properties: {
    placementName: {
      default: 'products',
      isLayout: true,
      type: 'string',
    },
    quantity: {
      default: 20,
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

export default SponsoredProducts
