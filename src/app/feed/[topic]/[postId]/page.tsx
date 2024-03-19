'use client'
import Nav from '@/components/nav/Nav'
import Comment from '@/components/post/Comment'
import Post from '@/components/post/Post'
import { Textarea } from '@/components/ui/textarea'
import { trpc } from '@/utils/trpc'
import React from 'react'

const PostPage = ({ params }: { params: { postId: string } }) => {
  const { data: post, isLoading } = trpc.post.getPostById.useQuery({
    id: params.postId,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (post) {
    console.log(post)
  }

  return (
    <>
      <Nav />

      <main className='flex pt-4 justify-center bg-gray-100'>
        <div className='  flex flex-col items-center top-0 w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] min-h-screen  '>
          {!isLoading && post && (
            <Post
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
          )}

          <form className='flex w-full max-w-auto my-2 gap-2  items-center'>
            <Textarea className='h-20 bg-white' placeholder='Add a comment' />
          </form>
          <Comment />
        </div>
      </main>
    </>
  )
}

export default PostPage
