import { useState } from 'react'
import type { Apartment } from '@/types/database'
import ApartmentCard from './ApartmentCard'
import ApartmentDetail from './ApartmentDetail'
import { Check, Clock, Lock, Building2, Home, Filter } from 'lucide-react'

interface FloorPanelProps {
  floor: number | null
  apartments: Apartment[]
  selectedApartment: Apartment | null
  onApartmentClick: (apt: Apartment | null) => void
  totalStats?: { available: number; reserved: number; sold: number; total: number }
}

type StatusFilter = 'all' | 'available' | 'reserved' | 'sold'

export default function FloorPanel({
  floor,
  apartments,
  selectedApartment,
  onApartmentClick,
  totalStats,
}: FloorPanelProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  // Empty state
  if (!floor) {
    return (
      <div className="h-full flex flex-col">
        {/* Page Header */}
        <div className="mb-6">
          <div className="text-xs text-text-muted mb-2">
            Projects / Santa Maria / Building Availability
          </div>
          <h2 className="text-2xl text-text-primary font-semibold">Unit Selection</h2>

          {/* Summary chips */}
          {totalStats && (
            <div className="flex items-center gap-3 mt-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-background rounded-full text-sm">
                <Building2 className="w-3.5 h-3.5 text-text-muted" />
                <span className="text-text-secondary">35 Floors</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-status-available-bg rounded-full text-sm">
                <Check className="w-3.5 h-3.5 text-status-available" />
                <span className="text-status-available font-medium">{totalStats.available} Available</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-status-limited-bg rounded-full text-sm">
                <Clock className="w-3.5 h-3.5 text-status-limited" />
                <span className="text-status-limited font-medium">{totalStats.reserved} Reserved</span>
              </div>
            </div>
          )}
        </div>

        {/* Empty state */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-background border border-border flex items-center justify-center">
              <Home className="w-8 h-8 text-text-muted" />
            </div>
            <h3 className="text-lg text-text-primary font-semibold mb-2">Select a Floor</h3>
            <p className="text-sm text-text-secondary">
              Use the elevator panel or click directly on the building to explore available units.
            </p>
            <p className="text-xs text-text-muted mt-3">
              Tip: Use arrow keys to navigate floors
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Detail view
  if (selectedApartment) {
    return (
      <ApartmentDetail
        apartment={selectedApartment}
        onBack={() => onApartmentClick(null)}
      />
    )
  }

  // Calculate stats
  const stats = {
    total: apartments.length,
    available: apartments.filter((a) => a.status === 'available').length,
    reserved: apartments.filter((a) => a.status === 'reserved').length,
    sold: apartments.filter((a) => a.status === 'sold').length,
  }

  // Filter apartments
  const filteredApartments = statusFilter === 'all'
    ? apartments
    : apartments.filter((a) => a.status === statusFilter)

  return (
    <div className="h-full flex flex-col">
      {/* Page Header */}
      <div className="mb-4">
        <div className="text-xs text-text-muted mb-2">
          Projects / Santa Maria / Floor {floor}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-text-primary font-semibold">Floor {floor}</h2>
            <p className="text-sm text-text-secondary mt-0.5">
              {stats.available} of {stats.total} units available
            </p>
          </div>
          {/* Future: Filters button */}
          <button className="btn-secondary text-sm gap-2 opacity-50 cursor-not-allowed" disabled>
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Segmented Control Tabs */}
      <div className="card p-1.5 mb-4">
        <div className="flex">
          <TabButton
            active={statusFilter === 'all'}
            onClick={() => setStatusFilter('all')}
            label="All"
            count={stats.total}
          />
          <TabButton
            active={statusFilter === 'available'}
            onClick={() => setStatusFilter('available')}
            label="Available"
            count={stats.available}
            icon={<Check className="w-3 h-3" />}
            color="available"
          />
          <TabButton
            active={statusFilter === 'reserved'}
            onClick={() => setStatusFilter('reserved')}
            label="Reserved"
            count={stats.reserved}
            icon={<Clock className="w-3 h-3" />}
            color="limited"
          />
          <TabButton
            active={statusFilter === 'sold'}
            onClick={() => setStatusFilter('sold')}
            label="Sold"
            count={stats.sold}
            icon={<Lock className="w-3 h-3" />}
            color="sold"
          />
        </div>
      </div>

      {/* Units Grid */}
      {filteredApartments.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-text-muted">No {statusFilter} units on this floor</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto scrollbar-thin -mx-2 px-2">
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
            {filteredApartments.map((apt) => (
              <ApartmentCard
                key={apt.id}
                apartment={apt}
                onClick={() => onApartmentClick(apt)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Segmented Tab Button Component
interface TabButtonProps {
  active: boolean
  onClick: () => void
  label: string
  count: number
  icon?: React.ReactNode
  color?: 'available' | 'limited' | 'sold'
}

function TabButton({ active, onClick, label, count, icon, color }: TabButtonProps) {
  const colorClasses = {
    available: 'text-status-available',
    limited: 'text-status-limited',
    sold: 'text-status-sold',
  }

  return (
    <button
      onClick={onClick}
      className={`
        flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-150
        flex items-center justify-center gap-1.5
        ${active
          ? 'bg-primary text-white shadow-sm'
          : 'text-text-secondary hover:bg-background'
        }
      `}
    >
      {icon && (
        <span className={active ? 'text-white' : color ? colorClasses[color] : ''}>
          {icon}
        </span>
      )}
      <span>{label}</span>
      <span className={`ml-1 ${active ? 'text-white/70' : 'text-text-muted'}`}>
        ({count})
      </span>
    </button>
  )
}
