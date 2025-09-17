import { useLazyQuery } from 'react-apollo'
import { useEffect, useMemo } from 'react'

import productsByIdentifier from '../../queries/productsByIdentifier.gql'
import { useAds } from '../useAds'

const getAdId = ({
  productAds,
  product,
}: {
  productAds: ProductAd[] | null
  product: Record<string, any>
}) =>
  productAds?.find((item) => item.product_sku === product?.items?.[0]?.itemId)
    ?.ad_id ?? null

const useProductQuery = () => {
  const { skuProducts, products } = useAds()

  const [
    queryBaseProductsByID,
    {
      data: baseProductsData,
      loading: loadingBaseProducts,
      called: queryBaseProductsCalled,
      refetch: baseProductsRefetch,
    },
  ] = useLazyQuery(productsByIdentifier, { notifyOnNetworkStatusChange: true })

  useEffect(() => {
    if (!!skuProducts && skuProducts.length === 0) {
      return
    }

    const executeQuery = (variables: Record<string, any>) =>
      queryBaseProductsCalled
        ? baseProductsRefetch(variables)
        : queryBaseProductsByID({ variables })

    if (skuProducts) {
      executeQuery({
        field: 'sku',
        values: skuProducts,
      })
    }
  }, [
    queryBaseProductsCalled,
    queryBaseProductsByID,
    baseProductsRefetch,
    skuProducts,
  ])

  const productsByIdentifierWithAds = useMemo(() => {
    if (loadingBaseProducts) return null

    return baseProductsData?.productsByIdentifier?.map(
      (product: Record<string, any>) => ({
        ...product,
        advertisement: {
          adId: getAdId({ productAds: products, product }),
          campaignId: null,
          adRequestId: null,
          adResponseId: null,
          actionCost: null,
        },
      })
    )
  }, [loadingBaseProducts, baseProductsData?.productsByIdentifier, products])

  return { offers: productsByIdentifierWithAds }
}

export { useProductQuery }
