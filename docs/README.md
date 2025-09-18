# VTEX Ads APP VTEX

The installation involves the following steps:

**1** - Install the app using the VTEX CLI:

```bash
vtex install vtex.vtex-ads
```

**2** - Add the app as a theme dependency in the `manifest.json` file.

```json
{
  "dependencies": {
    "vtex.vtex-ads": "0.x"
  }
}
```

**3** - Configure the publisher ID in the VTEX admin panel.

**4** - Configure the brand ID if necessary in the VTEX admin panel.

**5** - Declare the app's blocks in the theme.

## Development Mode

> 🚧 `vtex workspace use vtexads`

All implementation should be done in the development environment. Use the vtexads workspace for testing. After validation, publish it to the store's master environment.

## Available Components

1. `vtex-ads-banner`  
   This component is responsible for requesting, displaying, and managing events related to banner-type ads. It will display a banner in the designated location.
2. `vtex-ads-shelf`  
   This component is responsible for requesting, displaying, and managing events related to product-type ads. It will create a product carousel in the designated location using native VTEX components.
3. `vtex-ads-sponsored-brands`  
   This component is responsible for displaying sponsored brand ads.
4. `vtex-ads-pixel-event`  
   This component should be used inside product cards to listen to product events (clicks, impressions, etc.).
5. `vtex-ads-conversion`  
   This component is responsible for managing conversion events. **Please consult with technical support before implementing this component.**

| For more information, visit the components page. There you can find specific documentation for each component and the properties they receive through block properties or via site editor.

> 📁 **Complete Examples**: Check the `examples/` folder for more robust and complete implementation examples that cover different scenarios and use cases.

## Displaying Ads

Add the corresponding components to the pages that will display the ads and make the necessary visual adjustments.

> It is essential to have at least a basic understanding of VTEX block declaration.

**📘 Implementation**  
Use the search page as an example.  
`store/blocks/search/`

> The file name may vary depending on the theme if it has been customized.

1. Add ad display components.

```json
{
  "vtex-ads-banner": {
    "title": "VTEX Ads Banner - search_header",
    "props": {
      "placementName": "search_header",
      "size": "leaderboard",
      "sizeMobile": "large_rectangle"
    }
  },
  "vtex-ads-sponsored-brands": {
    "title": "VTEX Ads Sponsored Brands",
    "props": {
      "placementName": "search_sponsored_brands",
      "size": "leaderboard",
      "sizeMobile": "large_rectangle"
    }
  },
  "store.search": {
    "blocks": [
      "vtex-ads-banner",
      "vtex-ads-sponsored-brands",
      "vtex-ads-shelf",
      "search-result-layout"
    ]
  }
}
```

2. If there are variations in components to handle responsiveness, follow the same procedure.

```json
{
  "my-mobile-search-component": {
    "props": {},
    "children": [
      "vtex-ads-banner",
      "vtex-ads-sponsored-brands",
      "vtex-ads-shelf",
      "another-children"
    ]
  }
}
```

## Product Event Tracking

**📘 Implementation**

To track product events (clicks, impressions, etc.), add the `vtex-ads-pixel-event` component inside your product cards.

```json
{
  "product-summary.shelf": {
    "children": [
      "vtex-ads-pixel-event",
      "product-summary-image",
      "product-summary-name",
      "product-summary-price"
    ]
  }
}
```

> The `vtex-ads-pixel-event` component should be placed as a child of the product card component to properly track user interactions.

## Notifying Conversion

**📘 Implementation**

> ⚠️ **Important**: Before implementing the conversion component, please consult with technical support to determine if it's needed for your specific use case.

You will also need to add a component to the `OrderPlaced` page to track conversion events.

1. Add the `vtex-ads-conversion` to the configuration file of the Order Placed page `store/blocks/orderplaced.jsonc`.

> The file name may vary depending on the theme if it has been customized.

```json
{
  "store.orderplaced": {
    "blocks": ["order-placed", "vtex-ads-conversion"]
  }
}
```
