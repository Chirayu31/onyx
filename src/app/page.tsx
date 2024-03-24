'use client'
import { Button } from '@/components/ui/button'
import { SiGoogle } from 'react-icons/si'
import { Features } from '@/components/home/features'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <main className='flex flex-col items-center justify-center w-full gap-10'>
        <h2 className="text-center scroll-m-20  border-b py-10 pb-2 text-5xl font-semibold tracking-wide mx-2 font-['Sedgwick_Ave_Display']">
          PSEUDONYMOUS FORUM FOR IPS STUDENTS
        </h2>

        <blockquote className=" text-center border-l-2 italicm text-gray-600 tracking-wide text-2xl font-['Sedgwick_Ave_Display']">
          UNVEIL YOUR THOUGHTS, CONNECT WITH PEERS, STAY UNSEEN
        </blockquote>

        <Link href='/auth'>
          <Button className='text-xl font-semibold h-12 bg-white rounded-full text-black hover:text-white mt-2 border-[1px] border-black px-6 md:px-10'>
            <SiGoogle className='mr-6 h-3 w-3' />
            Login
          </Button>
        </Link>

        <div className='flex w-full justify-center mt-6'>
          <Features />
        </div>
      </main>
    </>
  )
}
