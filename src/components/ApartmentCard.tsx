import { cn } from '@/lib/utils'
import type { Apartment } from '@/types/database'
import { Check, Clock, Lock, Maximize2, Compass, ArrowRight } from 'lucide-react'

interface ApartmentCardProps {
  apartment: Apartment
  onClick: () => void
}

// Unit type based on size
const getUnitType = (sizeSqm: number): string => {
  if (sizeSqm >= 150) return 'Penthouse'
  if (sizeSqm >= 120) return '3 Bedroom'
  if (sizeSqm >= 90) return '2 Bedroom'
  if (sizeSqm >= 75) return '1 Bedroom'
  return 'Studio'
}

// Estimate price based on floor and size (placeholder logic)
const getEstimatedPrice = (floor: number, sizeSqm: number): string => {
  const basePrice = 3500 // $ per sqm
  const floorPremium = (floor - 7) * 50 // Higher floors cost more
  const pricePerSqm = basePrice + floorPremium
  const totalPrice = pricePerSqm * sizeSqm

  if (totalPrice >= 1000000) {
    return `$${(totalPrice / 1000000).toFixed(1)}M`
  }
  return `$${Math.round(totalPrice / 1000)}K`
}

// View direction based on unit
const getViewDirection = (unit: string): string => {
  const directions: Record<string, string> = {
    'A': 'North',
    'B': 'Northeast',
    'C': 'East',
    'D': 'West',
    'E': 'Southeast',
    'F': 'South',
  }
  return directions[unit] || 'City'
}

// Status configuration
const statusConfig = {
  available: {
    icon: Check,
    label: 'Available',
    badgeClass: 'bg-status-available-bg text-status-available',
    borderClass: 'group-hover:border-status-available/30',
    cta: 'View Details',
    ctaClass: 'bg-accent hover:bg-accent-light text-white',
  },
  reserved: {
    icon: Clock,
    label: 'Reserved',
    badgeClass: 'bg-status-limited-bg text-status-limited',
    borderClass: 'group-hover:border-status-limited/30',
    cta: 'View Details',
    ctaClass: 'bg-surface border border-border text-text-primary hover:bg-background',
  },
  sold: {
    icon: Lock,
    label: 'Sold',
    badgeClass: 'bg-status-sold-bg text-status-sold',
    borderClass: 'group-hover:border-status-sold/30',
    cta: 'View Details',
    ctaClass: 'bg-surface border border-border text-text-muted',
  },
}

export default function ApartmentCard({ apartment, onClick }: ApartmentCardProps) {
  const config = statusConfig[apartment.status]
  const unitType = getUnitType(apartment.size_sqm)
  const price = getEstimatedPrice(apartment.floor, apartment.size_sqm)
  const viewDirection = getViewDirection(apartment.unit)
  const StatusIcon = config.icon

  return (
    <button
      onClick={onClick}
      className={cn(
        'card p-4 text-left w-full group relative',
        'transition-all duration-200 ease-out',
        'hover:shadow-card-hover hover:-translate-y-1',
        config.borderClass
      )}
    >
      {/* Status Badge */}
      <div className={cn(
        'absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
        config.badgeClass
      )}>
        <StatusIcon className="w-3 h-3" />
        <span>{config.label}</span>
      </div>

      {/* Unit Header */}
      <div className="pr-20 mb-3">
        <h3 className="text-lg text-text-primary font-semibold">
          {apartment.floor}-{apartment.unit}
        </h3>
        <p className="text-sm text-text-secondary">
          {unitType}
        </p>
      </div>

      {/* Price */}
      <div className="mb-3">
        <span className="text-xs text-text-muted">From</span>
        <div className="text-xl text-text-primary font-semibold">{price}</div>
      </div>

      {/* Attributes */}
      <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
        <div className="flex items-center gap-1.5">
          <Maximize2 className="w-3.5 h-3.5 text-text-muted" />
          <span>{apartment.size_sqm} m²</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-text-muted" />
          <span>{viewDirection}</span>
        </div>
      </div>

      {/* CTA - Always visible but enhanced on hover */}
      <div className={cn(
        'flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium',
        'transition-all duration-150',
        config.ctaClass
      )}>
        <span>{config.cta}</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </div>
    </button>
  )
}
