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

## VTEX Ads Sponsored Brands

---

`vtex-ads-sponsored-brands`

This component renders sponsored brand ads on the screen. It handles the page context and queries the ad server to check if there are available sponsored brand ads.

#### Properties via block `isLayout: true`

Properties available only in the block definition.

| Prop name       | Type     | Default value              | Description                                                                                                                                                    |
| --------------- | -------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placementName` | `string` | `placement_brands_default` | Name of the placement used in the query. By default, 'placement_brands_default' will be used. Prefer the name registered on the ad platform.                   |
| `size`          | `string` | `banner`                   | Image size to be requested. Same value registered on the retail media platform.                                                                                |
| `sizeMobile`    | `string` | `null`                     | Image size to be requested when viewed on mobile devices. Same value registered on the retail media platform. If not provided, the desktop value will be used. |
| `categoryName`  | `string` | `null`                     | Category name if you want to force segmentation.                                                                                                               |

#### Properties via site editor

Properties available in the site editor.

| Prop name            | Type      | Default value | Description                                                                                                                                                    |
| -------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `active`             | `boolean` | `true`        | Indicates if the placement is active.                                                                                                                          |
| `placementNameAdmin` | `string`  | `null`        | Name of the placement used in the query.                                                                                                                       |
| `sizeAdmin`          | `string`  | `null`        | Image size to be requested. Same value registered on the retail media platform.                                                                                |
| `sizeMobileAdmin`    | `string`  | `null`        | Image size to be requested when viewed on mobile devices. Same value registered on the retail media platform. If not provided, the desktop value will be used. |
| `categoryNameAdmin`  | `string`  | `null`        | Category name if you want to force segmentation.                                                                                                               |

## VTEX Ads Pixel Event

---

`vtex-ads-pixel-event`

This component should be used inside product cards to listen to product events (clicks, impressions, etc.). It enables proper tracking of user interactions with products.

#### Properties via block `isLayout: true`

Properties available only in the block definition.

| Prop name       | Type     | Default value | Description                                        |
| --------------- | -------- | ------------- | -------------------------------------------------- |
| `placementName` | `string` | `products`    | Placement name used in the query.                  |
| `categoryName`  | `string` | `null`        | Category name if you want to enforce segmentation. |

#### Site editor props

Properties available in the site editor.

| Prop name            | Type     | Default value | Description                                        |
| -------------------- | -------- | ------------- | -------------------------------------------------- |
| `placementNameAdmin` | `string` | `null`        | Placement name used in the query.                  |
| `categoryNameAdmin`  | `string` | `null`        | Category name if you want to enforce segmentation. |

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


## VTEX Ads Conversion

`vtex-ads-pixel-event`

This component should be used inside product cards to listen to product events (clicks, impressions, etc.). It enables proper tracking of user interactions with products.

`vtex-ads-conversion`

This component is responsible for sending order data from the store to the ad platform. It is used when there is no API integration doing this.

> ⚠️ **Important**: Before implementing the conversion component, please consult with technical support to determine if it's needed for your specific use case.
