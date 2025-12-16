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
          {/* Layered gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
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
            <div className="flex items-center gap-3 mb-10">
              <Link
                to="/building"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-white font-medium rounded-xl transition-colors"
              >
                Explore Availability
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="inline-flex items-center gap-2 px-5 py-3 text-white/80 hover:text-white text-sm font-medium transition-colors">
                <Download className="w-4 h-4" />
                Brochure
              </button>
            </div>

            {/* Consolidated Stats Pill */}
            <div className="inline-flex items-center gap-6 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">{stats.floors}</span>
                <span className="text-white/60 text-sm">Floors</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">{stats.available}</span>
                <span className="text-white/60 text-sm">Available</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">{stats.startingPrice}</span>
                <span className="text-white/60 text-sm">Starting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Bar */}
      <section className="relative -mt-10 z-10">
        <div className="page-container">
          <div className="bg-surface rounded-xl shadow-lg border border-border px-5 py-4">
            <div className="flex items-center gap-3">
              <select
                value={selectedBeds}
                onChange={(e) => setSelectedBeds(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="any">All Bedrooms</option>
                <option value="studio">Studio</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="penthouse">Penthouse</option>
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="available">Available</option>
                <option value="all">All Status</option>
              </select>
              <select className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                <option value="any">Any Budget</option>
                <option value="300">Under $300K</option>
                <option value="500">Under $500K</option>
                <option value="750">Under $750K</option>
                <option value="1000">$1M+</option>
              </select>
              <div className="flex-1 text-right">
                <span className="text-sm text-text-muted">
                  <span className="font-semibold text-text-primary">{stats.available}</span> units available
                </span>
              </div>
              <button
                onClick={handleSearch}
                className="px-5 py-2 bg-primary hover:bg-primary-light text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                View Units
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Strip */}
      <section className="pt-20 pb-16">
        <div className="page-container">
          <div className="grid grid-cols-4 gap-8">
            {projectConfig.highlights.map((highlight, i) => {
              const Icon = iconMap[highlight.icon as keyof typeof iconMap]
              return (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary mb-1">{highlight.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{highlight.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Availability */}
      <section className="py-20 bg-stone-50 border-y border-stone-200/60">
        <div className="page-container">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Featured Units</h2>
              <p className="text-sm text-text-muted mt-0.5">Premium high-floor residences</p>
            </div>
            <Link
              to="/building"
              className="text-sm text-primary hover:text-primary-light font-medium flex items-center gap-1"
            >
              View all {stats.available} available
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {featuredUnits.map((apt, index) => (
              <FeaturedUnitCard key={apt.id} apartment={apt} rank={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Location & Lifestyle */}
      <section className="py-20">
        <div className="page-container">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-accent text-xs font-medium tracking-wider uppercase mb-2">Location</p>
              <h2 className="text-2xl font-semibold text-text-primary mb-3">
                In the Heart of {projectConfig.location.city}
              </h2>
              <p className="text-sm text-text-secondary mb-5 leading-relaxed">
                {projectConfig.location.neighborhood} offers the perfect balance of urban convenience and residential tranquility. Walking distance to premier shopping, dining, and entertainment.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {projectConfig.amenities.nearby.slice(0, 4).map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-[4/3] bg-stone-100 rounded-xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-primary/20 mx-auto mb-2" />
                  <p className="text-xs text-text-muted">Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Footer */}
      <footer className="bg-stone-900">
        <div className="page-container py-10">
          <div className="flex items-center justify-between pb-8 border-b border-white/10">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Ready to find your new home?</h2>
              <p className="text-sm text-white/60">Speak with our sales team today</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${projectConfig.contact.phone}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-stone-900 text-sm font-medium rounded-lg hover:bg-white/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-colors"
              >
                Contact
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-between pt-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SM</span>
              </div>
              <span className="text-white/50 text-sm">{projectConfig.name}</span>
            </div>
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} {projectConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Featured Unit Card
function FeaturedUnitCard({ apartment, rank }: { apartment: Apartment; rank: number }) {
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

  const getFeatureLabel = (rank: number, floor: number, sizeSqm: number): string => {
    if (sizeSqm >= 150) return 'Penthouse'
    if (rank === 0) return 'Highest floor'
    if (floor >= 35) return 'Premium views'
    if (sizeSqm >= 120) return 'Spacious layout'
    return 'Best value'
  }

  return (
    <Link
      to="/building"
      className="bg-white rounded-xl border border-stone-200 p-4 hover:border-primary/30 hover:shadow-md transition-all group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-accent font-medium">{getFeatureLabel(rank, apartment.floor, apartment.size_sqm)}</span>
        <span className="text-xs text-text-muted">Floor {apartment.floor}</span>
      </div>
      <div className="mb-3">
        <span className="text-lg font-semibold text-text-primary">
          {apartment.floor}-{apartment.unit}
        </span>
        <p className="text-xs text-text-muted mt-0.5">{getUnitType(apartment.size_sqm)} · {apartment.size_sqm} m²</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-base text-text-primary font-semibold">{getPrice(apartment.floor, apartment.size_sqm)}</p>
        <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          View
          <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  )
}
