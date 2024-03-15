import React from 'react'
import { Button } from '../ui/button';
import { EyeOpenIcon } from '@radix-ui/react-icons';
const ViewsButton = () => {
  return (
    <Button variant={"secondary"} className="py-0 px-4 rounded-full">
      <EyeOpenIcon className="mx-2" />
      {`510`}
    </Button>
  );
}

export default ViewsButton