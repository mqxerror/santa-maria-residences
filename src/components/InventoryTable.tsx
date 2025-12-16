import { useState } from 'react'
import type { Apartment, ApartmentStatus } from '@/types/database'

interface InventoryTableProps {
  apartments: Apartment[]
  onStatusChange: (id: string, status: ApartmentStatus) => void
  onNotesChange: (id: string, notes: string) => void
}

export default function InventoryTable({
  apartments,
  onStatusChange,
  onNotesChange,
}: InventoryTableProps) {
  const [editingNotes, setEditingNotes] = useState<string | null>(null)
  const [notesValue, setNotesValue] = useState('')

  const handleNotesEdit = (apt: Apartment) => {
    setEditingNotes(apt.id)
    setNotesValue(apt.notes || '')
  }

  const handleNotesSave = (id: string) => {
    onNotesChange(id, notesValue)
    setEditingNotes(null)
  }

  return (
    <div className="bg-surface rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Unit</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Floor</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Size</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {apartments.map((apt) => (
              <tr key={apt.id} className="hover:bg-background/50">
                <td className="px-4 py-3 font-medium">
                  {apt.floor}-{apt.unit}
                </td>
                <td className="px-4 py-3">{apt.floor}</td>
                <td className="px-4 py-3">{apt.size_sqm} m²</td>
                <td className="px-4 py-3">
                  <select
                    value={apt.status}
                    onChange={(e) => onStatusChange(apt.id, e.target.value as ApartmentStatus)}
                    className="px-2 py-1 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  {editingNotes === apt.id ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={notesValue}
                        onChange={(e) => setNotesValue(e.target.value)}
                        className="flex-1 px-2 py-1 border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        autoFocus
                      />
                      <button
                        onClick={() => handleNotesSave(apt.id)}
                        className="px-2 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingNotes(null)}
                        className="px-2 py-1 border border-border rounded text-sm hover:bg-background"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNotesEdit(apt)}
                      className="text-sm text-left text-muted hover:text-primary truncate max-w-xs"
                    >
                      {apt.notes || 'Add notes...'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
