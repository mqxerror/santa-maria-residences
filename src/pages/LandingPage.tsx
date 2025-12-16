import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Apartment } from '@/types/database'
import { projectConfig } from '@/config/project'
import { MapPin, Gem, Building2, TrendingUp, ChevronRight, Download, Phone, ArrowRight, Check } from 'lucide-react'

const iconMap = {
  MapPin,
  Gem,
  Building2,
  TrendingUp,
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [selectedBeds, setSelectedBeds] = useState<string>('any')
  const [selectedStatus, setSelectedStatus] = useState<string>('available')

  const { data: apartments = [] } = useQuery({
    queryKey: ['apartments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('apartments')
        .select('*')
        .order('floor', { ascending: false })

      if (error) throw error
      return data as Apartment[]
    },
  })

  // Calculate stats
  const stats = {
    available: apartments.filter((a) => a.status === 'available').length,
    floors: projectConfig.building.totalFloors,
    startingPrice: projectConfig.pricing.startingFrom,
  }

  // Featured units (available, higher floors)
  const featuredUnits = apartments
    .filter((a) => a.status === 'available')
    .sort((a, b) => b.floor - a.floor)
    .slice(0, 4)

  const handleSearch = () => {
    navigate('/building')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="page-container py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-lg">SM</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Santa Maria</h1>
                <p className="text-xs text-white/60 -mt-0.5">Residences</p>
              </div>
            </Link>
            <nav className="flex items-center gap-6">
              <Link to="/building" className="text-sm text-white/80 hover:text-white transition-colors font-medium">
                Explore
              </Link>
              <Link to="/about" className="text-sm text-white/80 hover:text-white transition-colors font-medium">
                About
              </Link>
              <Link to="/contact" className="text-sm text-white/80 hover:text-white transition-colors font-medium">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={projectConfig.media.heroImage}
            alt={projectConfig.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative page-container">
          <div className="max-w-2xl">
            <p className="text-accent text-sm font-medium tracking-wider uppercase mb-4">
              {projectConfig.location.neighborhood}, {projectConfig.location.city}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              {projectConfig.name}
            </h1>
            <p className="text-xl text-white/80 mb-8">
              {projectConfig.tagline}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 mb-10">
              <Link
                to="/building"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-white font-medium rounded-xl transition-colors"
              >
                Explore Availability
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl transition-colors border border-white/20">
                <Download className="w-4 h-4" />
                Download Brochure
              </button>
            </div>

            {/* Stats Chips */}
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10">
                <p className="text-xs text-white/60">Floors</p>
                <p className="text-lg text-white font-semibold">{stats.floors}</p>
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10">
                <p className="text-xs text-white/60">Available</p>
                <p className="text-lg text-white font-semibold">{stats.available} units</p>
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10">
                <p className="text-xs text-white/60">Starting from</p>
                <p className="text-lg text-white font-semibold">{stats.startingPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Bar */}
      <section className="relative -mt-12 z-10">
        <div className="page-container">
          <div className="bg-surface rounded-2xl shadow-lg border border-border p-6">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <label className="text-xs text-text-muted block mb-2">Bedrooms</label>
                <select
                  value={selectedBeds}
                  onChange={(e) => setSelectedBeds(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="any">Any</option>
                  <option value="studio">Studio</option>
                  <option value="1">1 Bedroom</option>
                  <option value="2">2 Bedrooms</option>
                  <option value="3">3 Bedrooms</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-xs text-text-muted block mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="available">Available Only</option>
                  <option value="all">All Units</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-xs text-text-muted block mb-2">Budget</label>
                <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                  <option value="any">Any Budget</option>
                  <option value="300">Under $300K</option>
                  <option value="500">Under $500K</option>
                  <option value="750">Under $750K</option>
                  <option value="1000">$1M+</option>
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="px-8 py-3 bg-primary hover:bg-primary-light text-white font-medium rounded-xl transition-colors flex items-center gap-2"
              >
                View Units
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Strip */}
      <section className="py-16">
        <div className="page-container">
          <div className="grid grid-cols-4 gap-6">
            {projectConfig.highlights.map((highlight, i) => {
              const Icon = iconMap[highlight.icon as keyof typeof iconMap]
              return (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-text-primary mb-2">{highlight.title}</h3>
                  <p className="text-sm text-text-secondary">{highlight.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Availability */}
      <section className="py-16 bg-surface">
        <div className="page-container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-text-primary">Featured Availability</h2>
              <p className="text-sm text-text-secondary mt-1">Hand-picked premium units</p>
            </div>
            <Link
              to="/building"
              className="text-sm text-primary hover:text-primary-light font-medium flex items-center gap-1"
            >
              View all units
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {featuredUnits.map((apt) => (
              <FeaturedUnitCard key={apt.id} apartment={apt} />
            ))}
          </div>
        </div>
      </section>

      {/* Location & Lifestyle */}
      <section className="py-16">
        <div className="page-container">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent text-sm font-medium tracking-wider uppercase mb-3">Location</p>
              <h2 className="text-3xl font-semibold text-text-primary mb-4">
                In the Heart of {projectConfig.location.city}
              </h2>
              <p className="text-text-secondary mb-6">
                {projectConfig.location.neighborhood} offers the perfect balance of urban convenience and residential tranquility. Walking distance to premier shopping, dining, and entertainment.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {projectConfig.amenities.nearby.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-[4/3] bg-stone-200 rounded-2xl overflow-hidden">
              {/* Map placeholder */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary/30 mx-auto mb-3" />
                  <p className="text-sm text-text-muted">Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 bg-primary">
        <div className="page-container">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-2">Ready to find your new home?</h2>
              <p className="text-white/70">Speak with our sales team today</p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={`tel:${projectConfig.contact.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-medium rounded-xl hover:bg-white/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              >
                Contact Form
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-stone-900">
        <div className="page-container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <span className="text-white/60 text-sm">{projectConfig.name}</span>
            </div>
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} {projectConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Featured Unit Card
function FeaturedUnitCard({ apartment }: { apartment: Apartment }) {
  const getUnitType = (sizeSqm: number): string => {
    if (sizeSqm >= 150) return 'Penthouse'
    if (sizeSqm >= 120) return '3 Bed'
    if (sizeSqm >= 90) return '2 Bed'
    if (sizeSqm >= 75) return '1 Bed'
    return 'Studio'
  }

  const getPrice = (floor: number, sizeSqm: number): string => {
    const price = (3500 + (floor - 7) * 50) * sizeSqm
    if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
    return `$${Math.round(price / 1000)}K`
  }

  return (
    <Link
      to="/building"
      className="bg-background rounded-xl border border-border p-4 hover:border-primary/30 hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-semibold text-text-primary">
          {apartment.floor}-{apartment.unit}
        </span>
        <span className="px-2 py-0.5 bg-status-available/10 text-status-available text-xs font-medium rounded-full">
          Available
        </span>
      </div>
      <p className="text-xs text-text-muted mb-2">{getUnitType(apartment.size_sqm)} · {apartment.size_sqm} m²</p>
      <p className="text-base text-text-primary font-semibold">{getPrice(apartment.floor, apartment.size_sqm)}</p>
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
        <span className="text-xs text-text-muted">Floor {apartment.floor}</span>
        <span className="text-xs text-primary font-medium group-hover:underline flex items-center gap-1">
          View Details
          <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  )
}
