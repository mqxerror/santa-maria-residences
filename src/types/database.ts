// Santa Maria Residences - Database Types

export type ApartmentStatus = 'available' | 'reserved' | 'sold'

// Database row (actual Supabase schema)
export interface ApartmentRow {
  id: string
  floor: number
  unit: string  // Letter: A, B, C, D, E, F
  size_sqm: number
  status: ApartmentStatus
  notes: string | null
  updated_at: string
  updated_by: string | null
}

// Frontend-enriched apartment (with computed fields)
export interface Apartment {
  id: string
  floor: number
  unit: string          // Letter: A, B, C, D, E, F
  unit_number: number   // Computed: A=1, B=2, ...
  size_sqm: number
  suite_type: string    // Computed from size/floor
  status: ApartmentStatus
  price_usd: number     // Computed from price list
  price_display: string // Computed formatted price
  notes: string | null
  floor_plan_url: string | null  // Computed from size
  updated_at: string
  updated_by: string | null
}

// Backward compatibility alias
export type ExecutiveSuite = Apartment
export type SuiteStatus = ApartmentStatus

// Tour types for 360° viewer
export interface Tour {
  id: string
  suite_type: string
  name: string
  description: string | null
  source: 'ai' | 'photo' | 'render'
  is_active: boolean
  created_at: string
  scenes?: TourScene[]
}

export interface TourScene {
  id: string
  tour_id: string
  name: string
  display_name: string | null
  panorama_url: string
  thumbnail_url: string | null
  initial_pitch: number
  initial_yaw: number
  initial_hfov: number
  sort_order: number
  hotspots?: TourHotspot[]
}

export interface TourHotspot {
  id: string
  scene_id: string
  target_scene_id: string | null
  pitch: number
  yaw: number
  label: string
  hotspot_type: 'navigation' | 'info' | 'link'
}

// Floor statistics
export interface FloorStats {
  floor: number
  total: number
  available: number
  reserved: number
  sold: number
}

// Database schema type
export interface Database {
  public: {
    Tables: {
      apartments: {
        Row: Apartment
        Insert: Omit<Apartment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Apartment, 'id'>>
      }
      tours: {
        Row: Tour
        Insert: Omit<Tour, 'id' | 'created_at'>
        Update: Partial<Omit<Tour, 'id'>>
      }
      tour_scenes: {
        Row: TourScene
        Insert: Omit<TourScene, 'id' | 'created_at'>
        Update: Partial<Omit<TourScene, 'id'>>
      }
      tour_hotspots: {
        Row: TourHotspot
        Insert: Omit<TourHotspot, 'id' | 'created_at'>
        Update: Partial<Omit<TourHotspot, 'id'>>
      }
    }
    Views: {
      floor_summary: {
        Row: FloorStats
      }
    }
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
