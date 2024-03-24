import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className='flex px-4 items-center md:px-16 justify-between py-5'>
      <Link href={`/`}>
        <h4 className="text-4xl font-['Montserrat_Alternates']">onyx</h4>
      </Link>

      <div className='flex gap-10 md:mr-20'>
        <Link href={`/topics`}>
          <Button className='text-lg font-semibold' variant={'link'}>
            Board
          </Button>
        </Link>

        <Link href={`/profile`}>
          <Button className='text-lg font-semibold' variant={'link'}>
            Profile
          </Button>
        </Link>

        <Link href={`/add-post`}>
          <Button className='text-lg font-semibold' variant={'outline'}>
            New Post
          </Button>
        </Link>
      </div>
    </nav>
  )
}

export default Nav
