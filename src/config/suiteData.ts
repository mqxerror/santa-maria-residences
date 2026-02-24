// Santa Maria Residences - Apartment Data
// Adapter module that re-exports from apartment-utils for backward compatibility

import { getUnitType, getBedrooms, getBathrooms, getFloorPlan } from '@/lib/apartment-utils'

export interface SuiteInfo {
  unitNumber: number
  type: string
  typeName: string
  sizeSqm: number
  level: string
  rooms: number
  bathrooms: number
  lockoff: boolean
  floorPlanFile: string
  renderingFile?: string
  pdfFile: string
}

// Santa Maria floor layout (from official price list Dec 5, 2025):
// Floors 7-37: 6 units per floor (A=85, B=85, C=85, D=81, E=84, F=84 sqm)
// Floors 38-44: 2 units per floor (A=160, B=160 sqm)

const STANDARD_UNIT_SIZES: Record<number, number> = {
  1: 85,  // Unit A
  2: 85,  // Unit B
  3: 85,  // Unit C
  4: 81,  // Unit D
  5: 84,  // Unit E
  6: 84,  // Unit F
}

// Export size map for backward compatibility
export const SUITE_SIZES: Record<number, number> = STANDARD_UNIT_SIZES

// Generate suite info for a given unit number
export const getSuiteInfo = (unitNumber: number): SuiteInfo | undefined => {
  const sizeSqm = STANDARD_UNIT_SIZES[unitNumber] || 85
  const floorPlan = getFloorPlan(sizeSqm)
  return {
    unitNumber,
    type: String.fromCharCode(64 + unitNumber), // 1->A, 2->B, etc.
    typeName: getUnitType(sizeSqm),
    sizeSqm,
    level: 'Standard',
    rooms: getBedrooms(sizeSqm),
    bathrooms: getBathrooms(sizeSqm),
    lockoff: false,
    floorPlanFile: floorPlan.image,
    pdfFile: floorPlan.pdf,
  }
}

export const getSuitesByType = (type: string): SuiteInfo[] => {
  return Object.keys(STANDARD_UNIT_SIZES)
    .map(num => getSuiteInfo(parseInt(num)))
    .filter((s): s is SuiteInfo => s !== undefined && s.type === type)
}

export const getSuiteType = (sizeSqm: number, floor?: number): string => {
  return getUnitType(sizeSqm, floor)
}

export const getSuiteTypeFromLetter = (_type: string, sizeSqm: number): string => {
  return getUnitType(sizeSqm)
}

// Default render image for all apartments
export const DEFAULT_SUITE_IMAGE = '/assets/renders/living.jpg'

// Suite images - use renders since we don't have per-unit images
export const SUITE_IMAGES: Record<number, string> = {}

export const getSuiteImage = (_unitNumber: number): string => {
  return DEFAULT_SUITE_IMAGE
}
