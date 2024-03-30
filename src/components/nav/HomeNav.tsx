import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const HomeNav = () => {
  return (
    <nav className='flex px-4 items-center md:px-16 justify-between py-5'>
      <Link href={'/'}>
        <h4 className="text-4xl font-['Montserrat_Alternates']">onyx</h4>
      </Link>
      <div className='flex gap-10  md:mr-20'>
        <Link href={'/'}>
          <Button className='text-xl font-semibold' variant={'link'}>
            about
          </Button>
        </Link>
        <Link href={'/auth'}>
          <Button className='text-xl font-semibold' variant={'link'}>
            get in
          </Button>
        </Link>
      </div>
    </nav>
  )
}

export default HomeNav
