# vtex-ads-app

The VTEX Ads app provides components to implement Retail Media in a Vtex store.

The app has configuration fields to enter the publisher id and brand id if necessary. The shelf, banner, and sponsored-brands components allow some edits via the site editor. The same edits can also be made via block declaration. The values from the site editor override the values declared in the block.

## Install

---

For more details on the installation, visit: [the documentation](https://vtex-ads.readme.io/reference/vtex-ads-app-install-en)

## Available Blocks

---

| Block                      | Description                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `vtex-ads-banner`          | Component to render sponsored banners according to the page context.                                          |
| `vtex-ads-sponsored-brands`| Component to render sponsored brand ads according to the page context.                                        |
| `vtex-ads-shelf`           | Component to render a carousel of sponsored products according to the page context.                           |
| `vtex-ads-pixel-event`     | Component to track product events (clicks, impressions, etc.) inside product cards.                          |
| `vtex-ads-conversion`      | Component to handle conversion events.                                                                        |

## Block Properties

---

Block properties can be defined either through the site editor or directly in the block declaration in the theme. The priority will be given to the data entered in the site editor.

## VTEX Ads Banner

---

`vtex-ads-banner`

This component renders banners on the screen. It handles the page context and queries the ad server to check if there are available banners.

#### Properties via block `isLayout: true`

Properties provided only in the block's `json` definition inside the theme.

| Prop name       | Type     | Default value              | Description                                                                                                                                                    |
| --------------- | -------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placementName` | `string` | `placement_banner_default` | Name of the placement used in the query. By default, 'placement_banner_default' will be used. Prefer the name registered on the ad platform.                   |
| `size`          | `string` | `banner`                   | Image size to be requested. Same value registered on the retail media platform.                                                                                |
| `sizeMobile`    | `string` | `null`                     | Image size to be requested when viewed on mobile devices. Same value registered on the retail media platform. If not provided, the desktop value will be used. |
| `quantity`      | `number` | `1`                        | Quantity of ads requested.                                                                                                                                     |
| `categoryName`  | `string` | `null`                     | Category name if you want to force segmentation.                                                                                                               |

#### Properties via site editor

Properties provided in the site editor.

| Prop name            | Type      | Default value | Description                                                                                                                                                    |
| -------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active`             | `boolean` | `true`        | Indicates if the placement is active.                                                                                                                          |
| `placementNameAdmin` | `string`  | `null`        | Name of the placement used in the query.                                                                                                                       |
| `sizeAdmin`          | `string`  | `null`        | Image size to be requested. Same value registered on the retail media platform.                                                                                |
| `sizeMobileAdmin`    | `string`  | `null`        | Image size to be requested when viewed on mobile devices. Same value registered on the retail media platform. If not provided, the desktop value will be used. |
| `quantityAdmin`      | `number`  | `null`        | Quantity of ads requested.                                                                                                                                     |
| `categoryNameAdmin`  | `string`  | `null`        | Category name if you want to force segmentation.                                                                                                               |

## VTEX Ads Search

---

`vtex-ads-sponsored-brands`

This component renders sponsored brand ads on the screen. It handles the page context and queries the ad server to check if there are available sponsored brand ads.

#### Properties via block `isLayout: true`

Properties available only in the block definition.

| Prop name              | Type          | Default value                                                             | Description                                                                                                                           |
| ---------------------- | ------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `quantity`             | `number`      | `20`                                                                      | Number of requested ads.                                                                                                              |
| `placementName`        | `string`      | `placement_search_default`                                                | Placement name used in the query. By default, 'placement_search_default' will be used. Prefer the name registered in the ad platform. |
| `tagText`              | `string`      | `Sponsored`                                                               | Text to be used in the tag. By default, it will be "Sponsored" with automatic translation.                                            |
| `tagClassname`         | `string`      | `newtail-sponsored-tag`                                                   | Class to be added to the HTML element of the tag.                                                                                     |
| `tagPosition`          | `[start,end]` | `start`                                                                   | Indicates if the tag should be at the start or end of the product card.                                                               |
| `parentSearchSelector` | `string`      | `.vtex-search-result-3-x-searchResultContainer #gallery-layout-container` | Indicates the container that wraps the search result. We use the _store-theme_ default.                                               |
| `onlyFirstSKU`         | `boolean`     | `false`                                                                   | Indicates if we should look at only the main SKU or all related SKUs.                                                                 |
| `sponsoredSkusAtTop`   | `boolean`     | `true`                                                                    | Indicates if we should reorder the search result. This option should not be used with infinite scroll.                                |

#### Properties via site editor

Properties available in the site editor.

| Prop name                   | Type          | Default value | Description                                                                                |
| --------------------------- | ------------- | ------------- | ------------------------------------------------------------------------------------------ |
| `quantityAdmin`             | `number`      | `null`        | Number of requested ads.                                                                   |
| `placementNameAdmin`        | `string`      | `null`        | Placement name used in the query.                                                          |
| `tagTextAdmin`              | `string`      | `null`        | Text to be used in the tag. By default, it will be "Sponsored" with automatic translation. |
| `tagClassnameAdmin`         | `string`      | `null`        | Class to be added to the HTML element of the tag.                                          |
| `tagPositionAdmin`          | `[start,end]` | `null`        | Indicates if the tag should be at the start or end of the product card.                    |
| `parentSearchSelectorAdmin` | `string`      | `null`        | Indicates the container that wraps the search result. We use the _store-theme_ default.    |
| `onlyFirstSKUAdmin`         | `boolean`     | `null`        | Indicates if we should look at only the main SKU or all related SKUs.                      |

## VTEX Ads Shelf

---

`vtex-ads-shelf`

This component creates a shelf with sponsored SKUs. It takes the page context and queries the ad server to retrieve sponsored SKUs. After the result, a query is made to the store catalog to build the product shelf.

#### Block props `isLayout: true`

Properties available only in the block definition.

| Prop name       | Type     | Default value               | Description                                                                                                                            |
| --------------- | -------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `quantity`      | `number` | `20`                        | Number of requested ads.                                                                                                               |
| `placementName` | `string` | `placement_product_default` | Placement name used in the query. By default, 'placement_product_default' will be used. Prefer the name registered in the ad platform. |
| `categoryName`  | `string` | `null`                      | Category name if you want to enforce segmentation.                                                                                     |

#### Site editor props

Properties available in the site editor.

| Prop name            | Type     | Default value | Description                                        |
| -------------------- | -------- | ------------- | -------------------------------------------------- |
| `quantityAdmin`      | `number` | `null`        | Number of requested ads.                           |
| `placementNameAdmin` | `string` | `null`        | Placement name used in the query.                  |
| `categoryNameAdmin`  | `string` | `null`        | Category name if you want to enforce segmentation. |

💡 If you need to duplicate the component or pass properties directly through the theme, it should be declared at the root of the JSON file and receive a block with the necessary components for its operation.

```json
{
  "newtail-media-shelf#component-id": {
    "title": "Newtail Shelf - top_product",
    "blocks": ["{{vendor}}.newtail-media:list-context.product-list-static"],
    "props": {
      "placementName": "top_product"
    }
  }
  // ...
}
```

## VTEX Ads Conversion

`vtex-ads-pixel-event`

This component should be used inside product cards to listen to product events (clicks, impressions, etc.). It enables proper tracking of user interactions with products.

`vtex-ads-conversion`

This component is responsible for sending order data from the store to the ad platform. It is used when there is no API integration doing this.
