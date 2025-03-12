"use client";
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2 className='text-4xl text-white font-serif'>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        <div className="justify-content-center">
        <b>Some Error Accoured Please try again and make sure you logged in</b>
        </div>
      </button>
    </div>
  )
}