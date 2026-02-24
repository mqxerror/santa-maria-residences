import { useState } from 'react'
import type { ExecutiveSuite } from '@/types/database'
import { Check, Clock, Lock } from 'lucide-react'
import { PENTHOUSE_FLOOR } from '@/config/building'

interface FloorPlanSVGProps {
  floor: number
  suites: ExecutiveSuite[]
  onSuiteClick: (suite: ExecutiveSuite) => void
  selectedSuiteId?: string
}

// SVG layout for typical floors (6 units): 3 top, 3 bottom with central core
// Viewbox: 600 x 500
const TYPICAL_SUITE_PATHS: Record<number, { path: string; labelX: number; labelY: number }> = {
  1: { // Unit A - top left (85m²)
    path: 'M 20,20 L 200,20 L 200,200 L 20,200 Z',
    labelX: 110, labelY: 110,
  },
  2: { // Unit B - top center (85m²)
    path: 'M 210,20 L 390,20 L 390,200 L 210,200 Z',
    labelX: 300, labelY: 110,
  },
  3: { // Unit C - top right (85m²)
    path: 'M 400,20 L 580,20 L 580,200 L 400,200 Z',
    labelX: 490, labelY: 110,
  },
  4: { // Unit D - bottom left (81m²)
    path: 'M 20,300 L 200,300 L 200,480 L 20,480 Z',
    labelX: 110, labelY: 390,
  },
  5: { // Unit E - bottom center (84m²)
    path: 'M 210,300 L 390,300 L 390,480 L 210,480 Z',
    labelX: 300, labelY: 390,
  },
  6: { // Unit F - bottom right (84m²)
    path: 'M 400,300 L 580,300 L 580,480 L 400,480 Z',
    labelX: 490, labelY: 390,
  },
}

// SVG layout for upper/penthouse floors (2 units): 1 top, 1 bottom
const UPPER_SUITE_PATHS: Record<number, { path: string; labelX: number; labelY: number }> = {
  1: { // Unit A - top (184m²)
    path: 'M 20,20 L 580,20 L 580,200 L 20,200 Z',
    labelX: 300, labelY: 110,
  },
  2: { // Unit B - bottom (174m²)
    path: 'M 20,300 L 580,300 L 580,480 L 20,480 Z',
    labelX: 300, labelY: 390,
  },
}

const UNIT_LABELS: Record<number, string> = {
  1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E', 6: 'F',
}

// Status color configuration
const statusConfig = {
  available: {
    fill: 'rgba(76, 175, 119, 0.18)',
    stroke: '#2D8A5E',
    hoverFill: 'rgba(76, 175, 119, 0.35)',
    selectedFill: 'rgba(76, 175, 119, 0.45)',
    icon: Check,
  },
  reserved: {
    fill: 'rgba(212, 160, 0, 0.15)',
    stroke: '#D4A000',
    hoverFill: 'rgba(212, 160, 0, 0.30)',
    selectedFill: 'rgba(212, 160, 0, 0.40)',
    icon: Clock,
  },
  sold: {
    fill: 'rgba(180, 83, 83, 0.30)',
    stroke: '#9B4D4D',
    hoverFill: 'rgba(180, 83, 83, 0.42)',
    selectedFill: 'rgba(180, 83, 83, 0.52)',
    icon: Lock,
  },
}

export default function FloorPlanSVG({ floor, suites, onSuiteClick, selectedSuiteId }: FloorPlanSVGProps) {
  const [hoveredSuite, setHoveredSuite] = useState<number | null>(null)
  const [pressedSuite, setPressedSuite] = useState<number | null>(null)

  const isUpperFloor = floor >= PENTHOUSE_FLOOR
  const suitePaths = isUpperFloor ? UPPER_SUITE_PATHS : TYPICAL_SUITE_PATHS

  const getSuiteByUnit = (unitNumber: number) => {
    return suites.find((s) => s.unit_number === unitNumber)
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative w-full" style={{ aspectRatio: '600 / 500' }}>
        {/* SVG Floor Plan */}
        <svg
          viewBox="0 0 600 500"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
        >
          <defs>
            <filter id="selectedGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#D4A000" floodOpacity="0.4"/>
            </filter>
            <filter id="hoverGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#1E293B" floodOpacity="0.15"/>
            </filter>
          </defs>

          {/* Background */}
          <rect x="0" y="0" width="600" height="500" fill="#1e293b" rx="8" />

          {/* Central Core */}
          <rect x="180" y="215" width="240" height="70" fill="#334155" stroke="#475569" strokeWidth="1" rx="4" />
          <text x="300" y="250" textAnchor="middle" dominantBaseline="middle" fill="#64748b" fontSize="12" fontWeight="500">
            ELEVATORS & SERVICES
          </text>

          {/* Suite polygons */}
          {Object.entries(suitePaths).map(([unitStr, { path, labelX, labelY }]) => {
            const unitNumber = parseInt(unitStr)
            const suite = getSuiteByUnit(unitNumber)
            const isHovered = hoveredSuite === unitNumber
            const isPressed = pressedSuite === unitNumber
            const isSelected = suite?.id === selectedSuiteId
            const status = suite?.status || 'available'
            const config = statusConfig[status]
            const isActive = isPressed || isHovered

            return (
              <g key={unitNumber}>
                <path
                  d={path}
                  fill={isSelected ? config.selectedFill : isActive ? config.hoverFill : config.fill}
                  stroke={config.stroke}
                  strokeWidth={isSelected ? 3 : isActive ? 2.5 : 1.5}
                  strokeLinejoin="round"
                  rx="4"
                  className="cursor-pointer transition-all duration-150 ease-out"
                  style={{ vectorEffect: 'non-scaling-stroke' }}
                  filter={isSelected ? 'url(#selectedGlow)' : isActive ? 'url(#hoverGlow)' : undefined}
                  onMouseEnter={() => setHoveredSuite(unitNumber)}
                  onMouseLeave={() => { setHoveredSuite(null); setPressedSuite(null) }}
                  onMouseDown={() => setPressedSuite(unitNumber)}
                  onMouseUp={() => setPressedSuite(null)}
                  onClick={() => { if (suite) onSuiteClick(suite) }}
                  onTouchStart={() => setPressedSuite(unitNumber)}
                  onTouchEnd={() => { setPressedSuite(null); if (suite) onSuiteClick(suite) }}
                  onTouchCancel={() => setPressedSuite(null)}
                />
                {/* Unit label */}
                <text
                  x={labelX}
                  y={labelY - 14}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isActive || isSelected ? '#f8fafc' : '#94a3b8'}
                  fontSize="18"
                  fontWeight="700"
                  className="pointer-events-none"
                >
                  Unit {UNIT_LABELS[unitNumber] || unitNumber}
                </text>
                {/* Size */}
                {suite && (
                  <text
                    x={labelX}
                    y={labelY + 6}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#64748b"
                    fontSize="13"
                    className="pointer-events-none"
                  >
                    {suite.size_sqm} m²
                  </text>
                )}
                {/* Status */}
                <text
                  x={labelX}
                  y={labelY + 24}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={config.stroke}
                  fontSize="11"
                  fontWeight="500"
                  className="pointer-events-none capitalize"
                >
                  {suite?.status || 'available'}
                </text>
              </g>
            )
          })}

          {/* Floor label */}
          <text x="300" y="495" textAnchor="middle" fill="#475569" fontSize="11">
            Floor {floor} • {isUpperFloor ? '2 Penthouse Units' : '6 Apartments'}
          </text>
        </svg>
      </div>
    </div>
  )
}
