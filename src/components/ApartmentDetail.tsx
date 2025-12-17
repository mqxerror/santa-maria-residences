import { useState } from 'react'
import { ArrowLeft, Check, Clock, Lock, Maximize2, Compass, Share2, Download, X, Bed, Bath, Building2, Sun, Wind, Wifi, Car, Shield, Waves, ChevronRight, Expand, Image, ChevronDown, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Apartment } from '@/types/database'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

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
  },
  reserved: {
    icon: Clock,
    label: 'Reserved',
    badgeClass: 'bg-status-limited/10 text-status-limited',
    dotClass: 'bg-status-limited',
    availabilityText: 'Under reservation',
  },
  sold: {
    icon: Lock,
    label: 'Sold',
    badgeClass: 'bg-status-sold/10 text-status-sold',
    dotClass: 'bg-status-sold',
    availabilityText: 'Sold',
  },
}

// Amenity data
const interiorFeatures = [
  { icon: Sun, label: 'Floor-to-Ceiling Windows' },
  { icon: Wind, label: 'Central A/C' },
  { icon: Wifi, label: 'Smart Home Ready' },
]

const buildingFeatures = [
  { icon: Car, label: 'Parking Included' },
  { icon: Shield, label: '24/7 Security' },
  { icon: Waves, label: 'Rooftop Pool' },
]

export default function ApartmentDetail({ apartment, onBack, allApartments = [] }: ApartmentDetailProps) {
  const [activeMedia, setActiveMedia] = useState<MediaType>('render')
  const [showModal, setShowModal] = useState(false)
  const [expandedSection, setExpandedSection] = useState<'interior' | 'building' | null>('interior')

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
      <div className="h-full overflow-y-auto">
        <div className="page-container py-4">
          {/* ROW 0: Breadcrumb + Title */}
          <div className="grid-12 mb-4">
            <div className="col-12">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs mb-3">
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

              {/* Title + Status */}
              <div className="flex items-start justify-between">
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
            </div>
          </div>

          {/* ROW 1: Key Stats Strip */}
          <div className="grid-12 mb-4">
            <div className="col-12">
              <div className="flex items-center gap-3 flex-wrap">
                <StatChip icon={<Bed className="w-4 h-4" />} label="Beds" value={bedrooms === 0 ? 'Studio' : String(bedrooms)} />
                <StatChip icon={<Bath className="w-4 h-4" />} label="Baths" value={String(bathrooms)} />
                <StatChip icon={<Maximize2 className="w-4 h-4" />} label="Size" value={`${apartment.size_sqm} m²`} />
                <StatChip icon={<Building2 className="w-4 h-4" />} label="Floor" value={String(apartment.floor)} />
                <StatChip
                  icon={
                    <div className="relative w-4 h-4">
                      <Compass className="w-4 h-4" />
                    </div>
                  }
                  label="View"
                  value={viewDirection.full}
                />
              </div>
            </div>
          </div>

          {/* ROW 2: Hero Media (8 cols) + Actions Sidebar (4 cols) */}
          <div className="grid-12 mb-4">
            {/* Hero Media - 8 cols */}
            <div className="col-8">
              <button
                onClick={() => setShowModal(true)}
                className="w-full relative overflow-hidden rounded-xl group cursor-pointer"
                style={{ height: 'clamp(360px, 52vh, 560px)' }}
              >
                {/* Media content */}
                {activeMedia === 'render' && (
                  <img
                    src="/assets/gallery/unit-render.jpg"
                    alt="Interior render"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                )}
                {activeMedia === 'view' && (
                  <img
                    src="/assets/gallery/view-rooftop.jpg"
                    alt="View from unit"
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                )}
                {activeMedia === 'floorplan' && (
                  <div className="w-full h-full bg-stone-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-sm">
                        <Image className="w-7 h-7 text-stone-400" />
                      </div>
                      <p className="text-stone-500 font-medium">Floorplan Coming Soon</p>
                    </div>
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Top-left: Media tabs (inside hero) */}
                <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-lg p-1">
                  {(['render', 'view', 'floorplan'] as MediaType[]).map((type) => (
                    <button
                      key={type}
                      onClick={(e) => { e.stopPropagation(); setActiveMedia(type); }}
                      className={cn(
                        'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                        activeMedia === type
                          ? 'bg-white text-stone-900'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {type === 'render' ? 'Interior' : type === 'view' ? 'View' : 'Floorplan'}
                    </button>
                  ))}
                </div>

                {/* Top-right: Fullscreen */}
                <div className="absolute top-3 right-3">
                  <span className="w-10 h-10 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-lg text-white hover:bg-black/60 transition-colors">
                    <Expand className="w-5 h-5" />
                  </span>
                </div>

                {/* Bottom-left: Current media label */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-white text-sm font-medium bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    {activeMedia === 'render' && 'Interior Render'}
                    {activeMedia === 'view' && 'Rooftop View'}
                    {activeMedia === 'floorplan' && 'Floorplan'}
                  </span>
                </div>
              </button>
            </div>

            {/* Actions Sidebar - 4 cols */}
            <div className="col-4">
              <div className="sticky top-4 bg-surface rounded-xl border border-border overflow-hidden">
                {/* Price Header */}
                <div className="p-5 border-b border-border">
                  <p className="text-xs text-text-muted uppercase tracking-wide mb-1">From</p>
                  <p className="text-3xl text-text-primary font-bold">{formatPrice(price)}</p>
                </div>

                {/* Actions */}
                <div className="p-5 space-y-3">
                  <a
                    href="/Floor_Plan_Santa_Maria.pdf"
                    download={`Unit-${apartment.floor}-${apartment.unit}-Brochure.pdf`}
                    className="w-full py-3 px-4 bg-primary hover:bg-primary-light text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Brochure
                  </a>
                  <button
                    onClick={() => {
                      const url = `${window.location.origin}/building?floor=${apartment.floor}&unit=${apartment.id}`
                      navigator.clipboard.writeText(url)
                      toast.success('Link copied to clipboard!')
                    }}
                    className="w-full py-3 px-4 bg-transparent border border-border text-text-secondary text-sm font-medium rounded-xl hover:bg-background transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Unit
                  </button>
                  <Link
                    to={`/contact?unit=${apartment.floor}-${apartment.unit}`}
                    className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Contact Us
                  </Link>
                </div>

                {/* Status */}
                <div className="px-5 pb-5 pt-2">
                  <div className="flex items-center gap-2 py-2 px-3 bg-background rounded-lg">
                    <div className={cn('w-2 h-2 rounded-full', config.dotClass)} />
                    <span className="text-xs text-text-secondary">{config.availabilityText}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: Thumbnails (8 cols) + Features (4 cols) */}
          <div className="grid-12 mb-6">
            {/* Thumbnails - 8 cols */}
            <div className="col-8">
              <div className="grid grid-cols-3 gap-3">
                {/* Render thumbnail */}
                <button
                  onClick={() => setActiveMedia('render')}
                  className={cn(
                    'aspect-[4/3] rounded-xl overflow-hidden relative',
                    activeMedia === 'render' ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'
                  )}
                >
                  <img
                    src="/assets/gallery/unit-render.jpg"
                    alt="Interior"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3">
                    <span className="text-xs text-white font-medium">Interior</span>
                  </div>
                </button>

                {/* View thumbnail */}
                <button
                  onClick={() => setActiveMedia('view')}
                  className={cn(
                    'aspect-[4/3] rounded-xl overflow-hidden relative',
                    activeMedia === 'view' ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'
                  )}
                >
                  <img
                    src="/assets/gallery/view-rooftop.jpg"
                    alt="View"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3">
                    <span className="text-xs text-white font-medium">View</span>
                  </div>
                </button>

                {/* Floorplan thumbnail - disabled */}
                <button
                  onClick={() => setActiveMedia('floorplan')}
                  className={cn(
                    'aspect-[4/3] rounded-xl overflow-hidden relative border',
                    activeMedia === 'floorplan'
                      ? 'ring-2 ring-primary ring-offset-2 bg-stone-100 border-stone-200'
                      : 'bg-stone-50 border-dashed border-stone-300 opacity-60 hover:opacity-80'
                  )}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-xl bg-stone-200/80 flex items-center justify-center mb-2">
                      <Image className="w-5 h-5 text-stone-400" />
                    </div>
                    <span className="text-xs text-stone-500 font-medium">Floorplan</span>
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-stone-200 rounded text-[10px] text-stone-500 font-medium uppercase tracking-wide">
                    Soon
                  </div>
                </button>
              </div>
            </div>

            {/* Features - 4 cols */}
            <div className="col-4 space-y-3">
              {/* Interior Features */}
              <FeatureCard
                title="Interior"
                features={interiorFeatures}
                expanded={expandedSection === 'interior'}
                onToggle={() => setExpandedSection(expandedSection === 'interior' ? null : 'interior')}
              />

              {/* Building Features */}
              <FeatureCard
                title="Building"
                features={buildingFeatures}
                expanded={expandedSection === 'building'}
                onToggle={() => setExpandedSection(expandedSection === 'building' ? null : 'building')}
              />
            </div>
          </div>

          {/* ROW 4: Similar Units */}
          {similarUnits.length > 0 && (
            <div className="grid-12">
              <div className="col-12">
                <h3 className="text-sm text-text-primary font-semibold mb-3">Similar Units</h3>
                <div className="grid grid-cols-4 gap-3">
                  {similarUnits.map((apt) => (
                    <SimilarUnitCard key={apt.id} apartment={apt} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Bar - Hidden on desktop */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-3 flex items-center gap-3 xl:hidden z-40">
        <div className="flex-1">
          <p className="text-xs text-text-muted">From</p>
          <p className="text-lg text-text-primary font-bold">{formatPrice(price)}</p>
        </div>
        <button className="flex-1 py-3 px-4 bg-primary text-white text-sm font-medium rounded-xl flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Brochure
        </button>
        <button className="w-12 h-12 flex items-center justify-center border border-border rounded-xl">
          <Share2 className="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      {/* Gallery Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4 md:p-6"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-content bg-surface rounded-2xl shadow-2xl max-w-5xl w-full flex flex-col"
            style={{ maxHeight: 'calc(100vh - 48px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
              <div>
                <h3 className="text-lg text-text-primary font-semibold">
                  Unit {apartment.floor}-{apartment.unit}
                </h3>
                <p className="text-xs text-text-muted">{unitType} • {apartment.size_sqm} m²</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={activeMedia === 'render' ? '/assets/gallery/unit-render.jpg' : activeMedia === 'view' ? '/assets/gallery/view-rooftop.jpg' : '#'}
                  download={`Unit-${apartment.floor}-${apartment.unit}-${activeMedia}.jpg`}
                  className="py-2 px-3 bg-background border border-border text-text-secondary text-xs font-medium rounded-lg hover:bg-surface transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background transition-colors"
                >
                  <X className="w-5 h-5 text-text-muted" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 min-h-0 relative overflow-hidden bg-stone-900">
              {activeMedia === 'render' && (
                <img
                  src="/assets/gallery/unit-render.jpg"
                  alt="Interior render"
                  className="w-full h-full object-contain"
                />
              )}
              {activeMedia === 'view' && (
                <img
                  src="/assets/gallery/view-rooftop.jpg"
                  alt="View from unit"
                  className="w-full h-full object-contain"
                />
              )}
              {activeMedia === 'floorplan' && (
                <div className="absolute inset-0 bg-stone-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-sm">
                      <Image className="w-7 h-7 text-stone-400" />
                    </div>
                    <p className="text-stone-500 font-medium">Floorplan Coming Soon</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Thumbnails */}
            <div className="flex border-t border-border p-4 gap-3 bg-stone-50 flex-shrink-0">
              <button
                onClick={() => setActiveMedia('render')}
                className={cn(
                  'w-20 h-16 rounded-lg overflow-hidden flex-shrink-0',
                  activeMedia === 'render' ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                )}
              >
                <img src="/assets/gallery/unit-render.jpg" alt="Interior" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => setActiveMedia('view')}
                className={cn(
                  'w-20 h-16 rounded-lg overflow-hidden flex-shrink-0',
                  activeMedia === 'view' ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                )}
              >
                <img src="/assets/gallery/view-rooftop.jpg" alt="View" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => setActiveMedia('floorplan')}
                className={cn(
                  'w-20 h-16 rounded-lg bg-stone-200 flex items-center justify-center flex-shrink-0',
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

// Stat Chip Component - Compact horizontal chip
function StatChip({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-surface border border-border rounded-lg">
      <span className="text-text-muted">{icon}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-text-muted">{label}</span>
        <span className="text-sm text-text-primary font-semibold">{value}</span>
      </div>
    </div>
  )
}

// Feature Card Component - Collapsible on mobile
function FeatureCard({
  title,
  features,
  expanded,
  onToggle,
}: {
  title: string
  features: { icon: React.ElementType; label: string }[]
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <div className="bg-surface rounded-xl border border-border overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 xl:cursor-default"
      >
        <h4 className="text-xs text-text-muted uppercase tracking-wide font-medium">{title}</h4>
        <ChevronDown className={cn('w-4 h-4 text-text-muted xl:hidden transition-transform', expanded && 'rotate-180')} />
      </button>
      <div className={cn('px-3 pb-3 space-y-2', !expanded && 'hidden xl:block')}>
        {features.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-background flex items-center justify-center">
              <item.icon className="w-3 h-3 text-accent" />
            </div>
            <span className="text-xs text-text-secondary">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Similar Unit Card
function SimilarUnitCard({ apartment }: { apartment: Apartment }) {
  const config = statusConfig[apartment.status]
  const price = getEstimatedPrice(apartment.floor, apartment.size_sqm)

  return (
    <div className="bg-surface rounded-xl border border-border p-3 hover:border-border-dark transition-colors cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-text-primary font-semibold">
          {apartment.floor}-{apartment.unit}
        </span>
        <div className={cn('w-2 h-2 rounded-full', config.dotClass)} />
      </div>
      <p className="text-xs text-text-muted mb-1">{apartment.size_sqm} m²</p>
      <p className="text-sm text-text-secondary font-medium">{formatPrice(price)}</p>
    </div>
  )
}
