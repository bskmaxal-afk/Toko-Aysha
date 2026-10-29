/**
 * TOKO AYSHA ASIAN MARKET — CENTRAL STORE CONFIGURATION
 * 
 * Centralized store identity, location, operating hours,
 * contact details, and catalog configuration.
 * Officially verified from Athens store banner.
 */

export const storeConfig = {
  // Store Branding & Identity
  storeName: "Toko Aysha Asian Market",
  shortName: "Toko Aysha",
  tagline: "Authentic Asian & Indonesian Groceries • Wholesale & Retail",
  shortDescription: "Your premier destination in Athens for authentic Asian and Indonesian groceries. Featuring specialty foods, instant noodles, pantry staples, snacks, sauces, and culinary essentials from Indonesia, South Korea, Thailand, China, and across Asia.",
  businessType: "Wholesale & Retail Sales (Χονδρική & Λιανική Πώληση)",
  certification: "Halal Indonesia Certified",
  
  // Top Announcement Bar
  announcement: {
    enabled: true,
    message: "Toko Aysha Asian Market — Wholesale & Retail Sales (Χονδρική & Λιανική Πώληση) • Knosou 11, Athens, Greece",
    linkText: "Explore Asian Imports",
    linkUrl: "/products?origin=imported"
  },

  // Physical Store Location - Official Banner Verified (Amerikis Square & Agiou Nikolaou)
  location: {
    isConfigured: true,
    addressLine1: "Knosou 11",
    addressLine2: "Amerikis Square & Agiou Nikolaou",
    city: "Athens",
    country: "Greece",
    postalCode: "11253",
    displayPlaceholder: "Knosou 11, 11253 Athens (Amerikis Square & Agiou Nikolaou), Greece",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Knosou+11+11253+Athens+Greece",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Knosou+11+11253+Athens+Greece"
  },

  // Contact Information - Official Banner Verified
  contact: {
    isConfigured: true,
    phone: "+30 2110014955",
    whatsapp: "+30 694 6161076",
    mobile: "+30 694 6161076",
    phonePlaceholder: "+30 2110014955 / +30 694 6161076",
    email: "contact@tokoaysha.com",
  },

  // Operating Hours
  operatingHours: {
    isConfigured: true,
    note: "Open for wholesale & retail customers. Contact us or visit our store in Amerikis Square, Athens.",
    schedule: [
      { day: "Monday", hours: "10:00 AM – 8:00 PM" },
      { day: "Tuesday", hours: "10:00 AM – 8:00 PM" },
      { day: "Wednesday", hours: "10:00 AM – 8:00 PM" },
      { day: "Thursday", hours: "10:00 AM – 8:00 PM" },
      { day: "Friday", hours: "10:00 AM – 8:30 PM" },
      { day: "Saturday", hours: "10:00 AM – 8:30 PM" },
      { day: "Sunday", hours: "11:00 AM – 6:00 PM" }
    ]
  },

  // Pricing & Inventory Settings (Athens, Greece uses EUR €)
  pricing: {
    hasLivePrices: false,
    currencySymbol: "€",
    currencyCode: "EUR",
    fallbackText: "Contact Store for Pricing"
  },

  // Social & Messaging Channels
  socials: {
    whatsapp: "https://wa.me/306946161076",
    instagram: "",
    facebook: ""
  }
};
