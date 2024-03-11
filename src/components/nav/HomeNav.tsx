import React from 'react'
import { Button } from '../ui/button';

const HomeNav = () => {
  return (
    <nav className="flex px-16 justify-between py-5 font-['Montserrat']">
      <div>
        <h4 className="text-4xl">onyx</h4>
      </div>

      <div className="flex gap-10 mr-10 md:mr-20">
        <Button className="text-xl font-semibold" variant={"link"}>
          about
        </Button>
        <Button className="text-xl font-semibold" variant={"link"}>
          get in
        </Button>
      </div>
    </nav>
  );
}

export default HomeNav