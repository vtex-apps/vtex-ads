# VTEX Ads APP

This app allows you to display ads in VTEX stores in a simple and configurable way. It offers ready-to-use components to render banners, sponsored product carousels, and sponsored brand placements in strategic areas of your store.

While this app is designed to work smoothly with the VTEX Site Editor (CMS), the initial setup requires a developer. The ad blocks must first be declared in the store theme code before they become available in the Site Editor, where visual and behavioral configurations can then be adjusted as needed.

## Development Mode

> 🚧 `vtex use vtexads`

All implementation should be done in the development environment. Use the vtexads workspace for testing. After validation, publish it to the store's master environment.

## Installation

The installation involves the following steps:

### 1. Install the App via VTEX CLI

```bash
vtex install vtex.vtex-ads
```

### 2. Declare the dependency in manifest.json
Add the app as a theme dependency in the `manifest.json` file.

```json
{
  "dependencies": {
    "vtex.vtex-ads": "0.x"
  }
}
```

### 3. Link the theme
Link the theme to see the changes. `vtex link`

### 4. Configure the app

Access your store's admin panel and configure:
- Publisher ID (required)
- Brand ID (optional for multi-brand publishers)

> ⚙️ Configuration can also be done via direct link:  
> `https://{{workspace}}--{{account}}.myvtex.com/admin/apps/vtex.vtex-ads@0.0.1/setup`  
>  
> ⚠️ This link may vary depending on the **workspace** or **app version**.

Alternatively, you can access the configuration manually from the VTEX Admin:

1. Go to the side menu and click on **Apps**.
2. Then select **My Apps**.
3. Search for **VTEX Ads**.
4. Click on the app to access its configuration page.

## Available Components

1. `vtex-ads-banner`  
   This component is responsible for requesting, displaying, and managing events related to banner-type ads. It will display a banner in the designated location.
2. `vtex-ads-shelf`  
   This component is responsible for requesting, displaying, and managing events related to product-type ads. It renders a list of sponsored products using native VTEX components.  
   To ensure your theme's styling and business rules are preserved, pass a custom `list-context.product-list-static` block to wrap the shelf, and then use your theme's product card (e.g., `product-summary.shelf`) within it.  
   Refer to the usage examples section for the correct block structure.
3. `vtex-ads-sponsored-brands`  
   This component is responsible for displaying sponsored brand ads.
4. `vtex-ads-pixel-event`  
   This component should be used inside product cards to listen to product events (clicks, impressions, etc.).
5. `vtex-ads-conversion`  
   This component is responsible for managing conversion events. **Please consult with technical support before implementing this component.**

| For more information, visit the components page. There you can find specific documentation for each component and the properties they receive through block properties or via site editor.

## Block Properties

Block properties can be defined either through the site editor or directly in the block declaration in the theme. The priority will be given to the data entered in the site editor.

## VTEX Ads Banner

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

## VTEX Ads Shelf

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

## VTEX Ads Pixel Event

`vtex-ads-pixel-event`

This component should be used inside product cards to listen to product events (clicks, impressions, etc.). It enables proper tracking of user interactions with products.

## VTEX Ads Conversion

`vtex-ads-conversion`

This component is responsible for sending order data from the store to the ad platform. It is used when there is no API integration doing this.

> ⚠️ **Important**: Before implementing the conversion component, please consult with technical support to determine if it's needed for your specific use case.