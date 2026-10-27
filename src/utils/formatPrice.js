import { storeConfig } from '../data/storeConfig';

/**
 * Format product price according to store configuration.
 * Strictly avoids invented prices: returns fallback status if unconfigured.
 * 
 * @param {number|null|undefined} price 
 * @param {string} customFallback
 * @returns {string} Formatted price or clean status message
 */
export function formatPrice(price, customFallback) {
  const fallback = customFallback || storeConfig.pricing.fallbackText;
  
  if (!storeConfig.pricing.hasLivePrices || price === null || price === undefined || price === '' || isNaN(price)) {
    return fallback;
  }

  const { currencySymbol, currencyCode } = storeConfig.pricing;
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode || 'USD'
    }).format(price);
  } catch {
    return `${currencySymbol || '$'}${Number(price).toFixed(2)}`;
  }
}

/**
 * Check if a product has a confirmed live price to show
 */
export function hasLivePrice(price) {
  return Boolean(
    storeConfig.pricing.hasLivePrices &&
    price !== null &&
    price !== undefined &&
    price !== '' &&
    !isNaN(price)
  );
}
