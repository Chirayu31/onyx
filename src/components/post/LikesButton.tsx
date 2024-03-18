import React from 'react'
import { HeartIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'

interface LikesButtonProps {
  count: number
  userId: string
  postId: string
}

const LikesButton: React.FC<LikesButtonProps> = ({ count, userId, postId }) => {
  return (
    <Button variant={'secondary'} className='py-0 px-4 rounded-full'>
      <HeartIcon className={`mx-2 `} />
      {count}
    </Button>
  )
}

export default LikesButton
