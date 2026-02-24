import { describe, it, expect } from 'vitest'
import {
  MIN_FLOOR,
  MAX_FLOOR,
  TOTAL_FLOORS,
  TOTAL_RESIDENTIAL_FLOORS,
  PENTHOUSE_FLOOR,
  FLOOR_POSITIONS,
  ZOOM_CONFIG,
  STATUS_COLORS,
  getFloorArray,
  getFloorFocusPoint,
  isPenthouse,
} from './building'

describe('Building Configuration', () => {
  describe('Constants', () => {
    it('should have correct floor range', () => {
      expect(MIN_FLOOR).toBe(7)
      expect(MAX_FLOOR).toBe(44)
      expect(TOTAL_FLOORS).toBe(44)
      expect(TOTAL_RESIDENTIAL_FLOORS).toBe(38)
    })

    it('should have correct penthouse floor', () => {
      expect(PENTHOUSE_FLOOR).toBe(38)
    })

    it('should identify penthouse floors correctly', () => {
      expect(isPenthouse(37)).toBe(false)
      expect(isPenthouse(38)).toBe(true)
      expect(isPenthouse(44)).toBe(true)
    })
  })

  describe('Floor Positions', () => {
    it('should have positions for all floors', () => {
      for (let floor = MIN_FLOOR; floor <= MAX_FLOOR; floor++) {
        expect(FLOOR_POSITIONS[floor]).toBeDefined()
      }
    })

    it('should have valid position values', () => {
      Object.values(FLOOR_POSITIONS).forEach((pos) => {
        expect(pos.top).toBeGreaterThanOrEqual(0)
        expect(pos.top).toBeLessThanOrEqual(100)
        expect(pos.height).toBeGreaterThan(0)
        expect(pos.left).toBeGreaterThanOrEqual(0)
        expect(pos.left).toBeLessThan(pos.right)
        expect(pos.right).toBeLessThanOrEqual(100)
      })
    })

    it('should have floors in descending order (higher floors have lower top value)', () => {
      const floors = Object.keys(FLOOR_POSITIONS).map(Number).sort((a, b) => b - a)
      for (let i = 0; i < floors.length - 1; i++) {
        const higherFloor = floors[i]
        const lowerFloor = floors[i + 1]
        expect(FLOOR_POSITIONS[higherFloor].top).toBeLessThan(
          FLOOR_POSITIONS[lowerFloor].top
        )
      }
    })
  })

  describe('Zoom Configuration', () => {
    it('should have valid zoom levels', () => {
      expect(ZOOM_CONFIG.default).toBe(1)
      expect(ZOOM_CONFIG.floorView).toBeGreaterThan(1)
      expect(ZOOM_CONFIG.maxZoom).toBeGreaterThan(ZOOM_CONFIG.floorView)
    })

    it('should have valid animation durations', () => {
      expect(ZOOM_CONFIG.duration).toBeGreaterThan(0)
      expect(ZOOM_CONFIG.reverseDuration).toBeGreaterThan(0)
    })

    it('should have valid easing function', () => {
      expect(ZOOM_CONFIG.ease).toHaveLength(4)
      ZOOM_CONFIG.ease.forEach((value) => {
        expect(typeof value).toBe('number')
      })
    })
  })

  describe('Status Colors', () => {
    it('should have all status types defined', () => {
      expect(STATUS_COLORS.available).toBeDefined()
      expect(STATUS_COLORS.limited).toBeDefined()
      expect(STATUS_COLORS.sold).toBeDefined()
      expect(STATUS_COLORS.empty).toBeDefined()
    })

    it('should have required color properties for each status', () => {
      Object.values(STATUS_COLORS).forEach((colors) => {
        expect(colors.bg).toBeDefined()
        expect(colors.border).toBeDefined()
        expect(colors.text).toBeDefined()
        expect(colors.dot).toBeDefined()
      })
    })
  })

  describe('Helper Functions', () => {
    describe('getFloorArray', () => {
      it('should return array of floor numbers in descending order', () => {
        const floors = getFloorArray()
        expect(floors).toHaveLength(TOTAL_RESIDENTIAL_FLOORS)
        expect(floors[0]).toBe(MAX_FLOOR)
        expect(floors[floors.length - 1]).toBe(MIN_FLOOR)
      })

      it('should contain all floors from MIN to MAX', () => {
        const floors = getFloorArray()
        for (let floor = MIN_FLOOR; floor <= MAX_FLOOR; floor++) {
          expect(floors).toContain(floor)
        }
      })
    })

    describe('getFloorFocusPoint', () => {
      it('should return focus point for valid floor', () => {
        const focusPoint = getFloorFocusPoint(21)
        expect(focusPoint).toHaveProperty('x')
        expect(focusPoint).toHaveProperty('y')
        expect(typeof focusPoint.x).toBe('number')
        expect(typeof focusPoint.y).toBe('number')
      })

      it('should return zero offset for invalid floor', () => {
        const focusPoint = getFloorFocusPoint(99)
        expect(focusPoint.x).toBe(0)
        expect(focusPoint.y).toBe(0)
      })

      it('should return different focus points for different floors', () => {
        const focus44 = getFloorFocusPoint(44)
        const focus7 = getFloorFocusPoint(7)
        expect(focus44.y).not.toBe(focus7.y)
      })
    })
  })
})
