import React from 'react'
import { Button } from '../ui/button';
import { BiComment } from 'react-icons/bi';

const CommentButton = () => {
  return (
    <Button variant={"secondary"} className="py-0 px-4 rounded-full">
      <BiComment className="mx-2" />
      {`51`}
    </Button>
  );
}

export default CommentButton