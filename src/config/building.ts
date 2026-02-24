// Santa Maria Residences - Building Configuration

// Floor range
export const MIN_FLOOR = 7
export const MAX_FLOOR = 44
export const TOTAL_RESIDENTIAL_FLOORS = MAX_FLOOR - MIN_FLOOR + 1 // 38 residential floors (7-44)
export const TOTAL_FLOORS = MAX_FLOOR // 44 total building floors
export const PENTHOUSE_FLOOR = 38 // Floors 38-44 are upper/penthouse level (2 units of 160m²)

// Building image overlay config (for elevation.jpg)
export const BUILDING_CONFIG = {
  top: 8,
  bottom: 85,
  left: 25,
  right: 75,
}

// Helper: check if floor is penthouse level
export const isPenthouse = (floor: number): boolean => floor >= PENTHOUSE_FLOOR

// Floor position mapping on facade image (uses residential floor count for positioning)
const FLOOR_HEIGHT = (BUILDING_CONFIG.bottom - BUILDING_CONFIG.top) / TOTAL_RESIDENTIAL_FLOORS

export const FLOOR_POSITIONS: Record<number, {
  top: number
  height: number
  left: number
  right: number
}> = Object.fromEntries(
  Array.from({ length: TOTAL_RESIDENTIAL_FLOORS }, (_, i) => {
    const floor = MAX_FLOOR - i
    return [floor, {
      top: BUILDING_CONFIG.top + (i * FLOOR_HEIGHT),
      height: FLOOR_HEIGHT,
      left: BUILDING_CONFIG.left,
      right: BUILDING_CONFIG.right,
    }]
  })
)

// Zoom config
export const ZOOM_CONFIG = {
  default: 1,
  floorView: 2.5,
  maxZoom: 3,
  duration: 0.8,
  ease: [0.33, 1, 0.68, 1] as const,
  reverseDuration: 0.6,
}

// Floor focus point for zoom
export function getFloorFocusPoint(floor: number): { x: number; y: number } {
  const pos = FLOOR_POSITIONS[floor]
  if (!pos) return { x: 0, y: 0 }
  const floorCenter = pos.top + (pos.height / 2)
  const viewCenter = 50
  const yOffset = (viewCenter - floorCenter) * (ZOOM_CONFIG.floorView - 1)
  return { x: 0, y: yOffset }
}

// Status types and colors
export type FloorStatus = 'available' | 'limited' | 'sold' | 'empty'

export const STATUS_COLORS = {
  available: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-400',
    text: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
  limited: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-400',
    text: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  sold: {
    bg: 'bg-slate-500/20',
    border: 'border-slate-400',
    text: 'text-slate-400',
    dot: 'bg-slate-400',
  },
  empty: {
    bg: 'bg-slate-500/10',
    border: 'border-slate-600',
    text: 'text-slate-500',
    dot: 'bg-slate-500',
  },
}

// Generate floor array (descending) - residential floors only
export function getFloorArray(): number[] {
  return Array.from({ length: TOTAL_RESIDENTIAL_FLOORS }, (_, i) => MAX_FLOOR - i)
}
