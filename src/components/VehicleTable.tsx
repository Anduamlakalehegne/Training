import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Vehicle {
  id: string
  name: string
  status: string
  lastUpdated: string
}

interface VehicleTableProps {
  vehicles: Vehicle[]
  onEdit: (vehicle: Vehicle) => void
  onDelete: (id: string) => void
}

export function VehicleTable({ vehicles, onEdit, onDelete }: VehicleTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vehicle Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell>{vehicle.name}</TableCell>
            <TableCell>{vehicle.status}</TableCell>
            <TableCell>{new Date(vehicle.lastUpdated).toLocaleString()}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2" onClick={() => onEdit(vehicle)}>
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(vehicle.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

