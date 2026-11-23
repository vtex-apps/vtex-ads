import React, { useEffect, useRef, useState } from 'react'
import { defineMessages } from 'react-intl'
// The CJS build by path: the IO bundler (webpack 4) would pick the ESM build
// through `module`, and Lit's ES2021 syntax there doesn't parse. The CJS
// build bundles Lit lowered to ES2018.
import {
  ADD_TO_CART_EVENT,
  REMOVE_FROM_CART_EVENT,
  defineVtexAdsStoryCarousel,
} from '@vtex/ads-stories/dist/cjs/index.cjs'
import type {
  StoryAddToCartEvent,
  StoryRemoveFromCartEvent,
} from '@vtex/ads-stories'
import { useRuntime } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { OrderItemsProvider, useOrderItems } from 'vtex.order-items/OrderItems'
import { useOrderForm } from 'vtex.order-manager/OrderForm'

import { useSessionData } from './hooks/useSessionData'

// Main seller of a VTEX store, for events that don't name one
const DEFAULT_SELLER = '1'

const CSS_HANDLES = ['stories-container'] as const

// The element's look, as CSS variables it reads from any ancestor
// (https://vtex.github.io/ads-js/docs/ads-stories/configuration#customization)
const APPEARANCE_VARIABLES = {
  fontFamily: '--vtex-ads-story-font-family',
  colorText: '--vtex-ads-story-color-text',
  colorMuted: '--vtex-ads-story-color-muted',
  colorSurface: '--vtex-ads-story-color-surface',
  colorAccent: '--vtex-ads-story-color-accent',
  colorAccentContrast: '--vtex-ads-story-color-accent-contrast',
  radius: '--vtex-ads-story-radius',
} as const

type Appearance = Partial<Record<keyof typeof APPEARANCE_VARIABLES, string>>

// Only the filled fields: an empty one keeps the element's default, or what
// the theme's CSS sets on the container
function appearanceStyle(appearance?: Appearance) {
  const style: Record<string, string> = {}

  if (!appearance) return style

  for (const [key, variable] of Object.entries(APPEARANCE_VARIABLES)) {
    const value = appearance[key as keyof Appearance]?.trim()

    if (value) style[variable] = value
  }

  return style
}

// Site Editor can save an emptied field: those keep the default
const numberOr = (value: unknown, fallback: number) =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback

interface Props {
  /** Editable in Site Editor: false hides the block. */
  active?: boolean
  /** Overrides the publisher ID from the app settings. */
  publisherId?: string
  placement?: string
  quantity?: number
  slideDuration?: number
  inactiveAutoplay?: boolean
  /**
   * "none" skips the price and availability request. Missing: the element
   * reads them from Intelligent Search with the account name.
   */
  hydration?: 'none'
  /** Colors, font and corners. Editable in Site Editor. */
  appearance?: Appearance
}

function AdsStoriesCarousel({
  publisherId: publisherIdProp,
  placement: placementProp,
  quantity,
  slideDuration,
  inactiveAutoplay = false,
  hydration,
  appearance,
}: Readonly<Props>) {
  const placement = placementProp?.trim() || 'home_stories'
  const { account, culture } = useRuntime()
  const { sessionId, userId } = useSessionData()
  const { addItems, updateQuantity } = useOrderItems()
  const { orderForm } = useOrderForm()
  const { handles } = useCssHandles(CSS_HANDLES)

  // State, not a ref: the listeners must be attached when the element mounts,
  // which happens only after the client registers it.
  const [carousel, setCarousel] = useState<HTMLElement | null>(null)
  const [defined, setDefined] = useState(false)
  const [publisherId, setPublisherId] = useState(publisherIdProp)

  // The cart changes after every event; the listeners read the latest one.
  const items = useRef(orderForm.items)

  items.current = orderForm.items

  // Browser only: effects don't run on the server.
  useEffect(() => {
    defineVtexAdsStoryCarousel()
    setDefined(true)
    setPublisherId(publisherIdProp || window.newtailMedia?.publisherId)
  }, [publisherIdProp])

  // The element has no cart of its own: it asks the store to change it.
  useEffect(() => {
    if (!carousel) return

    const findLine = (sku: string, seller?: string) =>
      items.current.find(
        (item) => item.id === sku && (!seller || item.seller === seller)
      )

    const onAdd = ({ detail }: StoryAddToCartEvent) => {
      const line = findLine(detail.sku, detail.seller)

      if (line) {
        updateQuantity({
          id: line.id,
          seller: line.seller,
          quantity: line.quantity + detail.quantity,
        })

        return
      }

      addItems([
        {
          id: detail.sku,
          seller: detail.seller ?? DEFAULT_SELLER,
          quantity: detail.quantity,
        },
      ])
    }

    const onRemove = ({ detail }: StoryRemoveFromCartEvent) => {
      const line = findLine(detail.sku, detail.seller)

      if (!line) return

      // Quantity 0 removes the line
      updateQuantity({
        id: line.id,
        seller: line.seller,
        quantity: Math.max(line.quantity - detail.quantity, 0),
      })
    }

    const handleAdd = (event: Event) => onAdd(event as StoryAddToCartEvent)
    const handleRemove = (event: Event) =>
      onRemove(event as StoryRemoveFromCartEvent)

    carousel.addEventListener(ADD_TO_CART_EVENT, handleAdd)
    carousel.addEventListener(REMOVE_FROM_CART_EVENT, handleRemove)

    return () => {
      carousel.removeEventListener(ADD_TO_CART_EVENT, handleAdd)
      carousel.removeEventListener(REMOVE_FROM_CART_EVENT, handleRemove)
    }
  }, [carousel, addItems, updateQuantity])

  if (!defined || !publisherId || !sessionId) return null

  // The width comes from the theme's layout (a flex-layout.row, for
  // example); the container is the hook to style it, since React 16 doesn't
  // pass className to custom elements.
  return (
    <section
      className={handles['stories-container']}
      style={appearanceStyle(appearance)}
    >
      <vtex-ads-story-carousel
        ref={setCarousel}
        lang={culture?.locale}
        publisher-id={publisherId}
        session-id={sessionId}
        user-id={userId ?? undefined}
        placement={placement}
        account-name={account}
        channel="site"
        currency={culture?.currency}
        quantity={numberOr(quantity, 8)}
        slide-duration={numberOr(slideDuration, 5000)}
        inactive-autoplay={inactiveAutoplay}
        hydration={hydration}
      />
    </section>
  )
}

function AdsStories(props: Readonly<Props>) {
  if (props.active === false) return null

  return (
    <OrderItemsProvider>
      <AdsStoriesCarousel {...props} />
    </OrderItemsProvider>
  )
}

// The IO builder sends Site Editor only the messages a component declares
// here: without this, the schema shows raw keys
const messages = defineMessages({
  'stories.title': {
    id: 'admin/vtex-vtex-ads.stories.title',
    defaultMessage: '',
  },
  'common.active.title': {
    id: 'admin/vtex-vtex-ads.common.active.title',
    defaultMessage: '',
  },
  'common.placementNameAdmin.title': {
    id: 'admin/vtex-vtex-ads.common.placementNameAdmin.title',
    defaultMessage: '',
  },
  'stories.placement.description': {
    id: 'admin/vtex-vtex-ads.stories.placement.description',
    defaultMessage: '',
  },
  'stories.quantity.title': {
    id: 'admin/vtex-vtex-ads.stories.quantity.title',
    defaultMessage: '',
  },
  'stories.quantity.description': {
    id: 'admin/vtex-vtex-ads.stories.quantity.description',
    defaultMessage: '',
  },
  'stories.slideDuration.title': {
    id: 'admin/vtex-vtex-ads.stories.slideDuration.title',
    defaultMessage: '',
  },
  'stories.slideDuration.description': {
    id: 'admin/vtex-vtex-ads.stories.slideDuration.description',
    defaultMessage: '',
  },
  'stories.inactiveAutoplay.title': {
    id: 'admin/vtex-vtex-ads.stories.inactiveAutoplay.title',
    defaultMessage: '',
  },
  'stories.inactiveAutoplay.description': {
    id: 'admin/vtex-vtex-ads.stories.inactiveAutoplay.description',
    defaultMessage: '',
  },
  'stories.appearance.title': {
    id: 'admin/vtex-vtex-ads.stories.appearance.title',
    defaultMessage: '',
  },
  'stories.appearance.description': {
    id: 'admin/vtex-vtex-ads.stories.appearance.description',
    defaultMessage: '',
  },
  'stories.appearance.fontFamily.title': {
    id: 'admin/vtex-vtex-ads.stories.appearance.fontFamily.title',
    defaultMessage: '',
  },
  'stories.appearance.fontFamily.description': {
    id: 'admin/vtex-vtex-ads.stories.appearance.fontFamily.description',
    defaultMessage: '',
  },
  'stories.appearance.colorText.title': {
    id: 'admin/vtex-vtex-ads.stories.appearance.colorText.title',
    defaultMessage: '',
  },
  'stories.appearance.colorText.description': {
    id: 'admin/vtex-vtex-ads.stories.appearance.colorText.description',
    defaultMessage: '',
  },
  'stories.appearance.colorMuted.title': {
    id: 'admin/vtex-vtex-ads.stories.appearance.colorMuted.title',
    defaultMessage: '',
  },
  'stories.appearance.colorMuted.description': {
    id: 'admin/vtex-vtex-ads.stories.appearance.colorMuted.description',
    defaultMessage: '',
  },
  'stories.appearance.colorSurface.title': {
    id: 'admin/vtex-vtex-ads.stories.appearance.colorSurface.title',
    defaultMessage: '',
  },
  'stories.appearance.colorSurface.description': {
    id: 'admin/vtex-vtex-ads.stories.appearance.colorSurface.description',
    defaultMessage: '',
  },
  'stories.appearance.colorAccent.title': {
    id: 'admin/vtex-vtex-ads.stories.appearance.colorAccent.title',
    defaultMessage: '',
  },
  'stories.appearance.colorAccent.description': {
    id: 'admin/vtex-vtex-ads.stories.appearance.colorAccent.description',
    defaultMessage: '',
  },
  'stories.appearance.colorAccentContrast.title': {
    id: 'admin/vtex-vtex-ads.stories.appearance.colorAccentContrast.title',
    defaultMessage: '',
  },
  'stories.appearance.colorAccentContrast.description': {
    id: 'admin/vtex-vtex-ads.stories.appearance.colorAccentContrast.description',
    defaultMessage: '',
  },
  'stories.appearance.radius.title': {
    id: 'admin/vtex-vtex-ads.stories.appearance.radius.title',
    defaultMessage: '',
  },
  'stories.appearance.radius.description': {
    id: 'admin/vtex-vtex-ads.stories.appearance.radius.description',
    defaultMessage: '',
  },
})

// Site Editor lists a block by its component's schema title; the editable
// fields come from the Stories definition in store/contentSchemas.json
AdsStories.schema = {
  title: messages['stories.title'].id,
}

export default AdsStories
