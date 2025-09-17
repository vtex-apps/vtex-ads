/* eslint-disable no-console */
import React from 'react'
import type { PropsWithChildren } from 'react'
import { defineMessages } from 'react-intl'

import SponsoredBrandsComponent from './components/SponsoredBrands'
import { VTEXAdsProvider } from './hooks/useAds'
import { useDebug } from './utils/debug'

function SponsoredBrands(
  props: PropsWithChildren<VTEXAdsSponsoredBrandsProps>
) {
  useDebug({
    name: 'Sponsored Brands',
    props,
    template: 'primary',
  })

  const isActive = props.active ?? true

  if (!isActive) return <></>

  return (
    <VTEXAdsProvider adType="sponsored_brand" {...props}>
      <SponsoredBrandsComponent
        hideHeader={props.hideHeader}
        hideLogo={props.hideLogo}
        hideBrandName={props.hideBrandName}
        hideHeadline={props.hideHeadline}
        hideDescription={props.hideDescription}
        template={props.template}
      />
    </VTEXAdsProvider>
  )
}

const messages = defineMessages({
  'sponsoredBrand.title': {
    id: 'admin/vtex-vtex-ads.sponsoredBrand.title',
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
  'sponsoredBrand.placementNameAdmin.description': {
    id: 'admin/vtex-vtex-ads.sponsoredBrand.placementNameAdmin.description',
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

SponsoredBrands.schema = {
  title: messages['sponsoredBrand.title'].id,
  type: 'object',
  properties: {
    placementName: {
      default: 'placement_sb_default',
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

export default SponsoredBrands
