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

  // Physical Store Location - Official Google Maps Verified Place (Amerikis Square & Agiou Nikolaou)
  location: {
    isConfigured: true,
    addressLine1: "Knosou 11",
    addressLine2: "Amerikis Square & Agiou Nikolaou",
    city: "Athens",
    country: "Greece",
    postalCode: "11253",
    displayPlaceholder: "Knosou 11, 11253 Athens (Amerikis Square & Agiou Nikolaou), Greece",
    googleMapsUrl: "https://www.google.com/maps/place/TOKO+AYSHA/@38.0061188,23.733767,17z/data=!3m1!4b1!4m6!3m5!1s0x14a1a35079e78b5d:0x66b8b59090c98bb1!8m2!3d38.0061188!4d23.733767!16s%2Fg%2F11w7d4j5x8",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=TOKO+AYSHA,+Knosou+11,+11253+Athens+Greece&destination_place_id=ChIJXYvneVCjoRQRsbjJkJC1uGY",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3143.7573990176456!2d23.733767!3d38.0061188!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1a35079e78b5d%3A0x66b8b59090c98bb1!2sTOKO%20AYSHA!5e0!3m2!1sid!2sid!4v1793259577660!5m2!1sid!2sid"
  },

  // Contact Information - Official Banner & Store Verified
  contact: {
    isConfigured: true,
    phone: "+30 2110014955",
    whatsapp: "+30 694 6161076",
    mobile: "+30 694 6161076",
    phonePlaceholder: "+30 2110014955 / +30 694 6161076",
    email: "shopaisha510@gmail.com",
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
