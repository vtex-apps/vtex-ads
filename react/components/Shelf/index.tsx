import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useAds } from '../../hooks/useAds'
import ProductShelf from '../UI/ProductShelf'
import { useProductQuery } from '../../hooks/useProductQuery'

const CSS_HANDLES = ['shelf-container'] as const

function Shelf() {
  const { handles } = useCssHandles(CSS_HANDLES)

  const { skuProducts } = useAds()

  const { offers } = useProductQuery()

  return (
    <>
      {!!skuProducts?.length && (
        <section className={handles['shelf-container']}>
          {!!offers && <ProductShelf products={offers} />}
        </section>
      )}
    </>
  )
}

export default Shelf
