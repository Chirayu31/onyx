'use client'
import Post from '@/components/post/Post'
import Zero from '@/components/post/Zero'
import Loader from '@/components/ui/loader'
import { trpc } from '@/utils/trpc'
import Error from 'next/error'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

const Feed = ({ params }: { params: { topic: string } }) => {
  const feed = trpc.post.getPostsByTopicId.useQuery({
    page: 1,
    pageSize: 20,
    topicId: params.topic,
  })

  if (feed.isLoading) {
    return <Loader />
  }

  if (feed.isError) {
    if (feed.error.data?.code === 'NOT_FOUND') return notFound()
    else
      throw new Error({
        statusCode: 500,
        title: 'Internal Server Error',
        withDarkMode: false,
      })
  }

  if (!feed.isLoading && feed.data && feed.data.length === 0) {
    return <Zero type='feed' />
  }

  return (
    <main className='absolute top-20 bg-gray-100 w-full min-h-screen'>
      <div className='flex flex-col gap-5 md:flex-row my-10 mx-2 sm:mx-5 md:mx-10'>
        <div className='flex flex-col items-center w-full gap-1 mb-10'>
          {feed.data &&
            feed.data.map((post) => (
              <>
                <Link href={`/feed/${params.topic}/${post.id}`}>
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
                </Link>
              </>
            ))}
        </div>
      </div>
    </main>
  )
}

export default Feed
