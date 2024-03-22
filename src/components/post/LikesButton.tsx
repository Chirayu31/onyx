'use client'
import React, { useEffect, useState } from 'react'
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { trpc } from '@/utils/trpc'

interface LikesButtonProps {
  count: number
  userId: string
  postId: string
}

const LikesButton: React.FC<LikesButtonProps> = ({ count, userId, postId }) => {
  const [likeCount, setLikeCount] = useState(count)
  const [isLiked, setIsLiked] = useState(false)
  const { mutate: likePostMutation } = trpc.like.likePost.useMutation()
  const { data: isLikedData, isLoading } = trpc.like.isLiked.useQuery({
    postId,
  })

  const handleLikeClick = () => {
    likePostMutation({ postId })
    if (isLikedData) {
      if (isLiked) {
        setLikeCount(likeCount - 1)
        setIsLiked(false)
      } else {
        setLikeCount(likeCount + 1)
        setIsLiked(true)
      }
    }
  }
  useEffect(() => {
    if (isLikedData?.liked) {
      setIsLiked(isLikedData.liked)
    }
  }, [isLikedData])

  return (
    <Button
      variant={'secondary'}
      className='rounded-full'
      onClick={handleLikeClick}>
      {isLiked ? (
        <HeartFilledIcon className={`mr-2 text-red-500`} />
      ) : (
        <HeartIcon className={`mr-2`} />
      )}
      {likeCount}
    </Button>
  )
}

export default LikesButton
