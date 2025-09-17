import React, { useEffect, useState } from 'react'

type ImageFixedSizeProps = {
  data: Partial<{
    media_url: string
    altText?: string
    ad_id: string
  }>
  handles: Record<string, string>
  prefix: string
  fixedMinWidth?: boolean
}

export const ImageFixedSize = ({
  prefix,
  data,
  handles,
  fixedMinWidth = false,
}: ImageFixedSizeProps) => {
  const [imageSize, setImageSize] = useState<{
    width: number | string
    height: number | string
  }>({
    height: 'auto',
    width: 'auto',
  })

  useEffect(() => {
    if (!data.media_url) return
    const img = new Image()

    img.src = data.media_url
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height })
    }
  }, [data.media_url])

  return (
    <>
      <style>
        {`
        .${handles[`${prefix}-item`]}__${data.ad_id} {
          max-width: ${imageSize.width}px;
          min-width: ${fixedMinWidth ? `${imageSize.width}px` : 'auto'};
          margin: 0 auto;
        }
        .${handles[`${prefix}-image`]}.vtex-ads-banner__${data.ad_id} {
          width: 100vw;
          max-width: 100%;
          height: auto;
          max-height: ${imageSize.height}px;
          margin: auto;
        }
      `}
      </style>

      <img
        src={data.media_url}
        alt={data.altText ?? 'Banner'}
        className={`${handles[`${prefix}-image`]} vtex-ads-component-banner__${
          data.ad_id
        }`}
        width={imageSize.width}
        height={imageSize.height}
      />
    </>
  )
}
