'use client'
import { Button } from '@/components/ui/button'
import { SiGoogle } from 'react-icons/si'
import { Features } from '@/components/home/features'
import HomeNav from '@/components/nav/HomeNav'

export default function Home() {
  return (
    <>
      <HomeNav />
      <main className='flex w-full flex-col items-center'>
        <h2 className="text-center scroll-m-20  border-b py-10 pb-2 text-5xl font-semibold tracking-wide first:mt-0 font-['Sedgwick_Ave_Display']">
          PSEUDONYMOUS FORUM FOR IPS STUDENTS
        </h2>

        <blockquote className=" text-center border-l-2 italicm text-gray-600 tracking-wide text-2xl mt-10 font-['Sedgwick_Ave_Display']">
          UNVEIL YOUR THOUGHTS, CONNECT WITH PEERS, STAY UNSEEN
        </blockquote>

        <Button className='text-xl font-semibold mt-10 h-12 '>
          <SiGoogle className='mr-2 h-3 w-3 text-centre ' /> Login with Google
        </Button>

        <div className='flex w-full justify-center mt-10 '>
          <Features />
        </div>
      </main>
    </>
  )
}
