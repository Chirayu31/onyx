import { Card, CardContent, CardHeader } from '@/components/ui/card'
import React from 'react'

const topicsData: { topic: string; items: string[] }[] = [
  {
    topic: 'Clubs',
    items: [
      'GDSC',
      'Singing',
      'Dancing',
      'Photography',
      'Cultural',
      'IPS Tech',
    ],
  },
  {
    topic: 'Events',
    items: [
      'Swaranjali',
      'Exhibition',
      'Foundation Day',
      'Workshops',
      'Promotional',
    ],
  },
  {
    topic: 'Placements',
    items: [
      'Off-campus opportunities',
      'Preparation Resources',
      'Previous Companies',
    ],
  },
  {
    topic: 'Festivals',
    items: [
      'Diwali',
      'Holi',
      'Navratri',
      'Eid',
      'Christmas',
      'Republic Day',
      'Independence Day',
      'Gandhi Jayanti',
    ],
  },
  {
    topic: 'Sports',
    items: [
      'Cricket',
      'Basketball',
      'Football',
      'Table Tennis',
      'Volleyball',
      'Chess',
      'Carrom',
      'Kabbadi',
    ],
  },

  {
    topic: 'CSE Prep',
    items: [
      'DSA',
      'Android Development',
      'Web development',
      'Blockchain',
      'AI/ML',
      'Aptitude',
      'Core Subjects',
    ],
  },
  {
    topic: 'Confessions',
    items: [],
  },
]

const Topics = () => {
  return (
    <main className='flex mt-20 mb-20 justify-center min-h-fit w-full'>
      <Card className='w-full max-w-[1100px] mx-5 sm:mx-20 shadow-lg'>
        <CardHeader>
          <h1 className="font-bold text-4xl ml-2 font-['Montserrat_Alternates']">
            Boards
          </h1>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center w-full gap-4'>
            {topicsData.map((topic) => (
              <div key={topic.topic} className='flex flex-col z-10'>
                <h4 className="text-base sm:text-xl text-gray-700 hover:text-black font-bold font-['Montserrat_Alternates']">
                  {topic.topic}
                </h4>
                <div className='pl-2 flex flex-col gap-1'>
                  {topic.items.map((item) => (
                    <p
                      key={item}
                      className='text-gray-800 text-sm sm:text-base cursor-pointer hover:text-black hover:underline'>
                      {item}
                    </p>
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
