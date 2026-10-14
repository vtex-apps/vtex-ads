/**
 * IAB/MRC display viewability standard, recommended by VTEX Ads for the view
 * event: at least 50% of the ad's pixels on screen for at least 1 continuous
 * second.
 */
export const VIEWABILITY_THRESHOLD = 0.5
export const VIEWABILITY_MIN_TIME = 1000

const PRODUCT_SUMMARY_SELECTOR = '.vtex-product-summary-2-x-container'

/**
 * Sponsored product markers are rendered inside the product summary. The
 * viewability of a product ad is the viewability of its card, so measure the
 * card when it can be found and fall back to the marker itself.
 */
export const getProductAdElement = (marker: HTMLElement | null) =>
  (marker?.closest(PRODUCT_SUMMARY_SELECTOR) as HTMLElement | null) ?? marker
