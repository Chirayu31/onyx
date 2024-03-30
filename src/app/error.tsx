'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen -mt-20'>
      <h1 className='text-2xl mb-4'>500 - Internal Server Error</h1>
      <h2>Something went wrong on our end. Try again later</h2>
    </div>
  )
}
