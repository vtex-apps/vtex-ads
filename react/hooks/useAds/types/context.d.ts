type PlacementName = string

type NewtailMediaContextData = {
  loading: boolean
  placement: PlacementName
  skuProducts: string[] | null
  products: ProductAd[] | null
  productsSB: SponsoredBrandAdProduct[] | null
  assetsSB: SponsoredBrandAd | null
  banners: BannerAd[] | null
  handleConversion(data: Order): void
  handleEvents(data: HandleEvents): void
  handleProductClickOnShelf: (data: OnProductClickData) => void
}
