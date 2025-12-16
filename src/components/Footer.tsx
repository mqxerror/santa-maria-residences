import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Santa Maria Residences</h3>
            <p className="text-white/80 text-sm">
              Premium 41-floor residential tower in the heart of Panama City.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Sales</h3>
            <div className="space-y-2 text-sm">
              <a
                href="mailto:sales@santamaria.com"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                sales@santamaria.com
              </a>
              <a
                href="tel:+5076000000"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +507 600-0000
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Location</h3>
            <div className="flex items-start gap-2 text-sm text-white/80">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Panama City, Panama</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm text-white/60">
          &copy; {new Date().getFullYear()} Santa Maria Residences. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
