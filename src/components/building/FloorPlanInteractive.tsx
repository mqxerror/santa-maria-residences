import { motion } from 'framer-motion'
import type { ExecutiveSuite } from '@/types/database'
import { cn } from '@/lib/utils'
import { PENTHOUSE_FLOOR } from '@/config/building'

interface FloorPlanInteractiveProps {
  floor: number
  suites: ExecutiveSuite[]
  onSuiteClick: (suite: ExecutiveSuite) => void
  selectedUnitId?: string
}

// Unit positions for typical floors (6 units around central core)
// Layout matches official floor plan: 3 units top, 3 units bottom
const TYPICAL_UNIT_POSITIONS: Record<number, { x: number; y: number; width: number; height: number; label: string }> = {
  1: { x: 3,  y: 3,  width: 28, height: 38, label: 'A' },
  2: { x: 35, y: 3,  width: 30, height: 38, label: 'B' },
  3: { x: 69, y: 3,  width: 28, height: 38, label: 'C' },
  4: { x: 3,  y: 59, width: 28, height: 38, label: 'D' },
  5: { x: 35, y: 59, width: 30, height: 38, label: 'E' },
  6: { x: 69, y: 59, width: 28, height: 38, label: 'F' },
}

// Unit positions for upper/penthouse floors (2 large units)
const UPPER_UNIT_POSITIONS: Record<number, { x: number; y: number; width: number; height: number; label: string }> = {
  1: { x: 3,  y: 3,  width: 94, height: 38, label: 'A' },
  2: { x: 3,  y: 59, width: 94, height: 38, label: 'B' },
}

export default function FloorPlanInteractive({
  floor,
  suites,
  onSuiteClick,
  selectedUnitId,
}: FloorPlanInteractiveProps) {
  const isUpperFloor = floor >= PENTHOUSE_FLOOR
  const unitPositions = isUpperFloor ? UPPER_UNIT_POSITIONS : TYPICAL_UNIT_POSITIONS

  const getSuiteByUnit = (unitNumber: number): ExecutiveSuite | undefined => {
    return suites.find((s) => s.unit_number === unitNumber)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return {
          fill: 'fill-emerald-500/30',
          stroke: 'stroke-emerald-400',
          text: 'text-emerald-400',
          hover: 'hover:fill-emerald-500/50',
        }
      case 'reserved':
        return {
          fill: 'fill-amber-500/30',
          stroke: 'stroke-amber-400',
          text: 'text-amber-400',
          hover: 'hover:fill-amber-500/50',
        }
      case 'sold':
        return {
          fill: 'fill-slate-500/30',
          stroke: 'stroke-slate-500',
          text: 'text-slate-500',
          hover: '',
        }
      default:
        return {
          fill: 'fill-slate-700/50',
          stroke: 'stroke-slate-600',
          text: 'text-slate-500',
          hover: 'hover:fill-slate-600/50',
        }
    }
  }

  return (
    <div className="relative w-full aspect-square bg-slate-800/50 rounded-xl p-4">
      {/* Floor Plan Title */}
      <div className="absolute top-2 left-2 z-10">
        <span className="text-xs font-medium text-slate-400 bg-slate-900/80 px-2 py-1 rounded">
          Floor {floor} • {isUpperFloor ? '2 Units' : '6 Units'}
        </span>
      </div>

      {/* SVG Floor Plan */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Central Core (Elevators/Services) */}
        <rect
          x="20"
          y="43"
          width="60"
          height="14"
          className="fill-slate-700/50 stroke-slate-600"
          strokeWidth="0.5"
          rx="1"
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-slate-500 text-[3.5px] font-medium"
        >
          ELEVATORS & SERVICES
        </text>

        {/* Unit Rectangles */}
        {Object.entries(unitPositions).map(([unitNum, pos]) => {
          const suite = getSuiteByUnit(Number(unitNum))
          const colors = getStatusColor(suite?.status || 'empty')
          const isSelected = suite?.id === selectedUnitId
          const isClickable = suite && suite.status !== 'sold'

          return (
            <motion.g
              key={unitNum}
              onClick={() => suite && isClickable && onSuiteClick(suite)}
              className={cn(
                'cursor-pointer transition-all',
                !isClickable && 'cursor-not-allowed'
              )}
              whileHover={isClickable ? { scale: 1.02 } : {}}
              whileTap={isClickable ? { scale: 0.98 } : {}}
            >
              {/* Unit Rectangle */}
              <rect
                x={pos.x}
                y={pos.y}
                width={pos.width}
                height={pos.height}
                className={cn(
                  colors.fill,
                  colors.stroke,
                  colors.hover,
                  'transition-all duration-200',
                  isSelected && 'stroke-amber-400 stroke-2'
                )}
                strokeWidth={isSelected ? 1.5 : 0.5}
                rx="1.5"
              />

              {/* Unit Letter */}
              <text
                x={pos.x + pos.width / 2}
                y={pos.y + pos.height / 2 - 4}
                textAnchor="middle"
                dominantBaseline="middle"
                className={cn('font-bold text-[6px]', colors.text)}
              >
                {pos.label}
              </text>

              {/* Unit Number */}
              <text
                x={pos.x + pos.width / 2}
                y={pos.y + pos.height / 2 + 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-300 text-[4px] font-medium"
              >
                Unit {unitNum}
              </text>

              {/* Size */}
              {suite && (
                <text
                  x={pos.x + pos.width / 2}
                  y={pos.y + pos.height / 2 + 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-400 text-[3.5px]"
                >
                  {suite.size_sqm}m²
                </text>
              )}
            </motion.g>
          )
        })}

        {/* Compass */}
        <g transform="translate(92, 92)">
          <circle r="5" className="fill-slate-800 stroke-slate-600" strokeWidth="0.3" />
          <text
            y="-1"
            textAnchor="middle"
            className="fill-amber-400 text-[3px] font-bold"
          >
            N
          </text>
          <line x1="0" y1="1" x2="0" y2="3" className="stroke-slate-500" strokeWidth="0.3" />
        </g>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-2 right-2 flex gap-3 bg-slate-900/80 px-2 py-1 rounded text-[10px]">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-emerald-500/50 border border-emerald-400" />
          <span className="text-slate-400">Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-amber-500/50 border border-amber-400" />
          <span className="text-slate-400">Reserved</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-slate-500/50 border border-slate-500" />
          <span className="text-slate-400">Sold</span>
        </div>
      </div>
    </div>
  )
}
