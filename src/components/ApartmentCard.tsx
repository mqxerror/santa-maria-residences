import { cn } from '@/lib/utils'
import type { Apartment } from '@/types/database'
import { Check, Clock, Lock, Maximize2, ArrowRight } from 'lucide-react'

interface ApartmentCardProps {
  apartment: Apartment
  onClick: () => void
}

const getUnitType = (sizeSqm: number): string => {
  if (sizeSqm >= 150) return 'Penthouse'
  if (sizeSqm >= 120) return '3 Bedroom'
  if (sizeSqm >= 90) return '2 Bedroom'
  if (sizeSqm >= 75) return '1 Bedroom'
  return 'Studio'
}

const getEstimatedPrice = (floor: number, sizeSqm: number): string => {
  const basePrice = 3500
  const floorPremium = (floor - 7) * 50
  const pricePerSqm = basePrice + floorPremium
  const totalPrice = pricePerSqm * sizeSqm

  if (totalPrice >= 1000000) {
    return `$${(totalPrice / 1000000).toFixed(1)}M`
  }
  return `$${Math.round(totalPrice / 1000)}K`
}

const getViewDirection = (unit: string): { full: string; short: string } => {
  const directions: Record<string, { full: string; short: string }> = {
    'A': { full: 'North', short: 'N' },
    'B': { full: 'Northeast', short: 'NE' },
    'C': { full: 'East', short: 'E' },
    'D': { full: 'West', short: 'W' },
    'E': { full: 'Southeast', short: 'SE' },
    'F': { full: 'South', short: 'S' },
  }
  return directions[unit] || { full: 'City', short: 'C' }
}

// Status styling - all neutral CTAs, no green in grid
const statusConfig = {
  available: {
    icon: Check,
    label: 'Available',
    badgeClass: 'bg-status-available/10 text-status-available',
    ctaClass: 'bg-primary/5 border border-primary/20 text-primary hover:bg-primary/10',
    cardClass: '',
    contentClass: '',
  },
  reserved: {
    icon: Clock,
    label: 'Reserved',
    badgeClass: 'bg-status-limited/10 text-status-limited',
    ctaClass: 'bg-transparent border border-border text-text-secondary hover:bg-background',
    cardClass: '',
    contentClass: '',
  },
  sold: {
    icon: Lock,
    label: 'Sold',
    badgeClass: 'bg-status-sold/10 text-status-sold',
    ctaClass: 'bg-transparent border border-border/60 text-text-muted hover:bg-background',
    cardClass: 'bg-stone-50/50',
    contentClass: 'opacity-60',
  },
}

export default function ApartmentCard({ apartment, onClick }: ApartmentCardProps) {
  const config = statusConfig[apartment.status]
  const unitType = getUnitType(apartment.size_sqm)
  const price = getEstimatedPrice(apartment.floor, apartment.size_sqm)
  const viewDirection = getViewDirection(apartment.unit)
  const StatusIcon = config.icon

  const isSold = apartment.status === 'sold'

  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-surface rounded-xl p-4 text-left w-full group relative',
        'border border-border',
        'card-interactive',
        'focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2',
        config.cardClass
      )}
    >
      {/* Status Badge - consistent placement for all statuses */}
      <div className={cn(
        'absolute top-3 right-3 flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium',
        config.badgeClass
      )}>
        <StatusIcon className="w-2.5 h-2.5" />
        <span>{config.label}</span>
      </div>

      {/* Content - muted for sold */}
      <div className={config.contentClass}>
        {/* Unit Header */}
        <div className="pr-16 mb-2">
          <h3 className="text-base text-text-primary font-semibold">
            {apartment.floor}-{apartment.unit}
          </h3>
          <p className="text-xs text-text-muted">
            {unitType}
          </p>
        </div>

        {/* Price - Visual Anchor */}
        <div className="mb-3">
          <span className="text-[10px] text-text-muted uppercase tracking-wide">{isSold ? 'Sold at' : 'From'}</span>
          <div className="text-lg text-text-primary font-semibold">{price}</div>
        </div>

        {/* Attributes Row */}
        <div className="flex items-center gap-3 text-xs text-text-secondary mb-3">
          {/* Size */}
          <div className="flex items-center gap-1">
            <Maximize2 className="w-3 h-3 text-text-muted" />
            <span>{apartment.size_sqm} m²</span>
          </div>

          {/* Compass Direction */}
          <div className="flex items-center gap-1">
            <div
              className="compass-indicator"
              data-direction={viewDirection.short}
              title={viewDirection.full}
            />
            <span>{viewDirection.short}</span>
          </div>
        </div>
      </div>

      {/* CTA - Consistent "View Details" for all, sublabel for sold */}
      <div className={cn(
        'flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors',
        config.ctaClass
      )}>
        <span>View Details</span>
        {isSold && <span className="text-[10px] opacity-60">· Reference</span>}
        <ArrowRight className="w-3 h-3" />
      </div>
    </button>
  )
}
