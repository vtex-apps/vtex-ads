import React from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'

import { handleAvailableItems } from '../../helpers/availableitems'

interface Props {
  products: Product[]
}

const SuggestedProducts = ({ products }: Props) => {
  const productAds = handleAvailableItems(products)

  return (
    <>
      {!!productAds?.length &&
        productAds.map((item) => (
          <>
            <ExtensionPoint id="rich-text" />

            <ExtensionPoint id="product-summary.shelf" product={item} />
          </>
        ))}
    </>
  )
}

export default SuggestedProducts
