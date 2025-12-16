import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Apartment } from '@/types/database'
import BuildingImage from '@/components/BuildingImage'
import FloorPanel from '@/components/FloorPanel'

export default function BuildingExplorer() {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null)
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null)

  const { data: apartments = [], isLoading } = useQuery({
    queryKey: ['apartments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('apartments')
        .select('*')
        .order('floor', { ascending: true })
        .order('unit', { ascending: true })

      if (error) throw error
      return data as Apartment[]
    },
  })

  const floorApartments = selectedFloor
    ? apartments.filter((apt) => apt.floor === selectedFloor)
    : []

  // Calculate total stats
  const totalStats = {
    total: apartments.length,
    available: apartments.filter((a) => a.status === 'available').length,
    reserved: apartments.filter((a) => a.status === 'reserved').length,
    sold: apartments.filter((a) => a.status === 'sold').length,
  }

  // Reset apartment selection when floor changes
  const handleFloorClick = (floor: number) => {
    setSelectedFloor(floor)
    setSelectedApartment(null)
  }

  // In detail view mode (apartment selected)
  const isDetailView = !!selectedApartment

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
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
            <Link to="/building" className="text-sm text-primary font-medium">
              Explore
            </Link>
            <Link to="/about" className="text-sm text-text-secondary hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link to="/contact" className="text-sm text-text-secondary hover:text-primary transition-colors font-medium">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Building Navigator (hidden in detail view) */}
        {!isDetailView && (
          <div className="w-[38%] border-r border-border bg-surface flex flex-col">
            <div className="flex-1 p-4 overflow-hidden">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                    <span className="text-sm text-text-muted">Loading...</span>
                  </div>
                </div>
              ) : (
                <BuildingImage
                  apartments={apartments}
                  selectedFloor={selectedFloor}
                  onFloorClick={handleFloorClick}
                />
              )}
            </div>
          </div>
        )}

        {/* Right Panel - Units Selection / Detail View */}
        <div className={isDetailView ? 'flex-1 overflow-hidden' : 'w-[62%]'}>
          {isDetailView ? (
            <FloorPanel
              floor={selectedFloor}
              apartments={floorApartments}
              allApartments={apartments}
              selectedApartment={selectedApartment}
              onApartmentClick={setSelectedApartment}
              totalStats={totalStats}
            />
          ) : (
            <div className="h-full p-5 overflow-hidden">
              <FloorPanel
                floor={selectedFloor}
                apartments={floorApartments}
                allApartments={apartments}
                selectedApartment={selectedApartment}
                onApartmentClick={setSelectedApartment}
                totalStats={totalStats}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
