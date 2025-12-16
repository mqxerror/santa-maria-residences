export type ApartmentStatus = 'available' | 'reserved' | 'sold'

export interface Apartment {
  id: string
  floor: number
  unit: string
  size_sqm: number
  status: ApartmentStatus
  notes: string | null
  updated_at: string
  updated_by: string | null
}

export interface Database {
  public: {
    Tables: {
      apartments: {
        Row: Apartment
        Insert: Omit<Apartment, 'id' | 'updated_at'>
        Update: {
          floor?: number
          unit?: string
          size_sqm?: number
          status?: ApartmentStatus
          notes?: string | null
          updated_at?: string
          updated_by?: string | null
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
