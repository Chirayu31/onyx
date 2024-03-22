import React from 'react'
import { Button } from '../ui/button'

const Nav = () => {
  return (
    <nav className='flex px-4 items-center md:px-16 justify-between py-5'>
      <h4 className="text-4xl font-['Montserrat_Alternates']">onyx</h4>

      <div className='flex gap-10 md:mr-20'>
        <Button className='text-lg font-semibold' variant={'link'}>
          Board
        </Button>
        <Button className='text-lg font-semibold' variant={'link'}>
          Profile
        </Button>
        <Button className='text-lg font-semibold' variant={'outline'}>
          New Post
        </Button>
      </div>
    </nav>
  )
}

export default Nav
