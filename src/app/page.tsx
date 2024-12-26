import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
      <h1> Wellcome to Next.js</h1>
      <Link href="/about">
        About
      </Link>
    </div>
  )
}

export default page
