'use client'
import PopularPosts from '@/components/feed/PopularPosts'
import Post from '@/components/post/Post'
import { trpc } from '@/utils/trpc'
import React from 'react'

const Feed = ({ params }: { params: { topic: string } }) => {
  const feed = trpc.post.getPostsByTopicId.useQuery({
    page: 1,
    pageSize: 20,
    topicId: params.topic,
  })

  if (feed.isLoading) {
    return <>Loading</>
  }

  if (feed.data) {
    console.log(feed.data)
  }

  return (
    <main className='absolute top-0 bg-gray-100 w-full min-h-screen'>
      <div className='flex flex-col gap-5 md:flex-row my-10 mx-2 sm:mx-5 md:mx-10'>
        <div className='w-0 xl:w-[300px]'></div>
        <div className='flex flex-col items-center w-full gap-1 mb-10'>
          {feed.data &&
            feed.data.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                userId={post.userId}
                userImage={post.user.ppic}
                username={post.user.username}
                createdAt={post.createdAt}
                likesCount={post._count.Likes}
                commentsCount={post._count.Comment}
                viewsCount={post._count.Views}
                isFeed={true}
              />
            ))}
        </div>
        <PopularPosts />
      </div>
    </main>
  )
}

export default Feed
