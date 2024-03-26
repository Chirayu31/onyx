'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Loader from '@/components/ui/loader'
import { trpc } from '@/utils/trpc'
import Link from 'next/link'
import React from 'react'

const Topics = () => {
  const topics = trpc.topics.getAllTopicsAndSubtopics.useQuery()

  if (topics.isLoading) {
    return <Loader />
  }

  return (
    <main className='flex mt-10 mb-10 justify-center min-h-fit w-full'>
      <Card className='w-full max-w-[1100px] mx-5 sm:mx-20 shadow-lg'>
        <CardHeader>
          <h1 className="font-bold text-4xl ml-2 font-['Montserrat_Alternates']">
            Boards
          </h1>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center w-full gap-4'>
            {topics.data &&
              topics.data.map((topic) => (
                <div key={topic.id} className='flex flex-col z-10'>
                  <h4 className="text-base sm:text-xl text-gray-700 hover:text-black font-bold font-['Montserrat_Alternates']">
                    {topic.title}
                  </h4>
                  <div className='pl-2 flex flex-col gap-1'>
                    {topic.subtopics.map((item) => (
                      <>
                        <Link href={`/feed/${item.id}`}>
                          <p
                            key={item.id}
                            className='text-gray-800 text-sm sm:text-base cursor-pointer hover:text-black hover:underline'>
                            {item.title}
                          </p>
                        </Link>
                      </>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default Topics
