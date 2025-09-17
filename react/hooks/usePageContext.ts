/* eslint-disable no-console */
import { useMemo } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { useProduct } from 'vtex.product-context'

const AdContextKeys = {
  home: 'home',
  category: 'category',
  search: 'search',
  product_page: 'product_page',
  brand_page: 'brand_page',
} as { [key in AdContext]: AdContext }

export const usePageContext = () => {
  const { query: queryRaw, route } = useRuntime()

  const debug = useMemo(() => queryRaw?.debug ?? null, [queryRaw])

  const term = useMemo(
    () => queryRaw?._q ?? queryRaw?.termo ?? null,
    [queryRaw]
  )

  const type = route?.pageContext?.type as PageDataContextType
  const pageContextId = route?.pageContext?.id as string

  /**
   * GET Sku ID from product context
   */
  const productContext = useProduct()
  const firstProductSKU = productContext?.product?.items?.[0]?.itemId
  const productSKU = (route?.queryString?.skuId || firstProductSKU) as string

  const queryStringMap = route?.queryString?.map as string

  const context = useMemo(() => {
    const isHome = pageContextId === 'store.home'
    const isSearch = pageContextId === 'search'
    const isCategorySearch = isSearch && queryStringMap === 'category-1'

    switch (type) {
      case 'brand':
        return term ? AdContextKeys.search : AdContextKeys.brand_page

      case 'product':
        return AdContextKeys.product_page

      case 'subcategory':
        return AdContextKeys.category

      case 'department':
        return AdContextKeys.category

      default:
        if (isHome) return AdContextKeys.home
        if (isCategorySearch) return AdContextKeys.category

        return type in AdContextKeys
          ? (type as AdContext)
          : AdContextKeys.search
    }
  }, [pageContextId, queryStringMap, term, type])

  const categoryName = useMemo(() => {
    const departmentRaw = route.params?.department || route.params?.term
    const categoryRaw = route?.params?.category
    const subcategoryRaw = route?.params?.subcategory
    const isMissingCategory =
      !route?.params?.subcategory && queryStringMap === 'category-1,category-3'

    const categoryPath = () => {
      let path = ''

      if (departmentRaw) {
        path = departmentRaw.replace(/-/g, ' ')

        if (categoryRaw && !isMissingCategory) {
          path += ` > ${categoryRaw.replace(/-/g, ' ')}`

          if (subcategoryRaw) {
            path += ` > ${subcategoryRaw.replace(/-/g, ' ')}`
          }
        }

        if (isMissingCategory && categoryRaw) {
          path += ` > Undefined category`

          if (categoryRaw) {
            path += ` > ${categoryRaw.replace(/-/g, ' ')}`
          }
        }
      }

      return path
    }

    return categoryPath() || null
  }, [route, queryStringMap])

  if (debug === 'vtexads') {
    console.log(
      '%c 🚧 🚧 🚧 🚧  VTEX Ads :: usePageContext :: Context 🚧 🚧 🚧 🚧',
      'color:#E31C58;background:white;',
      route?.pageContext
    )

    console.log(
      '%c 🚧 🚧 🚧 🚧  VTEX Ads :: usePageContext :: Route 🚧 🚧 🚧 🚧',
      'color:#E31C58;background:white;',
      route
    )

    console.log(
      `%c 🚧 🚧 🚧 🚀 VTEX Ads :: usePageContext :: Formatted category`,
      'color:#E31C58;background:white;',
      categoryName
    )
  }

  const brandName = useMemo(() => route?.params?.brand || null, [route])

  return { context, term, brandName, categoryName, productSKU }
}
