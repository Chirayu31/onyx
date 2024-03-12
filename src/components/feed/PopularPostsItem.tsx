import React from 'react'
import { Button } from '../ui/button'
import { EyeOpenIcon } from '@radix-ui/react-icons'

const PopularPostsItem = () => {
  return (
    <>
      <div className='py-2'>
        <div className='flex gap-2 items-center'>
          <p className='text-zinc-500 text-sm lg:text-base'>topic</p>
          <p className='text-xs lg:text-sm text-zinc-400'>1d ago</p>
          <Button variant={'secondary'} className='py-0 px-4 h-6 rounded-full'>
            <EyeOpenIcon className='mr-2' />
            {`510`}
          </Button>
        </div>
      </div>
      <div>
        <h2 className='font-bold text-xs lg:text-sm'>
          My conservative friends are more tolerant than my liberal friends
        </h2>
      </div>
    </>
  )
}

export default PopularPostsItem
