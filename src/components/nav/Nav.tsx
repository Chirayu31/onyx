import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className='flex items-center px-4 md:px-16 justify-between py-5'>
      <Link href={`/`}>
        <h4 className="text-xl sm:text-4xl font-['Montserrat_Alternates']">
          onyx
        </h4>
      </Link>

      <div className='flex gap-1 sm:gap-5 md:gap-10 md:mr-20'>
        <Link href={`/topics`}>
          <Button className='text-sm sm:text-lg font-semibold' variant={'link'}>
            board
          </Button>
        </Link>

        <Link href={`/profile`}>
          <Button className='text-sm sm:text-lg font-semibold' variant={'link'}>
            profile
          </Button>
        </Link>

        <Link href={`/add-post`}>
          <Button
            className='text-sm sm:text-lg font-semibold'
            variant={'outline'}>
            New Post
          </Button>
        </Link>
      </div>
    </nav>
  )
}

export default Nav
