'use client'
import Nav from '@/components/nav/Nav'
import Comment from '@/components/post/Comment'
import Post from '@/components/post/Post'
import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader'
import { Textarea } from '@/components/ui/textarea'
import { trpc } from '@/utils/trpc'
import React, { useEffect, useState } from 'react'

export interface CommentData {
  id: string
  body: string
  userId: string
  user: {
    id: string
    ppic: string
    username: string
  }
  createdAt: string
  updatedAt: string
  parentCommentId: string | null
  isReply: boolean
  isOwner: boolean
}

const PostPage = ({ params }: { params: { postId: string } }) => {
  const [commentInput, setCommentInput] = useState('')
  const [allComments, setAllComments] = useState<CommentData[]>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const { data: post, isLoading } = trpc.post.getPostById.useQuery({
    id: params.postId,
  })
  const { mutate: addComment } = trpc.comment.addComment.useMutation()
  const { data: comments } = trpc.comment.getCommentsForPost.useQuery({
    postId: params.postId,
  })

  useEffect(() => {
    if (comments) {
      setAllComments(comments)
    }
  }, [comments])

  const handleSubmitComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    if (commentInput.trim()) {
      addComment(
        { postId: params.postId, body: commentInput, isReply: false },
        {
          onSuccess: (newComment: CommentData) => {
            setAllComments((prevComments) => [newComment, ...prevComments])
            setCommentInput('')
          },
        }
      )
    }
    setIsSubmitting(false)
  }

  const onDeleteComment = (commentId: string) => {
    setAllComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    )
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <main className='flex pt-4 justify-center bg-gray-100'>
        <div className='flex flex-col items-center top-0 w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] min-h-screen  '>
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
            className='flex flex-col w-full max-w-auto my-2 gap-2 items-end'
            onSubmit={handleSubmitComment}>
            <Textarea
              className='h-20 bg-white'
              placeholder='Add a comment'
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              disabled={isSubmitting}
            />
            <Button className='w-[200px]'>Submit</Button>
          </form>

          {allComments &&
            allComments.map((comment) => (
              <Comment
                key={comment.id}
                id={comment.id}
                body={comment.body}
                userId={comment.userId}
                userImage={comment.user?.ppic ?? ''}
                username={comment.user?.username ?? ''}
                createdAt={comment.createdAt.toLocaleString()}
                onDeleteComment={onDeleteComment}
                isOwner={comment.isOwner}
                postId={params.postId}
                isReply={false}
              />
            ))}
        </div>
      </main>
    </>
  )
}

export default PostPage
