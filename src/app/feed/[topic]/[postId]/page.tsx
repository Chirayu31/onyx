'use client'
import Nav from '@/components/nav/Nav'
import Comment from '@/components/post/Comment'
import Post from '@/components/post/Post'
import { Textarea } from '@/components/ui/textarea'
import { trpc } from '@/utils/trpc'
import React, { useEffect, useState } from 'react'

const PostPage = ({ params }: { params: { postId: string } }) => {
  const [commentInput, setCommentInput] = useState('')
  const [allComments, setAllComments] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { data: post, isLoading } = trpc.post.getPostById.useQuery({
    id: params.postId,
  })
  const { mutate: addComment } = trpc.comment.addComment.useMutation()
  const { data: comments } = trpc.comment.getCommentsForPost.useQuery({
    postId: params.postId,
  })

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    if (commentInput.trim()) {
      addComment(
        { postId: params.postId, body: commentInput, isReply: false },
        {
          onSuccess: (newComment) => {
            setAllComments((prevComments) => [newComment, ...prevComments])
            setCommentInput('')
          },
        }
      )
    }
    setIsSubmitting(false)
  }

  useEffect(() => {
    if (comments) {
      setAllComments(comments)
    }
  }, [comments])

  if (isLoading) {
    return <div>Loading...</div>
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

          <form
            className='flex w-full max-w-auto my-2 gap-2 items-center'
            onSubmit={handleSubmitComment}>
            <Textarea
              className='h-20 bg-white'
              placeholder='Add a comment'
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              disabled={isSubmitting}
            />
            <button type='submit'>submit</button>
          </form>

          {allComments?.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              body={comment.body}
              userId={comment.userId}
              userImage={comment.user?.ppic ?? ''}
              username={comment.user?.username ?? ''}
              createdAt={comment.createdAt.toLocaleString()}
              likesCount={comment.likes.length}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default PostPage
