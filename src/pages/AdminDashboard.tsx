import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import type { Apartment, ApartmentStatus } from '@/types/database'
import AdminHeader from '@/components/AdminHeader'
import SummaryCards from '@/components/SummaryCards'
import InventoryTable from '@/components/InventoryTable'

export default function AdminDashboard() {
  const [statusFilter, setStatusFilter] = useState<ApartmentStatus | 'all'>('all')
  const { user } = useAuth()
  const queryClient = useQueryClient()

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

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ApartmentStatus }) => {
      const { error } = await supabase
        .from('apartments')
        .update({ status, updated_by: user?.email })
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apartments'] })
      toast.success('Status updated')
    },
    onError: () => {
      toast.error('Failed to update status')
    },
  })

  const updateNotesMutation = useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      const { error } = await supabase
        .from('apartments')
        .update({ notes, updated_by: user?.email })
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apartments'] })
      toast.success('Notes saved')
    },
    onError: () => {
      toast.error('Failed to save notes')
    },
  })

  const filteredApartments =
    statusFilter === 'all'
      ? apartments
      : apartments.filter((apt) => apt.status === statusFilter)

  const counts = {
    available: apartments.filter((a) => a.status === 'available').length,
    reserved: apartments.filter((a) => a.status === 'reserved').length,
    sold: apartments.filter((a) => a.status === 'sold').length,
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <SummaryCards
          counts={counts}
          activeFilter={statusFilter}
          onFilterClick={setStatusFilter}
        />

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <InventoryTable
            apartments={filteredApartments}
            onStatusChange={(id, status) => updateStatusMutation.mutate({ id, status })}
            onNotesChange={(id, notes) => updateNotesMutation.mutate({ id, notes })}
          />
        )}
      </main>
    </div>
  )
}
