// Santa Maria Residences - Apartment Utility Functions
// Based on official price list HD5B SANTAMARIA (Dec 5, 2025 R1)
import { PENTHOUSE_FLOOR } from '@/config/building'

// Official unit sizes from price list
// Typical floors (7-37): 6 units per floor
//   A=85m², B=85m², C=85m², D=81m², E=84m², F=84m²
// Upper floors (38-44): 2 units per floor
//   A=160m², B=160m²

export const TYPICAL_UNIT_SIZES: Record<string, number> = {
  A: 85,
  B: 85,
  C: 85,
  D: 81,
  E: 84,
  F: 84,
}

export const UPPER_UNIT_SIZES: Record<string, number> = {
  A: 160,
  B: 160,
}

// All bedrooms are 2BR on typical floors, 3BR + Den on upper floors
// (from floor plans: each typical unit has 2 bedrooms, upper units have 3 bedrooms + den)

// Unit type based on floor
export function getUnitType(_sizeSqm: number, floor?: number): string {
  if (floor && floor >= PENTHOUSE_FLOOR) return '3 Bedrooms + Den'
  return '2 Bedrooms'
}

// Bedroom count
export function getBedrooms(_sizeSqm: number, floor?: number): number {
  if (floor && floor >= PENTHOUSE_FLOOR) return 3
  return 2
}

// Bathroom count (from floor plans)
export function getBathrooms(_sizeSqm: number, floor?: number): number {
  if (floor && floor >= PENTHOUSE_FLOOR) return 5 // upper floor plans show 5 bathrooms
  return 2
}

// Official price calculation from price list
// Base prices at Floor 7: A=$346,800 B=$346,800 C=$346,800 D=$330,480 E=$342,720 F=$319,200
// Each floor adds $1,000 per unit
// Upper floors: A=$715,200+floor_premium B=$715,200+floor_premium at Floor 38
const BASE_PRICES_FLOOR_7: Record<string, number> = {
  A: 346_800,
  B: 346_800,
  C: 346_800,
  D: 330_480,
  E: 342_720,
  F: 319_200,
}

const BASE_PRICES_FLOOR_38: Record<string, number> = {
  A: 715_200,
  B: 715_200,
}

const FLOOR_PREMIUM = 1_000 // $1,000 per floor above base

export function getUnitPrice(floor: number, unitLetter: string): number {
  if (floor >= PENTHOUSE_FLOOR) {
    const basePrice = BASE_PRICES_FLOOR_38[unitLetter] || BASE_PRICES_FLOOR_38.A
    // Floor 44 is priced at floor 41 level per official price list ($718,200)
    const effectiveFloor = floor === 44 ? 41 : floor
    return basePrice + (effectiveFloor - 38) * FLOOR_PREMIUM
  }
  const basePrice = BASE_PRICES_FLOOR_7[unitLetter] || BASE_PRICES_FLOOR_7.A
  return basePrice + (floor - 7) * FLOOR_PREMIUM
}

// Legacy function - estimate price from size and floor
export function getEstimatedPrice(floor: number, sizeSqm: number): number {
  // Find the closest matching unit letter by size
  if (floor >= PENTHOUSE_FLOOR) {
    return getUnitPrice(floor, 'A')
  }
  // Match size to unit letter
  if (sizeSqm <= 81) return getUnitPrice(floor, 'D')
  if (sizeSqm <= 84) return getUnitPrice(floor, 'E') // E and F are both 84m²
  return getUnitPrice(floor, 'A') // A, B, C are 85m²
}

// Format price: $1,234,567
export function formatPrice(price: number): string {
  return '$' + price.toLocaleString('en-US')
}

// Format price short: $319K or $1.2M
export function formatPriceShort(price: number): string {
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(1)}M`
  }
  return `$${Math.round(price / 1000)}K`
}

// Get unit size for a given floor and unit letter
export function getUnitSize(floor: number, unitLetter: string): number {
  if (floor >= PENTHOUSE_FLOOR) {
    return UPPER_UNIT_SIZES[unitLetter] || 160
  }
  return TYPICAL_UNIT_SIZES[unitLetter] || 85
}

// Get floor plan image URL for a given apartment size
export function getFloorPlanImage(sizeSqm: number): string {
  const rounded = Math.round(sizeSqm)

  // Upper floor units (160m²) - use upper floor plan
  if (rounded >= 150) {
    return '/assets/floor-plans/upper-floor-plan.webp'
  }

  const mapping: Record<number, string> = {
    81: 'unit-81sqm',
    84: 'unit-84sqm-1',
    85: 'unit-85sqm-1',
  }

  const key = mapping[rounded] || 'typical-floor-plan'
  return `/assets/floor-plans/${key}.webp`
}

// Get floor plan PDF for download
export function getFloorPlanPdf(sizeSqm: number): string {
  const rounded = Math.round(sizeSqm)

  if (rounded >= 150) {
    return '/assets/floor-plans/upper-floor-plan.pdf'
  }

  const mapping: Record<number, string> = {
    81: 'unit-81sqm',
    84: 'unit-84sqm-1',
    85: 'unit-85sqm-1',
  }

  const key = mapping[rounded] || 'typical-floor-plan'
  return `/assets/floor-plans/${key}.pdf`
}

// Legacy aliases
export function getFloorPlan(sizeSqm: number): { pdf: string; image: string } {
  return {
    pdf: getFloorPlanPdf(sizeSqm),
    image: getFloorPlanImage(sizeSqm),
  }
}

export function getFloorPlanUrl(sizeSqm: number): string {
  return getFloorPlanImage(sizeSqm)
}

// View direction based on unit letter (A-F)
export function getViewDirection(unitNumber: number): { full: string; short: string; degrees: number } {
  const directions: Record<number, { full: string; short: string; degrees: number }> = {
    1: { full: 'North', short: 'N', degrees: 0 },     // Unit A
    2: { full: 'Northeast', short: 'NE', degrees: 45 }, // Unit B
    3: { full: 'East', short: 'E', degrees: 90 },      // Unit C
    4: { full: 'Southeast', short: 'SE', degrees: 135 }, // Unit D
    5: { full: 'South', short: 'S', degrees: 180 },    // Unit E
    6: { full: 'Southwest', short: 'SW', degrees: 225 }, // Unit F
  }
  return directions[unitNumber] || { full: 'City', short: 'C', degrees: 0 }
}
