import { useState, useEffect } from 'react'
import type { Apartment } from '@/types/database'
import { ChevronUp, ChevronDown, Check, Clock, Lock, Crown } from 'lucide-react'
import { MIN_FLOOR, MAX_FLOOR, TOTAL_RESIDENTIAL_FLOORS, BUILDING_CONFIG, PENTHOUSE_FLOOR } from '@/config/building'

interface BuildingImageProps {
  apartments: Apartment[]
  selectedFloor: number | null
  onFloorClick: (floor: number) => void
}

type FloorStatus = 'available' | 'limited' | 'sold' | 'empty'

export default function BuildingImage({ apartments, selectedFloor, onFloorClick }: BuildingImageProps) {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null)
  const [jumpToFloor, setJumpToFloor] = useState('')

  const getFloorStatus = (floor: number): FloorStatus => {
    const floorApts = apartments.filter((apt) => apt.floor === floor)
    if (floorApts.length === 0) return 'empty'
    const available = floorApts.filter((a) => a.status === 'available').length
    const total = floorApts.length
    if (available === total) return 'available'
    if (available === 0) return 'sold'
    return 'limited'
  }

  const getFloorStats = (floor: number) => {
    const floorApts = apartments.filter((apt) => apt.floor === floor)
    const available = floorApts.filter((a) => a.status === 'available').length
    const reserved = floorApts.filter((a) => a.status === 'reserved').length
    return { total: floorApts.length, available, reserved }
  }

  const handleJumpToFloor = (e: React.FormEvent) => {
    e.preventDefault()
    const floor = parseInt(jumpToFloor)
    if (floor >= MIN_FLOOR && floor <= MAX_FLOOR) {
      onFloorClick(floor)
      setJumpToFloor('')
    }
  }

  const handleFloorUp = () => {
    if (selectedFloor && selectedFloor < MAX_FLOOR) {
      onFloorClick(selectedFloor + 1)
    } else if (!selectedFloor) {
      onFloorClick(MIN_FLOOR)
    }
  }

  const handleFloorDown = () => {
    if (selectedFloor && selectedFloor > MIN_FLOOR) {
      onFloorClick(selectedFloor - 1)
    } else if (!selectedFloor) {
      onFloorClick(MAX_FLOOR)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        handleFloorUp()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        handleFloorDown()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedFloor])

  const floors = Array.from({ length: TOTAL_RESIDENTIAL_FLOORS }, (_, i) => {
    const floor = MAX_FLOOR - i
    const floorHeight = (BUILDING_CONFIG.bottom - BUILDING_CONFIG.top) / TOTAL_RESIDENTIAL_FLOORS
    return {
      floor,
      top: BUILDING_CONFIG.top + i * floorHeight,
      height: floorHeight,
      status: getFloorStatus(floor),
      stats: getFloorStats(floor),
      isPenthouse: floor >= PENTHOUSE_FLOOR,
    }
  })

  const activeFloor = hoveredFloor || selectedFloor

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl text-text-primary heading-display">Building Navigator</h2>
        <p className="text-sm text-gold-600 mt-1">Select a floor to explore apartments</p>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* Elevator Panel */}
        <div className="flex flex-col w-20 shrink-0">
          <form onSubmit={handleJumpToFloor} className="mb-3">
            <label className="text-xs text-text-muted block mb-1">Go to floor</label>
            <input
              type="number"
              min={MIN_FLOOR}
              max={MAX_FLOOR}
              value={jumpToFloor}
              onChange={(e) => setJumpToFloor(e.target.value)}
              placeholder="7-44"
              className="w-full px-2 py-1.5 text-center text-sm font-semibold border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </form>

          <div className="flex-1 flex flex-col rounded-xl overflow-hidden shadow-md border border-border">
            <button
              onClick={handleFloorUp}
              disabled={selectedFloor === MAX_FLOOR}
              className="p-3 bg-surface border-b border-border hover:bg-background active:bg-border-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronUp className="w-5 h-5 mx-auto text-text-secondary" />
            </button>

            <div className={`flex-1 flex items-center justify-center ${selectedFloor && selectedFloor >= PENTHOUSE_FLOOR ? 'bg-gradient-to-b from-amber-600 to-amber-700' : 'bg-gradient-to-b from-primary to-primary-dark'}`}>
              <div className="text-center">
                {selectedFloor && selectedFloor >= PENTHOUSE_FLOOR && (
                  <Crown className="w-4 h-4 text-amber-200 mx-auto mb-1" />
                )}
                <div className="text-4xl font-bold text-white tabular-nums tracking-tight">
                  {selectedFloor || '--'}
                </div>
                <div className="text-[10px] text-white/60 mt-1 uppercase tracking-widest">
                  {selectedFloor && selectedFloor >= PENTHOUSE_FLOOR ? 'PH' : 'Floor'}
                </div>
              </div>
            </div>

            <button
              onClick={handleFloorDown}
              disabled={selectedFloor === MIN_FLOOR}
              className="p-3 bg-surface border-t border-border hover:bg-background active:bg-border-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronDown className="w-5 h-5 mx-auto text-text-secondary" />
            </button>
          </div>

          <div className="mt-2 text-center text-xs text-text-muted">
            Floors {MIN_FLOOR}–{MAX_FLOOR}
          </div>
        </div>

        {/* Building Image */}
        <div className="flex-1 relative flex items-center justify-center min-h-0">
          <div className="relative h-full w-full max-h-[800px]">
            <img
              src="/assets/renders/elevation.jpg"
              alt="Santa Maria Residences Tower"
              className="h-full w-full object-contain rounded-2xl"
            />

            {/* Penthouse zone label */}
            <div className="absolute z-10 pointer-events-none" style={{ top: '5%', right: '5%' }}>
              <div className="flex items-center gap-1.5 bg-amber-500/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                <Crown className="w-3.5 h-3.5 text-amber-900" />
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">Penthouse Zone</span>
              </div>
            </div>

            {/* Floor Overlays */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              {floors.map((f) => {
                const isHovered = hoveredFloor === f.floor
                const isSelected = selectedFloor === f.floor

                return (
                  <button
                    key={f.floor}
                    onClick={() => onFloorClick(f.floor)}
                    onMouseEnter={() => setHoveredFloor(f.floor)}
                    onMouseLeave={() => setHoveredFloor(null)}
                    className="absolute transition-all duration-200"
                    style={{
                      top: `${f.top}%`,
                      left: `${BUILDING_CONFIG.left}%`,
                      width: `${BUILDING_CONFIG.right - BUILDING_CONFIG.left}%`,
                      height: `${f.height}%`,
                    }}
                    aria-label={`Floor ${f.floor}: ${f.stats.available} of ${f.stats.total} available`}
                  >
                    {isSelected && (
                      <div className={`absolute inset-0 ${f.isPenthouse ? 'bg-amber-400/30 border-y border-amber-400/50' : 'floor-highlight-band'} flex items-center justify-center`}>
                        <div className={`${f.isPenthouse ? 'bg-amber-400 text-amber-900' : 'floor-pill text-primary'} text-[10px] font-bold px-2.5 py-0.5 rounded-md`}>
                          {f.isPenthouse && <Crown className="w-2.5 h-2.5 inline mr-0.5 -mt-0.5" />}
                          {f.floor}
                        </div>
                      </div>
                    )}
                    {isHovered && !isSelected && (
                      <div className="absolute inset-0 bg-white/15 transition-all duration-150 border-y border-white/20" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Tooltip */}
            {activeFloor && (
              <div
                className="absolute z-20 pointer-events-none floor-tooltip"
                style={{
                  left: `${BUILDING_CONFIG.right + 2}%`,
                  top: `${floors.find((f) => f.floor === activeFloor)?.top || 0}%`,
                }}
              >
                <div className={`${activeFloor >= PENTHOUSE_FLOOR ? 'bg-gradient-to-br from-amber-600 to-amber-700 border-amber-400/30' : 'bg-gradient-to-br from-primary to-primary-dark border-gold-500/30'} text-white rounded-xl shadow-xl px-4 py-3 min-w-[150px] border`}>
                  <div className="text-lg font-semibold font-serif flex items-center gap-2">
                    {activeFloor >= PENTHOUSE_FLOOR && <Crown className="w-4 h-4 text-amber-200" />}
                    Floor {activeFloor}
                  </div>
                  <div className="text-sm text-white/80 mt-1.5 space-y-1">
                    {(() => {
                      const stats = getFloorStats(activeFloor)
                      return stats.total > 0 ? (
                        <>
                          <div className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-green-400" />
                            <span>{stats.available} available</span>
                          </div>
                          {stats.reserved > 0 && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-gold-400" />
                              <span>{stats.reserved} reserved</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-white/50">Exclusive level</span>
                      )
                    })()}
                  </div>
                  <div className="text-xs text-gold-300/70 mt-2 pt-2 border-t border-gold-500/20">
                    Click to view units
                  </div>
                  <div className={`absolute left-0 top-5 w-2.5 h-2.5 ${activeFloor >= PENTHOUSE_FLOOR ? 'bg-amber-600' : 'bg-primary'} transform -translate-x-1 rotate-45 border-l border-b border-gold-500/30`} />
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-3 left-3 flex items-center gap-4 px-3 py-2 bg-black/70 backdrop-blur-sm rounded-lg border border-gold-500/20">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <Check className="w-3 h-3 text-green-400" />
                <span className="text-[11px] text-white font-medium">Available</span>
              </div>
              <div className="w-px h-4 bg-gold-500/30" />
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-gold-400" />
                <Clock className="w-3 h-3 text-gold-400" />
                <span className="text-[11px] text-white font-medium">Reserved</span>
              </div>
              <div className="w-px h-4 bg-gold-500/30" />
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                <Lock className="w-3 h-3 text-white/60" />
                <span className="text-[11px] text-white font-medium">Sold</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
