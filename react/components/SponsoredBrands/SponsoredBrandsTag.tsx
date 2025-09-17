import React from 'react'

interface SponsoredBrandsTagProps {
  handles: Record<string, string>
  text?: string
}

const SponsoredBrandsTag: React.FC<SponsoredBrandsTagProps> = ({
  handles,
  text = 'Patrocinado',
}) => {
  return (
    <aside
      className={`${handles['sponsored-brands-label-container']} ml-auto items-end`}
    >
      <small className={`${handles['sponsored-brands-label-text']} black-50`}>
        {text}
      </small>
    </aside>
  )
}

export default SponsoredBrandsTag
