import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projectConfig } from '@/config/project'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ChevronRight } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'general',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="page-container py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">SM</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-text-primary">Santa Maria</h1>
                <p className="text-xs text-text-muted -mt-0.5">Residences</p>
              </div>
            </Link>
            <nav className="flex items-center gap-6">
              <Link to="/" className="text-sm text-text-secondary hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link to="/building" className="text-sm text-text-secondary hover:text-primary transition-colors font-medium">
                Explore
              </Link>
              <Link to="/about" className="text-sm text-text-secondary hover:text-primary transition-colors font-medium">
                About
              </Link>
              <Link to="/contact" className="text-sm text-primary font-medium">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-16">
        <div className="page-container">
          <div className="grid grid-cols-12 gap-12">
            {/* Left: Contact Info */}
            <div className="col-span-5">
              <p className="text-accent text-sm font-medium tracking-wider uppercase mb-3">
                Get in Touch
              </p>
              <h1 className="text-4xl font-semibold text-text-primary mb-4">
                Contact Us
              </h1>
              <p className="text-text-secondary mb-8">
                Ready to find your dream home? Our sales team is here to help you every step of the way.
              </p>

              {/* Contact Cards */}
              <div className="space-y-4 mb-8">
                {/* Phone */}
                <a
                  href={`tel:${projectConfig.contact.phone}`}
                  className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border hover:border-primary/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Call Us</p>
                    <p className="text-base font-semibold text-text-primary group-hover:text-primary transition-colors">
                      {projectConfig.contact.phone}
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${projectConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border hover:border-accent/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">WhatsApp</p>
                    <p className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors">
                      {projectConfig.contact.whatsapp}
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${projectConfig.contact.email}`}
                  className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border hover:border-primary/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-muted">Email</p>
                    <p className="text-base font-semibold text-text-primary group-hover:text-primary transition-colors">
                      {projectConfig.contact.email}
                    </p>
                  </div>
                </a>
              </div>

              {/* Sales Office */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Sales Office</p>
                    <p className="text-sm text-text-secondary">{projectConfig.contact.salesOffice}</p>
                    <p className="text-xs text-text-muted mt-1">{projectConfig.location.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-3 border-t border-stone-200">
                  <Clock className="w-4 h-4 text-text-muted" />
                  <p className="text-xs text-text-muted">Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="col-span-7">
              <div className="bg-surface rounded-2xl border border-border p-8">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                      <Send className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Thank you for your interest. Our team will contact you within 24 hours.
                    </p>
                    <Link
                      to="/building"
                      className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                    >
                      Explore available units
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-text-primary mb-6">
                      Send us a message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-text-secondary block mb-2">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-text-secondary block mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-text-secondary block mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-text-secondary block mb-2">I'm interested in</label>
                        <select
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                        >
                          <option value="general">General Information</option>
                          <option value="studio">Studio Units</option>
                          <option value="1bed">1 Bedroom Units</option>
                          <option value="2bed">2 Bedroom Units</option>
                          <option value="3bed">3 Bedroom Units</option>
                          <option value="penthouse">Penthouse Units</option>
                          <option value="investment">Investment Opportunities</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm text-text-secondary block mb-2">Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                          placeholder="Tell us about your requirements..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 bg-primary hover:bg-primary-light disabled:bg-primary/50 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <p className="text-xs text-text-muted text-center">
                        By submitting this form, you agree to our privacy policy and terms of service.
                      </p>
                    </form>
                  </>
                )}
              </div>
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
