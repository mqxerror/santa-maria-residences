import { ArrowLeft } from 'lucide-react'
import type { Apartment } from '@/types/database'
import { cn } from '@/lib/utils'

interface ApartmentDetailProps {
  apartment: Apartment
  onBack: () => void
}

// Unit type based on size
const getUnitType = (sizeSqm: number): string => {
  if (sizeSqm >= 150) return 'Penthouse'
  if (sizeSqm >= 120) return '3 Bedroom'
  if (sizeSqm >= 90) return '2 Bedroom'
  if (sizeSqm >= 75) return '1 Bedroom'
  return 'Studio'
}

// Status config
const statusConfig = {
  available: {
    badge: 'badge-available',
    label: 'Available',
  },
  reserved: {
    badge: 'badge-limited',
    label: 'Reserved',
  },
  sold: {
    badge: 'badge-sold',
    label: 'Sold',
  },
}

export default function ApartmentDetail({ apartment, onBack }: ApartmentDetailProps) {
  const config = statusConfig[apartment.status]
  const unitType = getUnitType(apartment.size_sqm)

  return (
    <div className="h-full flex flex-col">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to floor view</span>
      </button>

      {/* Detail Card */}
      <div className="card p-6 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-3xl text-text-primary font-semibold">
              Unit {apartment.floor}-{apartment.unit}
            </h2>
            <p className="text-text-secondary mt-1">{unitType} on Floor {apartment.floor}</p>
          </div>
          <div className={cn('badge text-sm', config.badge)}>
            {config.label}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-background rounded-lg border border-border-light">
            <p className="text-sm text-text-muted mb-1">Unit Size</p>
            <p className="text-2xl text-text-primary font-semibold">{apartment.size_sqm} m²</p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border-light">
            <p className="text-sm text-text-muted mb-1">Unit Type</p>
            <p className="text-2xl text-text-primary font-semibold">{unitType}</p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border-light">
            <p className="text-sm text-text-muted mb-1">Floor Level</p>
            <p className="text-2xl text-text-primary font-semibold">{apartment.floor}</p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border-light">
            <p className="text-sm text-text-muted mb-1">Unit Position</p>
            <p className="text-2xl text-text-primary font-semibold">Unit {apartment.unit}</p>
          </div>
        </div>

        {/* Features (placeholder for future enhancement) */}
        <div className="border-t border-border pt-6">
          <h3 className="text-lg text-text-primary font-semibold mb-4">Unit Features</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-text-secondary">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">Premium Finishes</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">Floor-to-Ceiling Windows</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">Modern Kitchen</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm">City Views</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
