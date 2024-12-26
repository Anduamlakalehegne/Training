import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <h1> Wellcome to Next.js</h1>
      <Button>
        <Link href="/about">
          About
        </Link>
      </Button>

    </div>
  )
}

export default page
