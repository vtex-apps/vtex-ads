import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useAds } from '../../hooks/useAds'
import Products from './Products'
import { useProductQuery } from '../../hooks/useProductQuery'

const CSS_HANDLES = ['sponsored-products-container'] as const

function SponsoredProducts() {
  const { skuProducts } = useAds()

  const { handles } = useCssHandles(CSS_HANDLES)

  const { offers } = useProductQuery()

  return (
    <>
      {!!skuProducts?.length && (
        <section className={handles['sponsored-products-container']}>
          {!!offers && <Products products={offers} />}
        </section>
      )}
    </>
  )
}

export default SponsoredProducts
