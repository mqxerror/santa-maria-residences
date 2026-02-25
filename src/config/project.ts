// Santa Maria Residences - Project Configuration

export const projectConfig = {
  // Basic Info
  name: 'Santa Maria Residences',
  tagline: 'Premium Residential Living in the Heart of Panama City',
  description: 'Luxury residential tower with 200 apartments across 44 floors, featuring stunning city and ocean views in the prestigious Santa Maria district.',

  // Location
  location: {
    city: 'Panama City',
    country: 'Panama',
    neighborhood: 'Santa Maria',
    address: 'Santa Maria, Panama City',
    coordinates: {
      lat: 9.0082,
      lng: -79.5034,
    },
  },

  // Building Stats
  building: {
    totalFloors: 44,
    floorRange: { min: 7, max: 44 },
    penthouseFloor: 38,
    totalUnits: 200,
    typicalFloors: { min: 7, max: 37, unitsPerFloor: 6 },
    upperFloors: { min: 38, max: 44, unitsPerFloor: 2 },
    unitTypes: ['2 Bedrooms', '3 Bedrooms + Den'],
    completionYear: 2027,
  },

  // Pricing
  pricing: {
    currency: 'USD',
    startingFrom: '$319K',
    typicalRange: '$319K - $377K',
    upperRange: '$715K - $720K',
    // Pricing is per-unit based on official price list, not a simple formula
    // Floor 7 starts at $319,200 (Unit F) to $346,800 (Unit A)
    // Each floor adds ~$1,000 per unit
    floorPremiumPerUnit: 1000,
  },

  // Contact (minimal - no public-facing contact forms)
  contact: {
    email: 'info@mercan.com',
  },

  // Media
  media: {
    heroImage: '/assets/renders/perspective.webp',
    partnerLogo: 'https://www.mercan.com/wp-content/uploads/2024/06/logo.png',
    renders: {
      perspective: '/assets/renders/perspective.webp',
      entrance: '/assets/renders/entrance.webp',
      entranceDetail: '/assets/renders/entrance-detail.webp',
      elevation: '/assets/renders/elevation.webp',
      pool: '/assets/renders/pool.webp',
      gym: '/assets/renders/gym.webp',
      movies: '/assets/renders/movies.webp',
      living: '/assets/renders/living.webp',
    },
    floorPlans: {
      typical: '/assets/floor-plans/typical-floor-plan.pdf',
      upper: '/assets/floor-plans/upper-floor-plan.pdf',
    },
    gallery: [
      { src: '/assets/renders/living.webp', alt: 'Luxury living room with panoramic views' },
      { src: '/assets/renders/pool.webp', alt: 'Rooftop infinity pool' },
      { src: '/assets/renders/entrance.webp', alt: 'Grand entrance and lobby' },
      { src: '/assets/renders/gym.webp', alt: 'State-of-the-art fitness center' },
    ],
  },

  // Branding
  branding: {
    developer: 'Mercan Properties',
    colors: {
      primary: '#1a1a2e',
      accent: '#c9a227',
      secondary: '#4a4a4a',
    },
  },

  // Highlights
  highlights: [
    {
      title: 'Premium Location',
      description: 'Santa Maria — one of Panama City\'s most prestigious neighborhoods',
      icon: 'MapPin',
    },
    {
      title: 'Investment Opportunity',
      description: 'Strong rental yields and capital appreciation potential',
      icon: 'TrendingUp',
    },
    {
      title: 'World-Class Amenities',
      description: 'Rooftop pool, fitness center, cinema room, and more',
      icon: 'Building2',
    },
    {
      title: 'Residency Pathway',
      description: 'Qualifying investment for Panama permanent residency',
      icon: 'Globe',
    },
  ],

  // Amenities
  amenities: {
    buildingFeatures: [
      'Rooftop infinity pool',
      'Fully equipped gym',
      'Cinema room',
      '24/7 security',
      'Social area',
      'Underground parking',
    ],
    // Alias for components that reference this name
    hotelAmenities: [
      'Rooftop infinity pool',
      'Fully equipped gym',
      'Cinema room',
      '24/7 security',
      'Social area',
      'Underground parking',
    ],
    unitFeatures: [
      'Floor-to-ceiling windows',
      'Premium finishes',
      'Open-concept kitchen',
      'Smart home ready',
      'City and ocean views',
      'Private balcony',
    ],
    suiteFeatures: [
      'Floor-to-ceiling windows',
      'Premium finishes',
      'Open-concept kitchen',
      'Smart home ready',
      'City and ocean views',
      'Private balcony',
    ],
    nearby: [
      'Santa Maria Golf Club',
      'Shopping centers',
      'International schools',
      'Tocumen International Airport (25 min)',
      'Banking district',
      'Costa del Este',
    ],
  },

  // Investment Info
  investment: {
    program: 'Panama Friendly Nations Visa',
    benefits: [
      'Permanent residency pathway',
      'No minimum stay requirement',
      'Tax-friendly jurisdiction',
      'Strong rental income potential',
      'Capital appreciation',
    ],
  },

  // Social Links
  social: {
    instagram: null,
    facebook: null,
    linkedin: null,
  },
}

export type ProjectConfig = typeof projectConfig
