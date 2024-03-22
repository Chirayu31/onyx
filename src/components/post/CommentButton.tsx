import React from 'react'
import { Button } from '../ui/button'
import { BiComment } from 'react-icons/bi'

interface CommentButtonProps {
  count: number
}

const CommentButton: React.FC<CommentButtonProps> = ({ count }) => {
  return (
    <Button variant={'secondary'} className='py-0 px-4 rounded-full'>
      <BiComment className='mx-2' />
      {count}
    </Button>
  )
}

export default CommentButton
