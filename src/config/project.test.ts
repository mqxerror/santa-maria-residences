import { describe, it, expect } from 'vitest'
import { projectConfig } from './project'

describe('Project Configuration', () => {
  describe('Project Info', () => {
    it('should have project name', () => {
      expect(projectConfig.name).toBe('Santa Maria Residences')
    })

    it('should have tagline', () => {
      expect(projectConfig.tagline).toBeDefined()
      expect(typeof projectConfig.tagline).toBe('string')
    })
  })

  describe('Building Configuration', () => {
    it('should have correct floor configuration', () => {
      expect(projectConfig.building.totalFloors).toBe(44)
      expect(projectConfig.building.floorRange.min).toBe(7)
      expect(projectConfig.building.floorRange.max).toBe(44)
    })

    it('should have correct unit count', () => {
      expect(projectConfig.building.totalUnits).toBe(200)
    })

    it('should have correct penthouse floor', () => {
      expect(projectConfig.building.penthouseFloor).toBe(38)
    })
  })

  describe('Location', () => {
    it('should have address', () => {
      expect(projectConfig.location.address).toBeDefined()
    })

    it('should have valid coordinates', () => {
      expect(projectConfig.location.coordinates.lat).toBeGreaterThan(-90)
      expect(projectConfig.location.coordinates.lat).toBeLessThan(90)
      expect(projectConfig.location.coordinates.lng).toBeGreaterThan(-180)
      expect(projectConfig.location.coordinates.lng).toBeLessThan(180)
    })
  })

  describe('Investment Information', () => {
    it('should have investment program', () => {
      expect(projectConfig.investment.program).toBeDefined()
      expect(typeof projectConfig.investment.program).toBe('string')
    })

    it('should have benefits list', () => {
      expect(projectConfig.investment.benefits).toBeDefined()
      expect(Array.isArray(projectConfig.investment.benefits)).toBe(true)
      expect(projectConfig.investment.benefits.length).toBeGreaterThan(0)
    })
  })

  describe('Amenities', () => {
    it('should have suite features', () => {
      expect(projectConfig.amenities.suiteFeatures).toBeDefined()
      expect(Array.isArray(projectConfig.amenities.suiteFeatures)).toBe(true)
    })

    it('should have building amenities', () => {
      expect(projectConfig.amenities.buildingFeatures).toBeDefined()
      expect(Array.isArray(projectConfig.amenities.buildingFeatures)).toBe(true)
    })
  })

  describe('Media', () => {
    it('should have hero image path', () => {
      expect(projectConfig.media.heroImage).toBeDefined()
      expect(projectConfig.media.heroImage).toContain('/')
    })
  })
})
