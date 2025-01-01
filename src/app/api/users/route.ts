import { NextResponse } from 'next/server'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    console.log('Received data:', json)

    const user = await prisma.user.create({
      data: {
        name: json.name,
        email: json.email,
        age: json.age ? parseInt(json.age) : undefined,
      },
    })

    console.log('Created user:', user)
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({ error: 'A user with this email already exists.' }, { status: 400 })
      }
    }
    
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
  }
}

