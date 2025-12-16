// Santa Maria Residences - Project Configuration
// This file contains all project-specific metadata and content

export const projectConfig = {
  // Basic Info
  name: 'Santa Maria Residences',
  tagline: 'Elevated Living in the Heart of Panama City',
  description: 'Premium residential tower offering 35 floors of sophisticated living with panoramic city and ocean views.',

  // Location
  location: {
    city: 'Panama City',
    country: 'Panama',
    neighborhood: 'San Francisco',
    address: 'Via España, San Francisco',
    coordinates: {
      lat: 9.0082,
      lng: -79.5034,
    },
  },

  // Building Stats
  building: {
    totalFloors: 35,
    floorRange: { min: 7, max: 41 },
    totalUnits: 204,
    unitTypes: ['Studio', '1 Bedroom', '2 Bedroom', '3 Bedroom', 'Penthouse'],
    completionYear: 2025,
  },

  // Pricing
  pricing: {
    startingFrom: '$280,000',
    pricePerSqm: 'From $3,500/m²',
    currency: 'USD',
  },

  // Contact
  contact: {
    phone: '+507 6000-0000',
    whatsapp: '+507 6000-0000',
    email: 'info@santamariaresidences.com',
    salesOffice: 'Tower Lobby, Ground Floor',
  },

  // Media
  media: {
    heroImage: '/assets/santa-maria-tower.jpg',
    heroVideo: null, // '/assets/hero-video.mp4' when available
    logo: '/assets/logo.png',
    gallery: [
      '/assets/gallery/unit-render.jpg',
      '/assets/gallery/view-rooftop.jpg',
      '/assets/gallery/lobby.jpg',
    ],
  },

  // Highlights (for landing page)
  highlights: [
    {
      title: 'Prime Location',
      description: 'Minutes from business district, shopping, and entertainment',
      icon: 'MapPin',
    },
    {
      title: 'Premium Finishes',
      description: 'Italian marble, German appliances, smart home technology',
      icon: 'Gem',
    },
    {
      title: 'World-Class Amenities',
      description: 'Rooftop infinity pool, fitness center, concierge services',
      icon: 'Building2',
    },
    {
      title: 'Investment Ready',
      description: 'Flexible payment plans, rental management available',
      icon: 'TrendingUp',
    },
  ],

  // Amenities
  amenities: {
    interior: [
      'Floor-to-ceiling windows',
      'Central air conditioning',
      'Smart home ready',
      'Premium fixtures',
      'Porcelain flooring',
      'Modern kitchen',
    ],
    building: [
      'Rooftop infinity pool',
      '24/7 security',
      'Fitness center',
      'Business lounge',
      'Covered parking',
      'Concierge services',
    ],
    nearby: [
      'Shopping centers',
      'International schools',
      'Hospitals',
      'Parks & recreation',
      'Fine dining',
      'Banking district',
    ],
  },

  // Social Links
  social: {
    instagram: 'https://instagram.com/santamariaresidences',
    facebook: 'https://facebook.com/santamariaresidences',
    linkedin: null,
  },
}

export type ProjectConfig = typeof projectConfig
