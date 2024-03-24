'use client'

import { usePathname } from 'next/navigation'
import HomeNav from './HomeNav'
import Nav from './Nav'

const NavIndex = () => {
  const pathname = usePathname()
  if (pathname === '/' || pathname === '/auth' || pathname === '/about') {
    return <HomeNav />
  } else {
    return <Nav />
  }
}

export default NavIndex
