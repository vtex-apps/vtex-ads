import React from 'react'

type SponsoredBrandLogoProps = {
  handles: Record<string, string>
  assets?: SponsoredBrandAd | null
}

const SponsoredBrandLogo = ({ handles, assets }: SponsoredBrandLogoProps) => {
  return assets?.brand_url ? (
    <div className={`${handles['sponsored-brands-logo-container']} flex`}>
      <img
        src={assets?.brand_url}
        alt={assets?.brand_name}
        className={`${handles['sponsored-brands-logo']} b--silver mw3 w4 h3 br3 ba b--silver mr4`}
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
  ) : (
    <></>
  )
}

export default SponsoredBrandLogo
