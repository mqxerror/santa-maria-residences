import { useState } from 'react'
import { ArrowLeft, Check, Clock, Lock, Maximize2, Compass, Share2, Download, X, Bed, Bath, Building2, Sun, Wind, Wifi, Car, Shield, Waves, ChevronRight, Expand, Image } from 'lucide-react'
import type { Apartment } from '@/types/database'
import { cn } from '@/lib/utils'

interface ApartmentDetailProps {
  apartment: Apartment
  onBack: () => void
  allApartments?: Apartment[]
}

type MediaType = 'render' | 'view' | 'floorplan'

const getUnitType = (sizeSqm: number): string => {
  if (sizeSqm >= 150) return 'Penthouse'
  if (sizeSqm >= 120) return '3 Bedroom'
  if (sizeSqm >= 90) return '2 Bedroom'
  if (sizeSqm >= 75) return '1 Bedroom'
  return 'Studio'
}

const getBedrooms = (sizeSqm: number): number => {
  if (sizeSqm >= 150) return 4
  if (sizeSqm >= 120) return 3
  if (sizeSqm >= 90) return 2
  if (sizeSqm >= 75) return 1
  return 0
}

const getBathrooms = (sizeSqm: number): number => {
  if (sizeSqm >= 150) return 3
  if (sizeSqm >= 120) return 2
  if (sizeSqm >= 90) return 2
  if (sizeSqm >= 75) return 1
  return 1
}

const getEstimatedPrice = (floor: number, sizeSqm: number): number => {
  const basePrice = 3500
  const floorPremium = (floor - 7) * 50
  return (basePrice + floorPremium) * sizeSqm
}

const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(2)}M`
  }
  return `$${Math.round(price / 1000)}K`
}

const getViewDirection = (unit: string): { full: string; short: string; degrees: number } => {
  const directions: Record<string, { full: string; short: string; degrees: number }> = {
    'A': { full: 'North', short: 'N', degrees: 0 },
    'B': { full: 'Northeast', short: 'NE', degrees: 45 },
    'C': { full: 'East', short: 'E', degrees: 90 },
    'D': { full: 'West', short: 'W', degrees: 270 },
    'E': { full: 'Southeast', short: 'SE', degrees: 135 },
    'F': { full: 'South', short: 'S', degrees: 180 },
  }
  return directions[unit] || { full: 'City', short: 'C', degrees: 0 }
}

const statusConfig = {
  available: {
    icon: Check,
    label: 'Available',
    badgeClass: 'bg-status-available/10 text-status-available',
    dotClass: 'bg-status-available',
    availabilityText: 'Available now',
    availabilityNote: 'Inquire to reserve',
  },
  reserved: {
    icon: Clock,
    label: 'Reserved',
    badgeClass: 'bg-status-limited/10 text-status-limited',
    dotClass: 'bg-status-limited',
    availabilityText: 'Under reservation',
    availabilityNote: 'Join waitlist for updates',
  },
  sold: {
    icon: Lock,
    label: 'Sold',
    badgeClass: 'bg-status-sold/10 text-status-sold',
    dotClass: 'bg-status-sold',
    availabilityText: 'Sold',
    availabilityNote: 'View similar units',
  },
}

// Amenity groups
const amenityGroups = {
  interior: {
    label: 'Interior',
    items: [
      { icon: Sun, label: 'Floor-to-Ceiling Windows' },
      { icon: Wind, label: 'Central A/C' },
      { icon: Wifi, label: 'Smart Home Ready' },
    ],
  },
  building: {
    label: 'Building',
    items: [
      { icon: Car, label: 'Parking Included' },
      { icon: Shield, label: '24/7 Security' },
      { icon: Waves, label: 'Rooftop Pool' },
    ],
  },
}

export default function ApartmentDetail({ apartment, onBack, allApartments = [] }: ApartmentDetailProps) {
  const [activeMedia, setActiveMedia] = useState<MediaType>('render')
  const [showModal, setShowModal] = useState(false)

  const config = statusConfig[apartment.status]
  const unitType = getUnitType(apartment.size_sqm)
  const bedrooms = getBedrooms(apartment.size_sqm)
  const bathrooms = getBathrooms(apartment.size_sqm)
  const price = getEstimatedPrice(apartment.floor, apartment.size_sqm)
  const viewDirection = getViewDirection(apartment.unit)
  const StatusIcon = config.icon

  // Similar units
  const similarUnits = allApartments.filter(
    (a) => a.id !== apartment.id && Math.abs(a.size_sqm - apartment.size_sqm) < 20
  ).slice(0, 4)

  return (
    <>
      <div className="h-full flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-4 text-xs">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-text-muted hover:text-text-secondary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
          <span className="text-text-muted">/</span>
          <span className="text-text-muted">Santa Maria</span>
          <ChevronRight className="w-3 h-3 text-text-muted" />
          <span className="text-text-muted">Floor {apartment.floor}</span>
          <ChevronRight className="w-3 h-3 text-text-muted" />
          <span className="text-text-secondary font-medium">Unit {apartment.unit}</span>
        </div>

        {/* Two Column Layout */}
        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin pr-2">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl text-text-primary font-semibold">
                  Unit {apartment.floor}-{apartment.unit}
                </h1>
                <p className="text-sm text-text-secondary mt-0.5">{unitType} Residence</p>
              </div>
              <div className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                config.badgeClass
              )}>
                <StatusIcon className="w-3 h-3" />
                <span>{config.label}</span>
              </div>
            </div>

            {/* Above Fold: Key Facts */}
            <div className="grid grid-cols-5 gap-3 mb-5">
              <KeyFact icon={<Bed className="w-4 h-4" />} label="Bedrooms" value={bedrooms === 0 ? 'Studio' : String(bedrooms)} />
              <KeyFact icon={<Bath className="w-4 h-4" />} label="Bathrooms" value={String(bathrooms)} />
              <KeyFact icon={<Maximize2 className="w-4 h-4" />} label="Size" value={`${apartment.size_sqm} m²`} />
              <KeyFact icon={<Building2 className="w-4 h-4" />} label="Floor" value={String(apartment.floor)} />
              <KeyFact
                icon={
                  <div className="relative w-4 h-4">
                    <Compass className="w-4 h-4" />
                    <div
                      className="absolute top-0 left-1/2 w-0.5 h-1.5 bg-accent rounded-full origin-bottom"
                      style={{ transform: `translateX(-50%) rotate(${viewDirection.degrees}deg)` }}
                    />
                  </div>
                }
                label="View"
                value={viewDirection.short}
              />
            </div>

            {/* Availability Timeline */}
            <div className="flex items-center gap-2 mb-5 py-2 px-3 bg-background rounded-lg border border-border">
              <div className={cn('w-2 h-2 rounded-full', config.dotClass)} />
              <span className="text-xs text-text-secondary">{config.availabilityText}</span>
              <span className="text-xs text-text-muted ml-auto">{config.availabilityNote}</span>
            </div>

            {/* Media Gallery - Featured + Thumbnails */}
            <div className="mb-5">
              {/* Featured Image */}
              <button
                onClick={() => setShowModal(true)}
                className="w-full aspect-[16/9] relative overflow-hidden rounded-xl group cursor-pointer mb-3"
              >
                {/* Render image */}
                {activeMedia === 'render' && (
                  <>
                    <img
                      src="/assets/gallery/unit-render.jpg"
                      alt="Interior render"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </>
                )}

                {/* View image */}
                {activeMedia === 'view' && (
                  <>
                    <img
                      src="/assets/gallery/view-rooftop.jpg"
                      alt="View from unit"
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </>
                )}

                {/* Floorplan placeholder */}
                {activeMedia === 'floorplan' && (
                  <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-sm">
                        <Image className="w-5 h-5 text-stone-400" />
                      </div>
                      <p className="text-sm text-stone-500 font-medium">Floorplan</p>
                      <p className="text-xs text-stone-400 mt-0.5">Coming soon</p>
                    </div>
                  </div>
                )}

                {/* Overlay controls */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                  <span className="text-white text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
                    {activeMedia === 'render' && 'Interior Render'}
                    {activeMedia === 'view' && 'Rooftop View'}
                    {activeMedia === 'floorplan' && 'Floorplan'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <Expand className="w-4 h-4 text-stone-700" />
                    </span>
                  </div>
                </div>
              </button>

              {/* Thumbnail Row */}
              <div className="grid grid-cols-3 gap-2">
                {/* Render thumbnail */}
                <button
                  onClick={() => setActiveMedia('render')}
                  className={cn(
                    'aspect-[4/3] rounded-lg overflow-hidden relative',
                    activeMedia === 'render' ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'
                  )}
                >
                  <img
                    src="/assets/gallery/unit-render.jpg"
                    alt="Interior"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent py-1.5 px-2">
                    <span className="text-[10px] text-white font-medium">Interior</span>
                  </div>
                </button>

                {/* View thumbnail */}
                <button
                  onClick={() => setActiveMedia('view')}
                  className={cn(
                    'aspect-[4/3] rounded-lg overflow-hidden relative',
                    activeMedia === 'view' ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'
                  )}
                >
                  <img
                    src="/assets/gallery/view-rooftop.jpg"
                    alt="View"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent py-1.5 px-2">
                    <span className="text-[10px] text-white font-medium">View</span>
                  </div>
                </button>

                {/* Floorplan thumbnail - proper disabled state */}
                <button
                  onClick={() => setActiveMedia('floorplan')}
                  className={cn(
                    'aspect-[4/3] rounded-lg overflow-hidden relative border',
                    activeMedia === 'floorplan'
                      ? 'ring-2 ring-primary ring-offset-2 bg-stone-100 border-stone-200'
                      : 'bg-stone-50 border-dashed border-stone-300 opacity-60 hover:opacity-80'
                  )}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-6 h-6 rounded bg-stone-200/80 flex items-center justify-center mb-1">
                      <Image className="w-3 h-3 text-stone-400" />
                    </div>
                    <span className="text-[10px] text-stone-500 font-medium">Floorplan</span>
                  </div>
                  {/* Coming Soon badge */}
                  <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-stone-200 rounded text-[8px] text-stone-500 font-medium uppercase tracking-wide">
                    Soon
                  </div>
                </button>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="mb-5">
              <h3 className="text-sm text-text-primary font-semibold mb-3">Features & Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(amenityGroups).map(([key, group]) => (
                  <div key={key} className="bg-surface rounded-xl border border-border p-4">
                    <h4 className="text-xs text-text-muted uppercase tracking-wide mb-3">{group.label}</h4>
                    <div className="space-y-2.5">
                      {group.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-background flex items-center justify-center">
                            <item.icon className="w-3.5 h-3.5 text-accent" />
                          </div>
                          <span className="text-xs text-text-secondary">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Units */}
            {similarUnits.length > 0 && (
              <div className="mb-5">
                <h3 className="text-sm text-text-primary font-semibold mb-3">Similar Units</h3>
                <div className="grid grid-cols-4 gap-2">
                  {similarUnits.map((apt) => (
                    <SimilarUnitCard key={apt.id} apartment={apt} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar */}
          <div className="w-72 shrink-0">
            <div className="sticky top-0 bg-surface rounded-xl border border-border overflow-hidden">
              {/* Price Header */}
              <div className="p-4 border-b border-border">
                <p className="text-xs text-text-muted uppercase tracking-wide mb-1">From</p>
                <p className="text-2xl text-text-primary font-bold">{formatPrice(price)}</p>
                <p className="text-xs text-text-muted mt-1">
                  Est. ${Math.round(price / 240).toLocaleString()}/mo
                </p>
              </div>

              {/* Actions */}
              <div className="p-4 space-y-2">
                {/* Primary actions */}
                <button className="w-full py-2.5 px-4 bg-primary hover:bg-primary-light text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Brochure
                </button>
                <button className="w-full py-2.5 px-4 bg-transparent border border-border text-text-secondary text-sm font-medium rounded-xl hover:bg-background transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Unit
                </button>
              </div>

              {/* Status */}
              <div className="px-4 pb-4 pt-2 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className={cn('w-2 h-2 rounded-full', config.dotClass)} />
                  <span className="text-xs text-text-muted">{config.availabilityText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-8"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-content bg-surface rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <h3 className="text-lg text-text-primary font-semibold">
                  Unit {apartment.floor}-{apartment.unit}
                </h3>
                <p className="text-xs text-text-muted">{unitType} • {apartment.size_sqm} m²</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="py-2 px-3 bg-background border border-border text-text-secondary text-xs font-medium rounded-lg hover:bg-surface transition-colors flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background transition-colors"
                >
                  <X className="w-5 h-5 text-text-muted" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="aspect-[16/10] relative overflow-hidden bg-stone-900">
              {/* Render image */}
              {activeMedia === 'render' && (
                <img
                  src="/assets/gallery/unit-render.jpg"
                  alt="Interior render"
                  className="w-full h-full object-contain"
                />
              )}

              {/* View image */}
              {activeMedia === 'view' && (
                <img
                  src="/assets/gallery/view-rooftop.jpg"
                  alt="View from unit"
                  className="w-full h-full object-contain"
                />
              )}

              {/* Floorplan placeholder */}
              {activeMedia === 'floorplan' && (
                <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-sm">
                      <Image className="w-7 h-7 text-stone-400" />
                    </div>
                    <p className="text-stone-500 font-medium">Floorplan Coming Soon</p>
                    <p className="text-sm text-stone-400 mt-1">Architectural drawings will be available shortly</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Thumbnails */}
            <div className="flex border-t border-border p-3 gap-2 bg-stone-50">
              <button
                onClick={() => setActiveMedia('render')}
                className={cn(
                  'w-20 h-14 rounded-lg overflow-hidden',
                  activeMedia === 'render' ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                )}
              >
                <img src="/assets/gallery/unit-render.jpg" alt="Interior" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => setActiveMedia('view')}
                className={cn(
                  'w-20 h-14 rounded-lg overflow-hidden',
                  activeMedia === 'view' ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                )}
              >
                <img src="/assets/gallery/view-rooftop.jpg" alt="View" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => setActiveMedia('floorplan')}
                className={cn(
                  'w-20 h-14 rounded-lg bg-stone-200 flex items-center justify-center',
                  activeMedia === 'floorplan' ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                )}
              >
                <Image className="w-5 h-5 text-stone-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Key Fact Component
function KeyFact({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-surface rounded-xl border border-border p-3 text-center">
      <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-background flex items-center justify-center text-text-muted">
        {icon}
      </div>
      <p className="text-xs text-text-muted mb-0.5">{label}</p>
      <p className="text-sm text-text-primary font-semibold">{value}</p>
    </div>
  )
}

// Similar Unit Card
function SimilarUnitCard({ apartment }: { apartment: Apartment }) {
  const config = statusConfig[apartment.status]
  const price = getEstimatedPrice(apartment.floor, apartment.size_sqm)

  return (
    <div className="bg-surface rounded-lg border border-border p-2.5 hover:border-border-dark transition-colors cursor-pointer">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-text-primary font-semibold">
          {apartment.floor}-{apartment.unit}
        </span>
        <div className={cn('w-1.5 h-1.5 rounded-full', config.dotClass)} />
      </div>
      <p className="text-[10px] text-text-muted">{apartment.size_sqm} m²</p>
      <p className="text-xs text-text-secondary font-medium mt-1">{formatPrice(price)}</p>
    </div>
  )
}
