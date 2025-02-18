import React from 'react'
import Link from 'next/link'

const NotFoundPage = () => {
  return (
    <div className='py-8 h-screen'>
      <main className='text-center mx-auto items-center bg-contain bg-center h-full bg-feature dark:bg-feature-dark'>
        <div className='absolute left-2/4 top-2/4 items-center -translate-x-2/4 -translate-y-2/4'>  
          <h1 className='text-3xl'>404 This page could not be found.</h1>
          <br />
          <p>Go back to the <Link href="/" className='underline text-blue-500'>Home</Link></p>
        </div>
      </main>
    </div>
  )
}

export default NotFoundPage