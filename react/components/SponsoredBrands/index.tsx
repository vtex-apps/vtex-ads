/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useCallback, useEffect, useMemo } from 'react'
import { useCssHandles } from 'vtex.css-handles'

import { useAds } from '../../hooks/useAds'
import { useOnView } from '../../hooks/useOnView'
import SponsoredBrandLogo from './Logo'
import { ImageFixedSize } from '../UI/Image'
import { SponsoredBrandsContentHeader } from './ContentHeader'
import SponsoredBrandsTag from './SponsoredBrandsTag'
import { templateStyles } from './styles/templates'
import { CSS_HANDLES } from './styles/handles'
import { useProductQuery } from '../../hooks/useProductQuery'
import ProductShelf from '../UI/ProductShelf'

function SponsoredBrands({
  hideHeader,
  hideLogo,
  hideHeadline,
  hideDescription,
  hideBrandName,
  template = null,
}: SponsoredBrandsInnerProps) {
  const { handles } = useCssHandles(CSS_HANDLES)

  const { assetsSB } = useAds()

  const { offers } = useProductQuery()

  /**
   * Handle events
   */
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const { handleEvents } = useAds()

  const handleImpression = useCallback(() => {
    handleEvents({ type: 'sponsored_brand', event: 'impression' })
  }, [handleEvents])

  const onView = useCallback(() => {
    handleEvents({ type: 'sponsored_brand', event: 'view' })
  }, [handleEvents])

  const handleClick = useCallback(() => {
    handleEvents({ type: 'sponsored_brand', event: 'click' })
  }, [handleEvents])

  useOnView({
    ref: containerRef,
    onView,
    once: true,
    initializeOnInteraction: true,
  })

  useEffect(() => {
    handleImpression()
  }, [handleImpression])

  // Memos

  const hasAd = useMemo(() => {
    return !!offers && !!assetsSB
  }, [assetsSB, offers])

  return (
    <>
      {hasAd && (
        <article className={`${handles['sponsored-brands-container']} `}>
          <header
            className={`${handles['sponsored-brands-header']} flex items-end mb2`}
          >
            {!hideHeader && (
              <section
                className={`${handles['sponsored-brands-header-container']} flex items-center`}
              >
                {!hideLogo && (
                  <SponsoredBrandLogo handles={handles} assets={assetsSB} />
                )}

                <SponsoredBrandsContentHeader
                  handles={handles}
                  handleClick={handleClick}
                  hideHeadline={!!hideHeadline}
                  hideDescription={!!hideDescription}
                  hideBrandName={!!hideBrandName}
                  data={assetsSB as SponsoredBrandAd}
                />
              </section>
            )}

            <SponsoredBrandsTag handles={handles} />
          </header>

          <section
            className={`${handles['sponsored-brands-content']} flex ${
              template && templateStyles?.[template]?.contentContainer
            }`}
            ref={containerRef}
            style={{
              gap: '.5rem',
            }}
          >
            {assetsSB?.assets?.[0]?.url && (
              <section
                className={`${handles['sponsored-brands-banner-item']} ${handles['sponsored-brands-banner-item']}__${assetsSB?.ad_id} mr4`}
              >
                <a
                  href={assetsSB?.destination_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  <ImageFixedSize
                    data={{
                      media_url: assetsSB?.assets?.[0]?.url,
                      altText: assetsSB?.brand_name,
                      ad_id: assetsSB?.ad_id,
                    }}
                    handles={handles}
                    prefix="sponsored-brands-banner"
                    fixedMinWidth
                  />
                </a>
              </section>
            )}

            <section
              className={`${handles['sponsored-brands-products-container']} flex flex-auto mw-100`}
            >
              <ProductShelf products={offers} />
            </section>
          </section>
        </article>
      )}
    </>
  )
}

export default SponsoredBrands
