import React from 'react'
import { Button } from '../ui/button';

const Nav = () => {
  return (
    <nav className="flex px-4 items-center md:px-16  justify-between py-5 font-['Montserrat']">
      <h4 className="text-4xl">onyx</h4>

      <div className="flex gap-10  md:mr-20">
        <Button className="text-xl font-semibold" variant={"link"}>
          Home
        </Button>
        <Button className="text-xl font-semibold" variant={"link"}>
          Explore
        </Button>
        <Button className="text-xl font-semibold" variant={"link"}>
          Profile
        </Button>
      </div>
    </nav>
  );
}

export default Nav