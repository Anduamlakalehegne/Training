'use client'

import { useState } from 'react'
import { useVehicles } from '@/hooks/useVehicles'
import { VehicleTable } from '@/components/VehicleTable'
import { VehicleForm } from '@/components/VehicleForm'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function Home() {
  const { vehicles, isLoading, error, mutate } = useVehicles()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<any>(null)

  const handleCreate = async (data: { name: string; status: string }) => {
    try {
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to create vehicle')
      setIsDialogOpen(false)
      mutate()
    } catch (error) {
      console.error('Error creating vehicle:', error)
    }
  }

  const handleUpdate = async (data: { name: string; status: string }) => {
    try {
      const response = await fetch('/api/vehicles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, id: editingVehicle.id }),
      })
      if (!response.ok) throw new Error('Failed to update vehicle')
      setIsDialogOpen(false)
      setEditingVehicle(null)
      mutate()
    } catch (error) {
      console.error('Error updating vehicle:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return
    try {
      const response = await fetch('/api/vehicles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!response.ok) throw new Error('Failed to delete vehicle')
      mutate()
    } catch (error) {
      console.error('Error deleting vehicle:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Vehicle Management Dashboard</h1>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Add New Vehicle</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle>
          </DialogHeader>
          <VehicleForm
            initialData={editingVehicle}
            onSubmit={editingVehicle ? handleUpdate : handleCreate}
            onCancel={() => {
              setIsDialogOpen(false)
              setEditingVehicle(null)
            }}
          />
        </DialogContent>
      </Dialog>
      <VehicleTable
        vehicles={vehicles}
        onEdit={(vehicle) => {
          setEditingVehicle(vehicle)
          setIsDialogOpen(true)
        }}
        onDelete={handleDelete}
      />
    </div>
  )
}

