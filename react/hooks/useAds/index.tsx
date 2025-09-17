/* eslint-disable no-console */
import React, {
  useEffect,
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react'
import { useRuntime } from 'vtex.render-runtime'

import { getNewtailMedia, postNewtailMediaConversionURL } from '../../services'
import { getUserIdByEmail } from '../../helpers/getUserId'
import { useAdsEvents } from '../useAdEvents'
import { getSkusEventData } from '../useNewtailMediaSearch/utils'
import { useRequestBody } from '../useNewtailMediaSearch/formatRequestBody'
import { useSessionData } from '../useSessionData'
import { debugTemplates } from '../../utils/debug'
import { hashEmail } from '../../utils/hash'

const NewtailMediaContext = createContext<NewtailMediaContextData | null>(
  {} as NewtailMediaContextData
)

type VTEXAdsProviderType = {
  adType: AdTypes | 'conversion'
} & NewtailMediaBannerProps

const VTEXAdsProvider: React.FC<VTEXAdsProviderType> = ({
  adType,
  children,
  placementName,
  placementNameAdmin,
  size,
  sizeAdmin,
  sizeMobile,
  sizeMobileAdmin,
  quantity,
  quantityAdmin,
  categoryName: categoryNameProps,
  categoryNameAdmin,
}) => {
  const { query: queryRaw } = useRuntime()

  const debug = useMemo(() => queryRaw?.debug ?? null, [queryRaw])

  const publisherId = window?.newtailMedia?.publisherId

  const placement =
    placementNameAdmin || placementName || `placement_${adType}_default`

  const mediaSize = sizeAdmin || size
  const mobileMediaSize = sizeMobileAdmin || sizeMobile
  const categoryName = categoryNameAdmin || categoryNameProps

  const defaultQuantity = adType === 'banner' ? 1 : 20
  const quantityAds = Number(quantityAdmin) || quantity || defaultQuantity

  const [loading, setLoading] = useState(true)

  const [products, setProducts] = useState<ProductAd[] | null>(null)
  const [productsSB, setProductsSB] = useState<
    SponsoredBrandAdProduct[] | null
  >(null)

  const [skuProducts, setSkuProducts] = useState<string[] | null>(null)
  const [banners, setBanners] = useState<BannerAd[] | null>(null)
  const [assetsSB, setAssetsSB] = useState<SponsoredBrandAd | null>(null)

  /**
   * Handle session and user id
   */
  const { sessionId, userId } = useSessionData()

  /**
   * Handle request payload
   */

  const requestBody = useRequestBody({
    placement,
    adType: adType as AdTypes,
    mediaSize,
    mobileMediaSize,
    quantityAds,
    categoryName,
  })

  const handleResponse = useCallback(
    (data: AdsResponse) => {
      const response = data?.[placement]

      if (!response) return

      if (adType === 'product') {
        const adsData = response as ProductAd[]

        setProducts(adsData)
        setSkuProducts(adsData.map((item) => item.product_sku) || null)
      }

      if (adType === 'banner') {
        const adsData = response as BannerAd[]

        setBanners(adsData)
      }

      if (adType === 'sponsored_brand') {
        const [adData] = response as SponsoredBrandAd[]
        const productsData = adData?.products
        // max products === quantityAds
        const sliceProducts = productsData?.slice(0, quantityAds) || []

        setProductsSB(productsData)
        setSkuProducts(sliceProducts.map((item) => item.product_sku) || null)
        setAssetsSB(adData || null)
      }
    },
    [adType, placement, quantityAds]
  )

  const handleRequestAds = useCallback(async () => {
    if (!sessionId || adType === 'conversion') return

    try {
      setLoading(true)

      if (!requestBody) return

      const body = {
        publisherId,
        body: requestBody,
      }

      if (debug === 'vtexads') {
        console.log(
          `%c 🚀 VTEXAdsProvider :: Request :: ${placement}`,
          debugTemplates.primary,
          body
        )
      }

      const { data } = await getNewtailMedia(body)

      if (debug === 'vtexads') {
        console.log(
          `%c 🚀 VTEXAdsProvider :: Response :: ${placement}`,
          debugTemplates.primary,
          data
        )
      }

      handleResponse(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [
    adType,
    debug,
    handleResponse,
    placement,
    publisherId,
    requestBody,
    sessionId,
  ])

  useEffect(() => {
    if (adType !== 'conversion') {
      handleRequestAds()
    }
  }, [handleRequestAds, adType])

  /**
   * Handle events
   * @function handleEvents()
   */

  const fireEvent = useCallback(
    ({ url }) => {
      const body = {
        session_id: sessionId,
      } as {
        session_id: string
        user_id: string
      }

      if (userId) {
        body.user_id = userId
      }

      navigator.sendBeacon(url, new URLSearchParams(body))
    },
    [sessionId, userId]
  )

  /**
   * Handle banner events
   * @function handleBannerClick()
   * @function handleBannrImpression()
   * @function handleBannerView()
   */

  const handleEvents = useCallback(
    ({ type, event, adId, itemId }: HandleEvents) => {
      // console.log('handleEvents', type, event, adId, itemId)

      let adData = null
      let url = null
      const eventKey = `${event}_url` as keyof EventsUrl

      if (type === 'banner') {
        adData = banners?.find((item) => item.ad_id === adId)
      }

      if (type === 'sponsored_brand') {
        adData = assetsSB
      }

      if (type === 'product' && adType === 'product') {
        adData = products?.find((item) => item.product_sku === itemId)
      }

      // Tratamento extra por estar usando o mesmo componente de produto para SB
      if (type === 'product' && adType === 'sponsored_brand') {
        adData = assetsSB?.products?.find((item) => item.product_sku === itemId)
      }

      url = adData?.[eventKey]

      !!url && fireEvent({ url })
    },
    [adType, assetsSB, banners, fireEvent, products]
  )

  /**
   * Handle product events
   */

  const { handleAdsEvents } = useAdsEvents()

  const handleProductClickOnShelf = useCallback(
    (data: OnProductClickData) => {
      const eventName = 'vtex:productClickOnShelf'

      const skusEventData = getSkusEventData?.[eventName]?.(data)

      const productsData = adType === 'product' ? products : productsSB

      let adsData: ProductAd[] | SponsoredBrandAdProduct[] | undefined

      if (adType === 'product') {
        adsData = (productsData as ProductAd[] | undefined)?.filter((ad) =>
          skusEventData.includes(ad.product_sku)
        )
      }

      if (adType === 'sponsored_brand') {
        adsData = (
          productsData as SponsoredBrandAdProduct[] | undefined
        )?.filter((ad) => skusEventData.includes(ad.product_sku))
      }

      handleAdsEvents({ ads: adsData, event: eventName })
    },
    [adType, handleAdsEvents, products, productsSB]
  )

  /**
   * Handle conversion
   */

  const handleConversion = useCallback(
    async (data: Order) => {
      if (!sessionId) {
        return
      }

      let verifiedUserId: string | null = userId

      const [email] = data.visitorContactInfo

      if (!userId) {
        await getUserIdByEmail(email)
          .then((responseUserId) => {
            verifiedUserId = responseUserId
          })
          .catch((error) => {
            console.error('Error:', error)
          })
      }

      const formatItens = (listProducts: ProductOrder[]) =>
        listProducts.map((item) => ({
          sku: item.sku,
          quantity: item.quantity,
          price: item.price,
          promotional_price: item.sellingPrice,
        })) as ConversionItem[]

      const emailHashed = await hashEmail(email)

      const body = {
        publisher_id: publisherId,
        user_id: verifiedUserId ?? emailHashed,
        email_hashed: emailHashed,
        session_id: sessionId,
        order_id: data.ordersInOrderGroup?.[0] || data.orderGroup,
        items: formatItens(data.transactionProducts),
        created_at: data.transactionDate,
        channel: 'ecommerce',
      } as ConversionBody

      const jsonData = JSON.stringify(body)
      const blobData = new Blob([jsonData], { type: 'application/json' })

      navigator.sendBeacon(postNewtailMediaConversionURL, blobData)
    },
    [publisherId, sessionId, userId]
  )

  return (
    <NewtailMediaContext.Provider
      value={{
        loading,
        products,
        productsSB,
        skuProducts,
        assetsSB,
        banners,
        placement,
        handleEvents,
        handleProductClickOnShelf,
        handleConversion,
      }}
    >
      {children}
    </NewtailMediaContext.Provider>
  )
}

function useAds(): NewtailMediaContextData {
  const context = useContext(NewtailMediaContext)

  if (!context) {
    throw new Error('useAds must be used within an VTEXAdsProvider')
  }

  return context
}

export { NewtailMediaContext, VTEXAdsProvider, useAds }
