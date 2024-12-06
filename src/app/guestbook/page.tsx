'use client'

import GuestbookClient from './GuestbookClient'
import { SessionProvider } from 'next-auth/react'

export default function GuestbookPage() {
  return (
    <SessionProvider>
      <GuestbookClient />
    </SessionProvider>
  )
}
