import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: {
        lastUpdated: 'desc',
      },
    })
    return NextResponse.json(vehicles)
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return NextResponse.json({ error: 'Error fetching vehicles' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, status } = await request.json()
    const vehicle = await prisma.vehicle.create({
      data: { name, status },
    })
    return NextResponse.json(vehicle, { status: 201 })
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return NextResponse.json({ error: 'Error creating vehicle' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, status } = await request.json()
    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: { name, status },
    })
    return NextResponse.json(vehicle)
  } catch (error) {
    console.error('Error updating vehicle:', error)
    return NextResponse.json({ error: 'Error updating vehicle' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    await prisma.vehicle.delete({
      where: { id },
    })
    return NextResponse.json({ message: 'Vehicle deleted successfully' })
  } catch (error) {
    console.error('Error deleting vehicle:', error)
    return NextResponse.json({ error: 'Error deleting vehicle' }, { status: 500 })
  }
}

