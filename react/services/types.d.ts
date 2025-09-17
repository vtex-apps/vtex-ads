type AdTypes = 'product' | 'banner' | 'sponsored_brand'

type AdContext = 'home' | 'category' | 'search' | 'product_page' | 'brand_page'

type AdsResponse<T = string> =
  | {
      [key in T]: ProductAd[]
    }
  | {
      [key in T]: BannerAd[]
    }
  | {
      [key in T]: SponsoredBrandAd[]
    }

interface EventsUrl {
  click_url: string
  impression_url?: string
  view_url: string
}
type ProductAd = {
  ad_id: string
  product_sku: string
} & EventsUrl

type BannerAd = {
  ad_id: string
  media_url: string
  destination_url: string
} & EventsUrl

interface AdsRequest {
  publisherId: string
  body: RequestBody
}

type PageDataContextType =
  | AdContext
  | 'brand'
  | 'product'
  | 'category'
  | 'subcategory'
  | 'department'
  | 'route'

type CategoryContextData = {
  context: 'category'
  category_name: string | null
}

type BrandPageContextData = {
  context: 'brand_page'
  brand_name: string | null
}

type SearchContextData = {
  context: 'search'
  term: string | null
}

type HomeContextData = {
  context: 'home'
}

type ProductPageContextData = {
  context: 'product_page'
  product_sku: string
}

type RequestBody =
  | {
      skus?: string[]
      brand?: string
      session_id: string
      user_id?: string
      term?: string
      device: 'mobile' | 'desktop'
      placements: {
        [key: string]:
          | {
              quantity: number
              types: ['product']
            }
          | {
              size: string
              quantity: number
              types: ['banner']
            }
      }
    } & (
      | CategoryContextData
      | BrandPageContextData
      | SearchContextData
      | HomeContextData
      | ProductPageContextData
    )

/**
 * Conversão
 */

type ConversionItem = {
  sku: string
  quantity: number
  price: number
  promotional_price: number
}

type ConversionBody = {
  publisher_id: string
  user_id: string
  session_id: string
  order_id: string
  items: ConversionItem[]
  created_at: string
  channel: 'ecommerce'
}
interface ConversionPost {
  body: ConversionBody
}

/**
 * Response event
 */
type ResponseEvent = {
  messages: string[]
}

// SB

interface SponsoredBrandAd {
  ad_id: string
  assets: SponsoredBrandAdAsset[]
  brand_name: string
  brand_url: string
  campaign_name: string
  click_url: string
  description: string
  destination_url: string
  headline: string
  impression_url: string
  position: number
  products: SponsoredBrandAdProduct[]
  seller_id: null
  type: string
  view_url: string
}

interface SponsoredBrandAdProduct {
  click_url: string
  destination_url: string
  image_url: string
  impression_url: string
  product_metadata: SponsoredBrandAdProductmetadata
  product_name: string
  product_sku: string
  ad_id: string
  seller_id: null
  view_url: string
}

interface SponsoredBrandAdProductmetadata {
  additional_references?: string[]
  productId: string
  product_clusters: string[]
}

interface SponsoredBrandAdAsset {
  dimension: string
  type: string
  url: string
}
