type ExtendEventType =
  | {
      type: 'product'
      itemId: string
    }
  | {
      type: 'banner'
      adId: string
    }
  | {
      type: 'sponsored_brand'
      adId?: string
    }

type HandleEvents = {
  type: AdTypes
  event: 'view' | 'impression' | 'click'
  itemId?: string
  adId?: string
  ad?: ProductAd | BannerAd | SponsoredBrandAd | null | undefined
} & ExtendEventType
