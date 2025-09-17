import React from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'

import { useAds } from '../../../hooks/useAds'
import { handleAvailableItems } from '../../../helpers/availableitems'

interface Props {
  products: Product[]
}

const ProductShelf = ({ products }: Props) => {
  const { handleProductClickOnShelf } = useAds()

  const productAds = handleAvailableItems(products)

  return (
    <>
      {!!productAds?.length && (
        <>
          <ExtensionPoint id="rich-text" />

          <ExtensionPoint
            id="list-context.product-list-static"
            products={productAds}
            hideUnavailableItems
            actionOnProductClick={(data: OnProductClickData) =>
              handleProductClickOnShelf(data)
            }
          />
        </>
      )}
    </>
  )
}

export default ProductShelf
