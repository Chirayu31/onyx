import { HeartIcon } from '@radix-ui/react-icons';
import React from 'react'
import { Button } from '../ui/button';

const LikesButton = () => {
  return (
    <Button variant={"secondary"} className="py-0 px-4 rounded-full">
      <HeartIcon className="mx-2" />
      {`51`}
    </Button>
  );
}

export default LikesButton