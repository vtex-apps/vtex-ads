function sumAvailableQuantity(items: Item[]) {
  let totalQuantity = 0

  items.forEach((item) => {
    item.sellers.forEach((seller) => {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      totalQuantity += seller.commertialOffer.AvailableQuantity || 0
    })
  })

  return totalQuantity
}

export const handleAvailableItems = (products: Product[]) => {
  const filteredProducts = products.filter(
    (item) => !!sumAvailableQuantity(item.items)
  )

  return filteredProducts
}
