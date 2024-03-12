import PopularPosts from '@/components/feed/PopularPosts'
import Post from '@/components/feed/Post'
import React from 'react'

const Feed = () => {
  return (
    <main className='absolute top-0 bg-gray-100 w-full min-h-screen'>
      <div className='flex flex-col gap-5 md:flex-row my-10 mx-2 sm:mx-5 md:mx-10'>
        <div className='w-0 xl:w-[300px]'></div>
        <div className='flex flex-col items-center w-full gap-1 mb-10'>
          <Post />
          <Post />
          <Post />
        </div>
        <PopularPosts />
      </div>
    </main>
  )
}

export default Feed
