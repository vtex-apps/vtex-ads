# VTEX Ads APP

This is a **Storefront app** that allows you to display ads in VTEX stores in a simple and configurable way. It offers ready-to-use components that render banners, sponsored product carousels, and sponsored brand placements in strategic areas of your store.

> 📚 **VTEX IO Documentation**: For more information about Storefront app development, see the [official VTEX documentation](https://developers.vtex.com/docs/guides/vtex-io-documentation-1-developing-storefront-apps-using-react-and-vtex-io).

While this app is designed to work perfectly with the VTEX Site Editor (CMS), the initial setup requires a developer. The ad blocks must first be declared in the store theme code before they become available in the Site Editor, where visual and behavioral configurations can then be adjusted as needed.

## Prerequisites

Before starting the implementation, make sure you have:

- **VTEX CLI** installed and configured
- **Access to the store-theme** (theme code)
- **Developer permissions** in the VTEX account

> 📚 For more information about VTEX CLI, see the [official VTEX documentation](https://developers.vtex.com/docs/guides/vtex-io-documentation-vtex-io-cli-installation-and-command-reference).

## Development Mode

> 🚧 `vtex use vtexads`

All implementation should be done in the development environment. [Use the workspace](https://developers.vtex.com/docs/guides/vtex-io-documentation-workspace) vtexads for development. After validation, publish to the store's master environment.

## Installation

The installation involves the following steps:
1. Install the App via VTEX CLI
2. Declare the dependency in manifest.json in store-theme
3. Link the theme
4. Configure the app
5. Display ads

### 1. Install the App via VTEX CLI

```bash
vtex install vtex.vtex-ads
```

### 2. Declare the dependency in manifest.json
Add the VTEX ADS app as a dependency of store-theme in the `manifest.json` file.

```json
{
  "dependencies": {
    "vtex.vtex-ads": "0.x"
  }
}
```

### 3. Link the theme
Link the theme to see the changes in the development environment. `vtex link`

### 4. Configure the app

At this point, we have an important step to display ads. Access your store's admin panel and configure:
- Publisher ID (required)
- Brand ID (optional for multi-brand publishers)

You can access the configuration manually through VTEX Admin:

1. Go to the side menu and click on **Apps**.
2. Then select **My Apps**.
3. Search for **VTEX Ads**.
4. Click on the app to access its configuration page.

> ⚙️ Configuration can also be done via direct link:  
> `https://{{workspace}}--{{account}}.myvtex.com/admin/apps/vtex.vtex-ads@0.0.1/setup`  
>  
> ⚠️ This link may vary depending on the **workspace** or **app version**.

### 5. Handling the components
Now you need to declare the components on the pages of your theme. The components are divided into 2 classes: ad display and event notification.

⚠️ For more details, see the examples section.

#### Available Components (display and event notification)

1. Display
    1. `vtex-ads-banner`  
    Displays sponsored banners in the configured location. This component works autonomously and does not require children.

    2. `vtex-ads-shelf`  
    Displays sponsored products in shelf format. To work correctly, it needs to receive the `list-context.product-list-static`, `slider-layout` blocks and the theme's product card (`product-summary.shelf`).  
    > This structure ensures freedom to reuse styles and business rules already applied in the theme.

    3. `vtex-ads-sponsored-brands`  
    Displays sponsored brands in carousel. Also requires the `list-context.product-list-static`, `slider-layout` blocks and the theme's product card (e.g. `product-summary.shelf`).

2. Event notification
    1. `vtex-ads-pixel-event`  
    This component should be used inside product cards to listen to product events (clicks, impressions, etc.).
    2. `vtex-ads-conversion`  
    This component is responsible for managing conversion events.   
    **⚠️ Please consult technical support before implementing this component.**
 

### Displaying Ads

**⚠️ It is essential to have at least a basic understanding of VTEX block declaration.**

> 📁 **Complete Examples**: Check the `examples/` folder for standardized, more robust and complete implementation examples that cover different scenarios and use cases.

Add the corresponding components to the pages that will display the ads and make the necessary visual adjustments.

#### 📄 Usage Examples
Use the search page as an example.  
`store/blocks/search/`
> Remember, the file name may vary depending on the theme if it has been customized.

1. Banner
    ```json
        {
          "vtex-ads-banner#search-top": {
              "title": "VTEX Ads - Banner top PDP",
              "props": {
              "placementName": "site_search_top_banner", // {channel}_{context}_{position}_{type}
              "size": "1280x176", // Same size registered in the ads admin
              "sizeMobile": "634x300" // Same size registered in the ads admin
              }
          },
          "store.search": {
              "blocks": [
              "vtex-ads-banner#search-top",
              "search-result-layout"
              ]
          }
        }
    ```

2. Sponsored products
> To maintain the originality and business rules of the theme, the shelves receive some additional components: `list-context.product-list-static`, `slider-layout` and `product-summary.shelf`.
    ```json
        {
          "list-context.product-list-static#vtex-ads": {
            "blocks": ["product-summary.shelf#product-custom-ads"],
            "children": ["slider-layout#vtex-ads"],
            "title": "VTEX Ads - Product shelf - Wrapper context"
          },
          "vtex-ads-shelf#pdp-middle": {
            "title": "VTEX Ads - Product shelf middle PDP",
            "blocks": [
              "rich-text#vtex-ads-sponsored-title", // Optional
              "list-context.product-list-static#vtex-ads"
            ],
            "props": {
              "placementName": "site_search_topproduct", // {channel}_{context}_ {position}_{type}
              "quantity": 10 // Optional, default is 20
            }
          },
          "store.search": {
              "blocks": [
              "vtex-ads-shelf#pdp-middle",
              "search-result-layout"
              ]
          }
        }
    ```


3. Sponsored brands
> To maintain the originality and business rules of the theme, the shelves receive some additional components: `list-context.product-list-static`, `slider-layout` and `product-summary.shelf`.
    ```json
        {
          "list-context.product-list-static#vtex-ads": {
            "blocks": ["product-summary.shelf#product-custom-ads"],
            "children": ["slider-layout#vtex-ads"],
            "title": "VTEX Ads - Product shelf - Wrapper context"
          },
          "vtex-ads-sponsored-brands#search-top": {
            "title": "VTEX Ads - Sponsored brand",
            "blocks": ["list-context.product-list-static#vtex-ads"],
            "props": {
              "placementName": "site_search_top_sb", // {channel}_{context}_ {position}_{type}
              "sizeMobile": "450x150", // Same size registered in the ad platform
              "size": "450x225", // Same size registered in the ad platform
              "hideHeader": true // Optional
            }
          },
          "store.search": {
              "blocks": [
              "vtex-ads-sponsored-brands#search-top",
              "search-result-layout"
              ]
          }
        }
    ```

### Notifying Events

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

> The `vtex-ads-pixel-event` component should be positioned as a child of the product card component to properly track user interactions.

### Notifying Conversion

> ⚠️ **Important**: Before implementing the conversion component, please consult technical support to determine if it's necessary for your specific use case.

You will also need to add a component to the `OrderPlaced` page to track conversion events.

1. Add the `vtex-ads-conversion` to the Order Placed page configuration file `store/blocks/orderplaced.jsonc`.

> The file name may vary depending on the theme if it has been customized.

```json
{
  "store.orderplaced": {
    "blocks": ["order-placed", "vtex-ads-conversion"]
  }
}
```
