'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { trpc } from '@/utils/trpc'
import React from 'react'
import Post from '@/components/post/Post'

const Profile = () => {
  const { data: user, isLoading: isUserLoading } = trpc.auth.profile.useQuery()
  const { data: posts, isLoading: isPostsLoading } =
    trpc.post.getPostsByUserId.useQuery({ page: 1, pageSize: 25 })

  if (isUserLoading || isPostsLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col items-center mt-10 '>
      <Card className='w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-fit'>
        <CardHeader>
          <div className='flex items-center gap-4'>
            <img
              src={user?.ppic || '/default-avatar.png'}
              alt='User Profile Picture'
              className='w-20 h-20 rounded-full'
            />
            <div>
              <h1 className='text-2xl font-bold'>{user?.username}</h1>
              <p>Course: {user?.course}</p>
              <p>Year: {user?.year}</p>
            </div>
          </div>
        </CardHeader>
      </Card>
      <div className='flex flex-col gap-5 w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-fit items-start my-10 mx-2 sm:mx-5 md:mx-10'>
        <h2 className='text-xl font-bold mb-2'>Posts</h2>
        <div className='flex flex-col items-center w-full gap-1 mb-10'>
          {posts?.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              userId={post.userId}
              userImage={post.user.ppic}
              username={post.user.username}
              createdAt={post.createdAt.toLocaleString()}
              likesCount={post._count.Likes}
              commentsCount={post._count.Comment}
              viewsCount={post._count.Views}
              isFeed={false}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
