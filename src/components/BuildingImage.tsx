import { useState, useEffect } from 'react'
import type { Apartment } from '@/types/database'
import { ChevronUp, ChevronDown, Crown, Crosshair } from 'lucide-react'
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
    const sold = floorApts.filter((a) => a.status === 'sold').length
    return { total: floorApts.length, available, reserved, sold }
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
  const activeStats = activeFloor ? getFloorStats(activeFloor) : null
  const isPH = activeFloor ? activeFloor >= PENTHOUSE_FLOOR : false

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-2 xl:mb-4">
        <h2 className="text-xl xl:text-2xl text-text-primary heading-display">Building Navigator</h2>
        <p className="text-xs xl:text-sm text-gold-600 mt-0.5 xl:mt-1">Select a floor to explore apartments</p>
      </div>

      <div className="flex-1 flex gap-2 xl:gap-4 min-h-0">
        {/* Elevator Panel */}
        <div className="flex flex-col w-14 xl:w-20 shrink-0">
          <form onSubmit={handleJumpToFloor} className="mb-2 xl:mb-3">
            <label className="text-[10px] xl:text-xs text-text-muted block mb-1">Floor</label>
            <input
              type="number"
              min={MIN_FLOOR}
              max={MAX_FLOOR}
              value={jumpToFloor}
              onChange={(e) => setJumpToFloor(e.target.value)}
              placeholder="7-44"
              className="w-full px-1.5 py-1 xl:px-2 xl:py-1.5 text-center text-xs xl:text-sm font-semibold border border-border rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </form>

          <div className="flex-1 flex flex-col max-h-[50vh] xl:max-h-none rounded-xl overflow-hidden shadow-md border border-border">
            <button
              onClick={handleFloorUp}
              disabled={selectedFloor === MAX_FLOOR}
              className="p-2 xl:p-3 bg-surface border-b border-border hover:bg-background active:bg-border-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronUp className="w-4 h-4 xl:w-5 xl:h-5 mx-auto text-text-secondary" />
            </button>

            <div className={`flex-1 flex items-center justify-center ${selectedFloor && selectedFloor >= PENTHOUSE_FLOOR ? 'bg-gradient-to-b from-amber-600 to-amber-700' : 'bg-gradient-to-b from-primary to-primary-dark'}`}>
              <div className="text-center">
                {selectedFloor && selectedFloor >= PENTHOUSE_FLOOR && (
                  <Crown className="w-3 h-3 xl:w-4 xl:h-4 text-amber-200 mx-auto mb-0.5 xl:mb-1" />
                )}
                <div className="text-2xl xl:text-4xl font-bold text-white tabular-nums tracking-tight">
                  {selectedFloor || '--'}
                </div>
                <div className="text-[9px] xl:text-[10px] text-white/60 mt-0.5 xl:mt-1 uppercase tracking-widest">
                  {selectedFloor && selectedFloor >= PENTHOUSE_FLOOR ? 'PH' : 'Floor'}
                </div>
              </div>
            </div>

            <button
              onClick={handleFloorDown}
              disabled={selectedFloor === MIN_FLOOR}
              className="p-2 xl:p-3 bg-surface border-t border-border hover:bg-background active:bg-border-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronDown className="w-4 h-4 xl:w-5 xl:h-5 mx-auto text-text-secondary" />
            </button>
          </div>

          <div className="mt-1 xl:mt-2 text-center text-[10px] xl:text-xs text-text-muted">
            {MIN_FLOOR}–{MAX_FLOOR}
          </div>
        </div>

        {/* Building Column */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Building Image */}
          <div className="flex-1 relative flex items-center justify-center min-h-0">
            <div className="relative h-full w-full max-h-[55vh] xl:max-h-[750px]">
              <img
                src="/assets/renders/elevation.jpg"
                alt="Santa Maria Residences Tower"
                className="h-full w-full object-contain rounded-2xl"
              />

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
            </div>
          </div>

          {/* Floor Info Panel — fixed below building, never clips */}
          <div className="shrink-0 mt-2 xl:mt-3">
            <div
              className={`rounded-lg xl:rounded-xl overflow-hidden transition-all duration-300 ${
                activeFloor
                  ? isPH
                    ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 shadow-lg shadow-amber-500/20'
                    : 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 shadow-lg shadow-slate-500/20'
                  : 'bg-slate-100 border border-slate-200'
              }`}
            >
              {activeFloor && activeStats ? (
                <div className="px-3 py-2 xl:px-4 xl:py-3 flex items-center gap-3 xl:gap-4">
                  {/* Floor number badge */}
                  <div className={`shrink-0 w-10 h-10 xl:w-14 xl:h-14 rounded-lg flex flex-col items-center justify-center ${
                    isPH ? 'bg-amber-900/30' : 'bg-white/10'
                  }`}>
                    {isPH && <Crown className="w-3 h-3 text-amber-200 mb-0.5" />}
                    <div className="text-lg xl:text-2xl font-bold text-white leading-none tabular-nums">{activeFloor}</div>
                    <div className="text-[8px] xl:text-[9px] text-white/60 uppercase tracking-wider mt-0.5">
                      {isPH ? 'PH' : 'Floor'}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex-1 flex items-center gap-2 xl:gap-3">
                    {activeStats.total > 0 ? (
                      <>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-emerald-400" />
                          <span className="text-xs xl:text-sm text-white font-medium">{activeStats.available}</span>
                          <span className="text-[10px] xl:text-xs text-white/60">avail</span>
                        </div>
                        {activeStats.reserved > 0 && (
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-amber-300" />
                            <span className="text-xs xl:text-sm text-white font-medium">{activeStats.reserved}</span>
                            <span className="text-[10px] xl:text-xs text-white/60">rsrvd</span>
                          </div>
                        )}
                        {activeStats.sold > 0 && (
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-white/40" />
                            <span className="text-xs xl:text-sm text-white font-medium">{activeStats.sold}</span>
                            <span className="text-[10px] xl:text-xs text-white/60">sold</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="text-xs xl:text-sm text-white/60 italic">Exclusive level</span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className={`shrink-0 text-[10px] xl:text-xs font-semibold px-2 py-1 xl:px-3 xl:py-1.5 rounded-lg ${
                    isPH
                      ? 'bg-amber-900/30 text-amber-100'
                      : 'bg-white/15 text-white'
                  }`}>
                    Click to explore
                  </div>
                </div>
              ) : (
                /* Idle state: legend */
                <div className="px-3 py-2 xl:px-4 xl:py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Crosshair className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                    <span className="text-xs xl:text-sm">Hover to explore</span>
                  </div>
                  <div className="flex items-center gap-2 xl:gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-emerald-500" />
                      <span className="text-[10px] xl:text-[11px] text-slate-500">Available</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-amber-400" />
                      <span className="text-[10px] xl:text-[11px] text-slate-500">Reserved</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-slate-300" />
                      <span className="text-[10px] xl:text-[11px] text-slate-500">Sold</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
