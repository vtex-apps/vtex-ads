# VTEX Ads APP Installation

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

### 5. Let's add some ads!
Now you need to define where your ads will appear. For each page that will display ads, add the corresponding blocks.

#### Available Components

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

### Displaying Ads

**It is essential to have at least a basic understanding of VTEX block declaration.**

> 📁 **Complete Examples**: Check the `examples/` folder for more robust and complete implementation examples that cover different scenarios and use cases.

Add the corresponding components to the pages that will display the ads and make the necessary visual adjustments.

#### 📄 Usage Examples
Use the search page as an example.  
`store/blocks/search/`

> The file name may vary depending on the theme if it has been customized.

1. Add ad display components.

```json
{
  "vtex-ads-banner#search-top-banner": {
    "title": "VTEX Ads Banner - Banner top",
    "props": {
      "placementName": "site_search_top_banner",
      "size": "leaderboard",
      "sizeMobile": "large_rectangle"
    }
  },
  "vtex-ads-sponsored-brands#search-top-sb": {
    "title": "VTEX Ads Sponsored Brands",
    "props": {
      "placementName": "site_search_top_sponsored_brands",
      "size": "leaderboard",
      "sizeMobile": "large_rectangle"
    }
  },
  "store.search": {
    "blocks": [
      "vtex-ads-banner#search-top-banner",
      "vtex-ads-sponsored-brands#search-top-sb",
      "search-result-layout"
    ]
  }
}
```

2. If there are component variations for handling responsiveness, follow the same procedure.

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

### 6. Product Event Tracking

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

### 7. Notifying Conversion

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