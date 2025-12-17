import { Link } from 'react-router-dom'
import { projectConfig } from '@/config/project'
import {
  MapPin,
  Navigation,
  Clock,
  Car,
  Plane,
  ShoppingBag,
  GraduationCap,
  Stethoscope,
  Building2,
  Utensils,
  TreePine,
  ArrowRight,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import Footer from '@/components/Footer'

const nearbyLocations = [
  {
    category: 'Shopping',
    icon: ShoppingBag,
    places: [
      { name: 'Multiplaza Pacific Mall', distance: '5 min', type: 'Premium shopping center' },
      { name: 'Albrook Mall', distance: '12 min', type: 'Largest mall in Central America' },
      { name: 'Soho Mall', distance: '8 min', type: 'Luxury boutiques' },
    ]
  },
  {
    category: 'Education',
    icon: GraduationCap,
    places: [
      { name: 'Balboa Academy', distance: '7 min', type: 'International school' },
      { name: 'King\'s College', distance: '10 min', type: 'British curriculum' },
      { name: 'USMA University', distance: '8 min', type: 'Higher education' },
    ]
  },
  {
    category: 'Healthcare',
    icon: Stethoscope,
    places: [
      { name: 'Hospital Punta Pacífica', distance: '6 min', type: 'Johns Hopkins affiliated' },
      { name: 'Hospital Nacional', distance: '10 min', type: 'Full-service hospital' },
      { name: 'Centro Médico Paitilla', distance: '8 min', type: 'Medical center' },
    ]
  },
  {
    category: 'Dining',
    icon: Utensils,
    places: [
      { name: 'Casco Antiguo', distance: '15 min', type: 'Historic district dining' },
      { name: 'Costa del Este', distance: '12 min', type: 'Upscale restaurants' },
      { name: 'Calle Uruguay', distance: '5 min', type: 'Vibrant nightlife & dining' },
    ]
  },
  {
    category: 'Recreation',
    icon: TreePine,
    places: [
      { name: 'Parque Omar', distance: '3 min', type: 'Urban park, jogging trails' },
      { name: 'Cinta Costera', distance: '8 min', type: 'Oceanfront promenade' },
      { name: 'Panama Canal', distance: '20 min', type: 'Miraflores Locks visitor center' },
    ]
  },
  {
    category: 'Business',
    icon: Building2,
    places: [
      { name: 'Banking District', distance: '5 min', type: 'Financial hub' },
      { name: 'World Trade Center', distance: '8 min', type: 'Business center' },
      { name: 'Obarrio', distance: '6 min', type: 'Commercial district' },
    ]
  },
]

const transportInfo = [
  {
    icon: Plane,
    title: 'Tocumen International Airport',
    distance: '25 km',
    time: '25-35 min',
    description: 'Panama\'s main international airport'
  },
  {
    icon: Car,
    title: 'Corredor Sur Highway',
    distance: '2 km',
    time: '3 min',
    description: 'Direct access to airport and Costa del Este'
  },
  {
    icon: Navigation,
    title: 'Metro Line 1',
    distance: '1.5 km',
    time: '5 min walk',
    description: 'Via España station nearby'
  },
]

export default function LocationPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { location } = projectConfig

  // Google Maps embed URL
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d${location.coordinates.lng}!3d${location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMjkuNSJOIDc5wrAzMCcxMi4yIlc!5e0!3m2!1sen!2sus!4v1702000000000!5m2!1sen!2sus`

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://www.mercan.com/wp-content/uploads/2024/06/logo.png"
                alt="Mercan Group"
                className="h-14 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-sm text-text-secondary hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link to="/building" className="text-sm text-text-secondary hover:text-primary transition-colors font-medium">
                Explore
              </Link>
              <Link to="/location" className="text-sm text-primary font-medium">
                Location
              </Link>
              <Link to="/about" className="text-sm text-text-secondary hover:text-primary transition-colors font-medium">
                About
              </Link>
              <Link to="/contact" className="text-sm text-text-secondary hover:text-primary transition-colors font-medium">
                Contact
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-background rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Nav Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border mt-4 pt-3 space-y-2">
              <Link to="/" className="block py-2 text-sm text-text-secondary hover:text-primary">Home</Link>
              <Link to="/building" className="block py-2 text-sm text-text-secondary hover:text-primary">Explore</Link>
              <Link to="/location" className="block py-2 text-sm text-primary font-medium">Location</Link>
              <Link to="/about" className="block py-2 text-sm text-text-secondary hover:text-primary">About</Link>
              <Link to="/contact" className="block py-2 text-sm text-text-secondary hover:text-primary">Contact</Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Map Section */}
      <section id="main-content" className="relative">
        {/* Full-width map */}
        <div className="h-[50vh] md:h-[60vh] w-full">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${projectConfig.name} location map`}
            className="w-full h-full"
          />
        </div>

        {/* Location Card Overlay */}
        <div className="absolute bottom-0 left-0 right-0 md:bottom-8 md:left-8 md:right-auto">
          <div className="bg-white md:rounded-2xl shadow-xl p-6 md:max-w-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-text-primary mb-1">
                  {location.neighborhood}
                </h2>
                <p className="text-sm text-text-secondary mb-2">
                  {location.address}
                </p>
                <p className="text-xs text-text-muted">
                  {location.city}, {location.country}
                </p>
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${location.coordinates.lat},${location.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Transportation Section */}
      <section className="py-12 md:py-16 bg-surface">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-accent text-sm font-medium tracking-wider uppercase mb-2">
              Connectivity
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-text-primary">
              Easy Access to Everywhere
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {transportInfo.map((item, i) => (
              <div key={i} className="bg-background rounded-2xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-1">{item.title}</h3>
                    <p className="text-xs text-text-muted mb-2">{item.description}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1 text-text-secondary">
                        <MapPin className="w-3 h-3" />
                        {item.distance}
                      </span>
                      <span className="flex items-center gap-1 text-text-secondary">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Places Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-accent text-sm font-medium tracking-wider uppercase mb-2">
              Neighborhood
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-text-primary">
              Everything Within Reach
            </h2>
            <p className="text-text-secondary mt-2 max-w-2xl mx-auto">
              {location.neighborhood} is one of {location.city}'s most desirable neighborhoods,
              offering convenient access to the city's best amenities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyLocations.map((category, i) => (
              <div key={i} className="bg-surface rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-text-primary">{category.category}</h3>
                </div>
                <ul className="space-y-3">
                  {category.places.map((place, j) => (
                    <li key={j} className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{place.name}</p>
                        <p className="text-xs text-text-muted">{place.type}</p>
                      </div>
                      <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded-full">
                        {place.distance}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 md:py-16 bg-primary">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                Interested in the Location?
              </h2>
              <p className="text-white/70 max-w-md">
                Experience the location firsthand. Our sales team is ready to show you around.
              </p>
            </div>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-6 py-3 bg-white text-primary font-medium rounded-xl hover:bg-white/90 transition-colors"
            >
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
