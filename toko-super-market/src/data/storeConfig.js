/**
 * TOKO AYSHA — CENTRAL STORE CONFIGURATION
 * 
 * Update this file with your actual store location, business hours,
 * contact info, and pricing configuration once finalized.
 * 
 * Strict Guideline: No fictional addresses, phone numbers, or prices
 * are shown to visitors until configured below.
 */

export const storeConfig = {
  // Store Branding & Identity
  storeName: "Toko Aysha",
  tagline: "Authentic Indonesian Groceries & Market",
  shortDescription: "Your trusted destination for authentic Indonesian instant noodles, pantry staples, sambal, snacks, and daily household essentials abroad.",
  
  // Top Announcement Bar
  announcement: {
    enabled: true,
    message: "Discover authentic Indonesian groceries, snacks & everyday essentials.",
    linkText: "Explore Products",
    linkUrl: "/products"
  },

  // Physical Store Location
  // Set isConfigured to true when exact store address is confirmed
  location: {
    isConfigured: false,
    addressLine1: "Store location to be announced",
    addressLine2: "Overseas Indonesian Market",
    city: "",
    country: "",
    postalCode: "",
    displayPlaceholder: "Physical store address will be published soon. Please contact us for directions.",
    // Google Maps embed URL or search link (leave empty or set when confirmed)
    googleMapsUrl: "",
    directionsUrl: ""
  },

  // Contact Information
  contact: {
    isConfigured: false,
    phone: "",
    phonePlaceholder: "Phone inquiry available upon opening",
    email: "contact@tokoaysha.com",
    whatsapp: "",
  },

  // Operating Hours
  // Clean default structure; set isConfigured to true once confirmed
  operatingHours: {
    isConfigured: false,
    note: "Official opening hours will be announced prior to store launch.",
    schedule: [
      { day: "Monday", hours: "10:00 AM – 7:00 PM" },
      { day: "Tuesday", hours: "10:00 AM – 7:00 PM" },
      { day: "Wednesday", hours: "10:00 AM – 7:00 PM" },
      { day: "Thursday", hours: "10:00 AM – 7:00 PM" },
      { day: "Friday", hours: "10:00 AM – 8:00 PM" },
      { day: "Saturday", hours: "10:00 AM – 8:00 PM" },
      { day: "Sunday", hours: "11:00 AM – 6:00 PM" }
    ]
  },

  // Pricing & Inventory Settings
  // In accordance with guidelines: No made-up prices.
  pricing: {
    hasLivePrices: false, // Set to true when prices are confirmed
    currencySymbol: "$",
    currencyCode: "USD",
    fallbackText: "Contact Store for Pricing"
  },

  // Social Channels
  socials: {
    instagram: "",
    facebook: "",
    whatsapp: ""
  }
};
