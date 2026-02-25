import { cn } from '@/lib/utils'
import type { ExecutiveSuite } from '@/types/database'
import { ArrowRight } from 'lucide-react'

interface SuiteCardProps {
  suite: ExecutiveSuite
  onClick: () => void
}

import { getUnitType, getUnitPrice, formatPriceShort, getViewDirection as getView } from '@/lib/apartment-utils'

const getSuiteType = (sizeSqm: number, floor?: number): string => getUnitType(sizeSqm, floor)

const getViewDirection = (unitNumber: number): string => {
  const dir = getView(unitNumber)
  return dir.full
}

// Status configuration — border-based system
const statusConfig = {
  available: {
    label: 'Available',
    dotClass: 'bg-emerald-500',
    borderClass: 'border-l-2 border-l-emerald-500',
    ctaClass: 'bg-slate-900 text-white hover:bg-slate-800',
    cardClass: '',
    contentClass: '',
    priceClass: 'text-slate-900',
  },
  reserved: {
    label: 'Reserved',
    dotClass: 'bg-amber-400',
    borderClass: 'border-l-2 border-l-amber-400',
    ctaClass: 'bg-transparent border border-slate-200 text-slate-600 hover:bg-slate-50',
    cardClass: 'opacity-90',
    contentClass: '',
    priceClass: 'text-slate-900',
  },
  sold: {
    label: 'Sold',
    dotClass: 'bg-slate-300',
    borderClass: 'border-l-2 border-l-slate-300',
    ctaClass: 'bg-transparent border border-slate-200 text-slate-400 hover:bg-slate-50',
    cardClass: 'opacity-70',
    contentClass: '',
    priceClass: 'text-slate-500',
  },
}

export default function SuiteCard({ suite, onClick }: SuiteCardProps) {
  const config = statusConfig[suite.status]
  const suiteType = getSuiteType(suite.size_sqm, suite.floor)
  const price = suite.price_display || formatPriceShort(getUnitPrice(suite.floor, suite.unit))
  const viewDirection = getViewDirection(suite.unit_number)
  const isSold = suite.status === 'sold'

  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-white rounded-xl p-4 text-left w-full group',
        'border border-slate-200 hover:border-slate-300 hover:shadow-md',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2',
        config.borderClass,
        config.cardClass
      )}
    >
      {/* Unit Number + Status Dot */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg text-slate-900 font-semibold">
          {suite.floor}-{suite.unit_number}
        </h3>
        <div className="flex items-center gap-1.5">
          <div className={cn('w-2 h-2 rounded-full', config.dotClass)} />
          <span className="text-xs text-slate-500">{config.label}</span>
        </div>
      </div>

      {/* Price — dominant */}
      <div className={cn('text-2xl font-bold mb-2', config.priceClass)}>
        {price}
      </div>

      {/* Combined attributes */}
      <p className="text-sm text-slate-500 mb-4">
        {suite.size_sqm} m² · {viewDirection} · {suiteType}
      </p>

      {/* CTA */}
      <div className={cn(
        'flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors',
        config.ctaClass
      )}>
        <span>View Details</span>
        {isSold && <span className="text-xs opacity-60">· Reference</span>}
        <ArrowRight className="w-4 h-4" />
      </div>
    </button>
  )
}
