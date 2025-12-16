import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { Apartment } from '@/types/database'
import { ChevronUp, ChevronDown, Check, Clock, Lock } from 'lucide-react'

interface BuildingImageProps {
  apartments: Apartment[]
  selectedFloor: number | null
  onFloorClick: (floor: number) => void
}

const MIN_FLOOR = 7
const MAX_FLOOR = 41
const TOTAL_FLOORS = MAX_FLOOR - MIN_FLOOR + 1

const BUILDING_CONFIG = {
  top: 5,
  bottom: 72,
  left: 30,
  right: 70,
}

type FloorStatus = 'available' | 'limited' | 'sold' | 'empty'

export default function BuildingImage({ apartments, selectedFloor, onFloorClick }: BuildingImageProps) {
  const [hoveredFloor, setHoveredFloor] = useState<number | null>(null)
  const [jumpToFloor, setJumpToFloor] = useState('')
  const buildingRef = useRef<HTMLDivElement>(null)

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

  const floors = Array.from({ length: TOTAL_FLOORS }, (_, i) => {
    const floor = MAX_FLOOR - i
    const floorHeight = (BUILDING_CONFIG.bottom - BUILDING_CONFIG.top) / TOTAL_FLOORS
    return {
      floor,
      top: BUILDING_CONFIG.top + i * floorHeight,
      height: floorHeight,
      status: getFloorStatus(floor),
      stats: getFloorStats(floor),
    }
  })

  const activeFloor = hoveredFloor || selectedFloor

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl text-text-primary font-semibold">Building Navigator</h2>
        <p className="text-sm text-text-secondary mt-1">Select a floor to explore units</p>
      </div>

      <div className="flex-1 flex gap-3 min-h-0">
        {/* Elevator Panel Control */}
        <div className="flex flex-col w-20 shrink-0">
          {/* Jump to floor input */}
          <form onSubmit={handleJumpToFloor} className="mb-3">
            <label className="text-xs text-text-muted block mb-1">Go to floor</label>
            <input
              type="number"
              min={MIN_FLOOR}
              max={MAX_FLOOR}
              value={jumpToFloor}
              onChange={(e) => setJumpToFloor(e.target.value)}
              placeholder="19"
              className="w-full px-2 py-1.5 text-center text-sm font-semibold border border-border rounded-md bg-surface focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </form>

          {/* Elevator display */}
          <div className="card flex-1 flex flex-col overflow-hidden">
            {/* Up button */}
            <button
              onClick={handleFloorUp}
              disabled={selectedFloor === MAX_FLOOR}
              className="p-2 border-b border-border hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronUp className="w-5 h-5 mx-auto text-text-secondary" />
            </button>

            {/* Floor display */}
            <div className="flex-1 flex items-center justify-center bg-primary">
              <div className="text-center">
                <div className="text-3xl font-bold text-white tabular-nums">
                  {selectedFloor || '--'}
                </div>
                <div className="text-xs text-white/70 mt-0.5">FLOOR</div>
              </div>
            </div>

            {/* Down button */}
            <button
              onClick={handleFloorDown}
              disabled={selectedFloor === MIN_FLOOR}
              className="p-2 border-t border-border hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronDown className="w-5 h-5 mx-auto text-text-secondary" />
            </button>
          </div>

          {/* Floor range indicator */}
          <div className="mt-2 text-center text-xs text-text-muted">
            {MIN_FLOOR} - {MAX_FLOOR}
          </div>
        </div>

        {/* Building Image with Premium Overlays */}
        <div ref={buildingRef} className="flex-1 relative flex items-center justify-center min-h-0">
          <div className="relative h-full max-h-[580px] aspect-[3/5]">
            {/* Building Image */}
            <img
              src="/assets/santa-maria-tower.jpg"
              alt="Santa Maria Residences Tower"
              className="h-full w-full object-cover rounded-xl shadow-lg"
            />

            {/* Floor status ticks on the right edge */}
            <div className="absolute right-0 top-0 bottom-0 w-3 flex flex-col" style={{ top: `${BUILDING_CONFIG.top}%`, height: `${BUILDING_CONFIG.bottom - BUILDING_CONFIG.top}%` }}>
              {floors.map((f) => {
                const statusIcon = {
                  available: <Check className="w-2 h-2 text-status-available" />,
                  limited: <Clock className="w-2 h-2 text-status-limited" />,
                  sold: <Lock className="w-2 h-2 text-status-sold" />,
                  empty: null,
                }[f.status]

                return (
                  <div
                    key={f.floor}
                    className="flex-1 flex items-center justify-center"
                    title={`Floor ${f.floor}: ${f.stats.available} available`}
                  >
                    {statusIcon}
                  </div>
                )
              })}
            </div>

            {/* Floor Overlays */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              {floors.map((f) => {
                const isHovered = hoveredFloor === f.floor
                const isSelected = selectedFloor === f.floor

                return (
                  <button
                    key={f.floor}
                    onClick={() => onFloorClick(f.floor)}
                    onMouseEnter={() => setHoveredFloor(f.floor)}
                    onMouseLeave={() => setHoveredFloor(null)}
                    className={cn(
                      'absolute transition-all duration-200',
                      isSelected && 'z-10'
                    )}
                    style={{
                      top: `${f.top}%`,
                      left: `${BUILDING_CONFIG.left}%`,
                      width: `${BUILDING_CONFIG.right - BUILDING_CONFIG.left}%`,
                      height: `${f.height}%`,
                    }}
                    aria-label={`Floor ${f.floor}: ${f.stats.available} of ${f.stats.total} available`}
                  >
                    {/* Selected floor glow band */}
                    {isSelected && (
                      <div
                        className="absolute inset-0 rounded-sm animate-pulse-subtle"
                        style={{
                          background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.25), rgba(16, 185, 129, 0.35), rgba(16, 185, 129, 0.25))',
                          boxShadow: '0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 0 1.5px rgba(16, 185, 129, 0.6)',
                        }}
                      >
                        {/* In-band floor label */}
                        <div className="absolute left-1 top-1/2 -translate-y-1/2 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                          {f.floor}
                        </div>
                      </div>
                    )}

                    {/* Hover state */}
                    {isHovered && !isSelected && (
                      <div
                        className="absolute inset-0 rounded-sm transition-all duration-150"
                        style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.4)',
                        }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Premium Tooltip */}
            {activeFloor && (
              <div
                className="absolute z-20 pointer-events-none animate-fade-slide"
                style={{
                  left: `${BUILDING_CONFIG.right + 3}%`,
                  top: `${floors.find((f) => f.floor === activeFloor)?.top || 0}%`,
                }}
              >
                <div className="bg-primary text-white rounded-lg shadow-xl px-4 py-3 min-w-[140px]">
                  <div className="text-lg font-semibold">Floor {activeFloor}</div>
                  <div className="text-sm text-white/80 mt-1 space-y-0.5">
                    {(() => {
                      const stats = getFloorStats(activeFloor)
                      return (
                        <>
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-accent-light" />
                            <span>{stats.available} available</span>
                          </div>
                          {stats.reserved > 0 && (
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3 text-status-limited" />
                              <span>{stats.reserved} reserved</span>
                            </div>
                          )}
                        </>
                      )
                    })()}
                  </div>
                  <div className="text-xs text-white/60 mt-2 pt-2 border-t border-white/20">
                    Click to view units
                  </div>
                  {/* Arrow */}
                  <div className="absolute left-0 top-4 w-2 h-2 bg-primary transform -translate-x-1 rotate-45" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floor list with grouped labels */}
        <div className="w-8 shrink-0 flex flex-col justify-between py-2" style={{ height: '580px' }}>
          {[41, 35, 28, 21, 14, 7].map((floor) => (
            <button
              key={floor}
              onClick={() => onFloorClick(floor)}
              className={cn(
                'text-xs font-medium transition-colors',
                selectedFloor === floor ? 'text-accent font-bold' : 'text-text-muted hover:text-text-secondary'
              )}
            >
              {floor}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-status-available-bg flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-status-available" />
          </div>
          <span className="text-sm text-text-secondary">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-status-limited-bg flex items-center justify-center">
            <Clock className="w-2.5 h-2.5 text-status-limited" />
          </div>
          <span className="text-sm text-text-secondary">Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-status-sold-bg flex items-center justify-center">
            <Lock className="w-2.5 h-2.5 text-status-sold" />
          </div>
          <span className="text-sm text-text-secondary">Sold</span>
        </div>
      </div>
    </div>
  )
}
