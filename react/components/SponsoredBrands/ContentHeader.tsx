import React, { useMemo } from 'react'

export const SponsoredBrandsContentHeader = ({
  handles,

  hideHeadline,
  hideDescription,
  handleClick,
  hideBrandName,
  data,
}: {
  handles: Record<string, string>

  hideHeadline: boolean
  hideDescription: boolean
  handleClick: () => void
  hideBrandName: boolean
  data: SponsoredBrandAd
}) => {
  const {
    brand_name: brandName,
    destination_url: destinationUrl,
    headline,
    description,
  } = data

  const buttonLabel = useMemo(() => {
    if (hideBrandName && brandName) {
      return `Veja mais de ${brandName}`
    }

    return 'Veja mais'
  }, [hideBrandName, brandName])

  return (
    <section
      className={`${handles['sponsored-brands-header-content']} flex flex-column`}
    >
      {!hideHeadline && headline && (
        <strong className={`${handles['sponsored-brands-header-headline']} f5`}>
          {headline}
        </strong>
      )}

      {!hideDescription && description && (
        <span
          className={`${handles['sponsored-brands-header-description']} f6`}
        >
          {description}
        </span>
      )}

      {destinationUrl && (
        <a
          href={destinationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${handles['sponsored-brands-header-button']}`}
          onClick={handleClick}
        >
          {buttonLabel}
        </a>
      )}
    </section>
  )
}

export default SponsoredBrandsContentHeader
