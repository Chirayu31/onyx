import React from 'react'
import { Button } from '../ui/button'
import { EyeOpenIcon } from '@radix-ui/react-icons'

interface ViewsButtonProps {
  count: number
}

const ViewsButton: React.FC<ViewsButtonProps> = ({ count }) => {
  return (
    <Button variant={'secondary'} className='py-0 px-4 rounded-full'>
      <EyeOpenIcon className='mx-2' />
      {count}
    </Button>
  )
}

export default ViewsButton
