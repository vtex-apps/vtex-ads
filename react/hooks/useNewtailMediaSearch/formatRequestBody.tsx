import { useMemo } from 'react'

import { useDeviceType } from '../useDeviceType'
import { useSessionData } from '../useSessionData'
import { usePageContext } from '../usePageContext'

type FormatRequestBodyProps = {
  skus?: string[]
  placement: string
  mediaSize?: string
  mobileMediaSize?: string
  categoryName?: string
  quantityAds?: number
  adType?: AdTypes
  forceSearchContext?: boolean
}

type FormatRequestBody = (props: FormatRequestBodyProps) => null | RequestBody

type ContextData = {
  category: CategoryContextData
  brand_page: BrandPageContextData
  search: SearchContextData
  home: HomeContextData
  product_page: ProductPageContextData
}

const adTypesKeys = {
  product: 'product',
  banner: 'banner',
  sponsored_brand: 'sponsored_brand',
} as { [key in AdTypes]: AdTypes }

export const useRequestBody: FormatRequestBody = ({
  skus,
  placement = 'search',
  quantityAds = 20,
  mediaSize,
  mobileMediaSize,
  adType = 'product',
  forceSearchContext = false,
  categoryName: categoryNameOverride,
}) => {
  const { sessionId, userId } = useSessionData()
  const { context, term, brandName, categoryName, productSKU } =
    usePageContext()

  const brandCode = window?.newtailMedia?.brandCode

  const device = useDeviceType()

  const mediaSizeByDevice =
    device === 'mobile' && mobileMediaSize ? mobileMediaSize : mediaSize

  const contextData: ContextData = useMemo(
    () => ({
      category: {
        context: 'category',
        category_name: categoryName || '',
      },
      brand_page: {
        context: 'brand_page',
        brand_name: brandName || '',
      },
      search: {
        context: 'search',
        term,
        skus,
      },
      home: {
        context: 'home',
      },
      product_page: {
        context: 'product_page',
        product_sku: productSKU,
      },
    }),
    [brandName, categoryName, productSKU, skus, term]
  )

  const contextDataFinal = useMemo(() => {
    if (forceSearchContext) {
      return { ...contextData?.[context], skus }
    }

    if (categoryNameOverride) {
      return {
        context: contextData?.[context].context,
        category_name: categoryNameOverride,
      }
    }

    return contextData?.[context]
  }, [categoryNameOverride, context, contextData, forceSearchContext, skus])

  const placementData = useMemo(
    () => ({
      [adTypesKeys.banner]: {
        size: mediaSizeByDevice,
        quantity: quantityAds,
        types: [adTypesKeys.banner],
      },
      [adTypesKeys.product]: {
        quantity: quantityAds,
        types: [adTypesKeys.product],
      },
      [adTypesKeys.sponsored_brand]: {
        size: mediaSizeByDevice,
        quantity: 1,
        types: [adTypesKeys.sponsored_brand],
      },
    }),
    [mediaSizeByDevice, quantityAds]
  )

  const body = useMemo(
    () =>
      !sessionId
        ? null
        : ({
            device,
            term,
            user_id: userId,
            session_id: sessionId,
            placements: {
              [placement]: placementData[adType],
            },
            ...contextDataFinal,
          } as RequestBody),
    [
      adType,
      contextDataFinal,
      device,
      placement,
      placementData,
      sessionId,
      term,
      userId,
    ]
  )

  if (body?.term === null) {
    delete body.term
  }

  if (body && !!brandCode?.length) {
    body.brand = brandCode
  }

  return body
}
