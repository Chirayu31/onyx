import { z } from 'zod'

export const addCommentInputSchema = z.object({
  postId: z.string(),
  body: z.string(),
  isReply: z.boolean(),
})

export const likeCommentInputSchema = z.object({
  commentId: z.string(),
})

export const replyCommentInputSchema = z.object({
  postId: z.string(),
  body: z.string(),
  parentCommentId: z.string(),
})

export const deleteCommentInputSchema = z.object({
  commentId: z.string(),
})

export const getCommentsForPostInputSchema = z.object({
  postId: z.string(),
})
