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
  setAllComments: React.Dispatch<React.SetStateAction<CommentData[]>>
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
  setAllComments,
}) => {
  const [replyInput, setReplyInput] = useState('')
  const { mutate: replyComment } = trpc.comment.replyComment.useMutation()
  const { mutate: deleteComment } = trpc.comment.deleteComment.useMutation()

  const handleReplyComment = () => {
    if (replyInput.trim()) {
      replyComment(
        { postId, body: replyInput, parentCommentId: id },
        {
          onSuccess: (newComment) => {
            setAllComments((prevComments) => [newComment, ...prevComments])
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
        },
      }
    )
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-center gap-2'>
          <img src={userImage} className='w-10 h-10 rounded-full' alt='User' />
          <Card className='w-full border-2 max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-fit cursor-pointer'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <p className='font-semibold text-zinc-500 text-base'>
                  {username}
                </p>
                <p className='text-sm text-zinc-400'>{createdAt}</p>
              </div>
            </CardHeader>
            <CardContent>
              <Content body={body} isFeed={false} />
            </CardContent>
          </Card>
        </div>

        <div className=' flex gap-2 ml-10  py-2  max-w-auto '>
          <Dialog>
            <DialogTrigger>Reply</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h2 className='font-sans flex justify-center text-base lg:text-lg'>
                  Add your comment
                </h2>
                <div className='flex w-full py-2 max-w-auto items-center space-x-2'>
                  <Input
                    type='text'
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
    </div>
  )
}

export default Comment
