import { createClient } from '@supabase/supabase-js'
import type { ApartmentRow, Apartment } from '@/types/database'
import { getUnitType, getUnitPrice, formatPrice, getFloorPlanUrl } from '@/lib/apartment-utils'

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Smart URL detection:
// - Production: Use same-origin /supabase path (avoids CORS/mixed-content)
// - Development: Use VITE_SUPABASE_URL from .env (direct HTTP)
const getSupabaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL

  // If running on localhost, use the env URL directly (HTTP works on localhost)
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return envUrl || 'http://38.97.60.181:8000'
  }

  // Production: Use same-origin proxy path
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/supabase`
  }

  // Fallback for SSR or testing
  return envUrl || 'http://38.97.60.181:8000'
}

const supabaseUrl = getSupabaseUrl()

if (!supabaseAnonKey) {
  throw new Error('Missing Supabase anon key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Map unit letter to number: A=1, B=2, ..., F=6
const UNIT_LETTER_TO_NUMBER: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6,
}

// Transform a database row into an enriched Apartment object
export function transformApartmentRow(row: ApartmentRow): Apartment {
  const unitNumber = UNIT_LETTER_TO_NUMBER[row.unit] || 1
  const price = getUnitPrice(row.floor, row.unit)

  return {
    id: row.id,
    floor: row.floor,
    unit: row.unit,
    unit_number: unitNumber,
    size_sqm: row.size_sqm,
    suite_type: getUnitType(row.size_sqm, row.floor),
    status: row.status,
    price_usd: price,
    price_display: formatPrice(price),
    notes: row.notes,
    floor_plan_url: getFloorPlanUrl(row.size_sqm),
    updated_at: row.updated_at,
    updated_by: row.updated_by,
  }
}

// Fetch all apartments (transformed)
export async function fetchApartments(): Promise<Apartment[]> {
  const { data, error } = await supabase
    .from('apartments')
    .select('*')
    .order('floor', { ascending: true })
    .order('unit', { ascending: true })

  if (error) throw error
  return (data as ApartmentRow[]).map(transformApartmentRow)
}
