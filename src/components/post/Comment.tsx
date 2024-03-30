import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardHeader } from '../ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog'
import Content from './Content'
import { trpc } from '@/utils/trpc'
import { CommentData } from '@/app/feed/[topic]/[postId]/page'
import { Textarea } from '../ui/textarea'
import { formatTimeAgo } from '@/utils/helper'

interface CommentProps {
  id: string
  body: string
  userId: string
  userImage: string
  username: string
  createdAt: string
  postId: string
  isOwner: boolean
  onDeleteComment: (commentId: string) => void
  isReply: boolean
}

const Comment: React.FC<CommentProps> = ({
  id,
  body,
  userId,
  userImage,
  username,
  createdAt,
  postId,
  isOwner,
  onDeleteComment,
  isReply,
}) => {
  const [replyInput, setReplyInput] = useState('')
  const [allReplies, setAllReplies] = useState<CommentData[]>([])
  const { mutate: replyComment } = trpc.comment.replyComment.useMutation()
  const { mutate: deleteComment } = trpc.comment.deleteComment.useMutation()
  const replies = trpc.comment.getAllReplies.useQuery(
    { parentCommentId: id },
    { enabled: false }
  )

  const handleFetchReplyComment = () => {
    replies.refetch().then((data) => {
      if (data.isSuccess) {
        setAllReplies(data.data)
      }
    })
  }

  const handleReplyComment = () => {
    if (replyInput.trim()) {
      replyComment(
        { postId, body: replyInput, parentCommentId: id },
        {
          onSuccess: (newReply) => {
            setAllReplies((prevReplies) => [newReply, ...prevReplies])
            setReplyInput('')
          },
        }
      )
    }
  }

  const handleDeleteComment = () => {
    deleteComment(
      { commentId: id },
      {
        onSuccess: () => {
          onDeleteComment(id)
          setAllReplies([])
        },
      }
    )
  }

  const onDeleteCommentReply = (commentId: string) => {
    setAllReplies((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    )
  }

  return (
    <div className={`flex flex-col w-full mt-8 ${isReply ? 'pl-4' : ''}`}>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-center gap-2'>
          <img src={userImage} className='w-10 h-10 rounded-full' alt='User' />
          <Card className='w-full border-2 max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-fit cursor-pointer'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <p className='font-semibold text-zinc-500 text-base'>
                  {username}
                </p>
                <p className='text-sm text-zinc-400'>
                  {formatTimeAgo(new Date(createdAt))}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <Content body={body} isFeed={false} />
            </CardContent>
          </Card>
        </div>

        <div className='flex items-center gap-1 ml-10 mt-1 max-w-auto'>
          <Dialog>
            <DialogTrigger>
              <Button variant='link'>Reply</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h2 className='font-sans flex justify-center text-base lg:text-lg'>
                  Add your comment
                </h2>
                <div className='flex flex-col w-full py-2 max-w-auto gap-4'>
                  <Textarea
                    placeholder='Add a reply'
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                  />
                  <Button type='submit' onClick={handleReplyComment}>
                    Submit
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button variant={'link'} onClick={handleFetchReplyComment}>
            Show Replies
          </Button>
          {isOwner && (
            <Button
              variant='link'
              className='text-red-500'
              onClick={handleDeleteComment}>
              Delete
            </Button>
          )}
        </div>
      </div>

      {allReplies &&
        allReplies.map((reply) => (
          <Comment
            key={reply.id}
            id={reply.id}
            body={reply.body}
            userId={reply.userId}
            userImage={reply.user?.ppic ?? ''}
            username={reply.user?.username ?? ''}
            createdAt={reply.createdAt.toLocaleString()}
            onDeleteComment={onDeleteCommentReply}
            isOwner={reply.isOwner}
            postId={postId}
            isReply={true}
          />
        ))}
    </div>
  )
}

export default Comment
