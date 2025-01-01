import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    console.log(users)
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
    try {
      const json = await request.json();
      console.log(`Received JSON: ${JSON.stringify(json)}`);
  
      // Basic validation
      const { name, email, age } = json;
      console.log(`Name: ${name}, Email: ${email}, Age: ${age}`);
      if (!name || !email || (age && isNaN(parseInt(age)))) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
      }
  
      const user = await prisma.user.create({
        data: {
          name,
          email,
          age: age ? parseInt(age) : undefined,
        },
      });
  
      return NextResponse.json(user, { status: 201 });
    } catch (error) {
      console.error('Error creating user:', error);
      console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return NextResponse.json({ error: 'A user with this email already exists' }, { status: 400 });
        }
      }
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
  }
