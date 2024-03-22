import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Content from './Content'
import LikesButton from './LikesButton'
import CommentButton from './CommentButton'
import ViewsButton from './ViewsButton'

interface PostProps {
  id: string
  title: string
  body: string
  userId: string
  userImage: string
  username: string
  createdAt: string
  likesCount: number
  commentsCount: number
  viewsCount: number
  isFeed: boolean
}

const Post: React.FC<PostProps> = ({
  id,
  title,
  body,
  userId,
  userImage,
  username,
  createdAt,
  likesCount,
  commentsCount,
  viewsCount,
  isFeed,
}) => {
  return (
    <Card className='w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-fit cursor-pointer'>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <img src={userImage} className='w-10 h-10 rounded-full' alt='ppic' />
          <p className='font-semibold text-zinc-500 text-base'>{username}</p>
          <p className='text-sm text-zinc-400'>{createdAt}</p>
        </div>
      </CardHeader>

      <CardContent>
        <h2 className='font-bold text-base lg:text-lg'>{title}</h2>
        <Content body={body} isFeed={isFeed} />
      </CardContent>

      <CardFooter>
        <div className='flex gap-2'>
          <LikesButton count={likesCount} userId={userId} postId={id} />
          <CommentButton count={commentsCount} />
          <ViewsButton count={viewsCount} />
        </div>
      </CardFooter>
    </Card>
  )
}

export default Post
