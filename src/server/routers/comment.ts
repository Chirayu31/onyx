import { z } from 'zod'
import {
  addCommentInputSchema,
  deleteCommentInputSchema,
  replyCommentInputSchema,
} from '@/lib/validation/comment'
import { protectedProcedure, router } from '../trpc'

export const commentRouter = router({
  addComment: protectedProcedure
    .input(addCommentInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { postId, body, isReply } = input
      const userId = ctx.user.userId

      const comment = await ctx.prisma.comment.create({
        data: {
          body,
          isReply,
          postId,
          userId,
        },
        include: {
          user: {
            select: {
              username: true,
              ppic: true,
            },
          },
          likes: true,
        },
      })

      return comment
    }),

  replyComment: protectedProcedure
    .input(replyCommentInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { postId, body, parentCommentId } = input
      const userId = ctx.user.userId

      const comment = await ctx.prisma.comment.create({
        data: {
          body,
          isReply: true,
          postId,
          userId,
          parentCommentId,
        },
      })

      return comment
    }),

  deleteComment: protectedProcedure
    .input(deleteCommentInputSchema)
    .mutation(async ({ ctx, input }) => {
      const { commentId } = input
      const userId = ctx.user.userId

      const comment = await ctx.prisma.comment.findUnique({
        where: {
          id: commentId,
        },
      })

      if (!comment) {
        throw new Error('Comment not found')
      }

      if (comment.userId !== userId) {
        throw new Error('Not authorized to delete this comment')
      }

      await ctx.prisma.comment.delete({
        where: {
          id: commentId,
        },
      })

      return { success: true }
    }),

  getCommentsForPost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { postId } = input

      const comments = await ctx.prisma.comment.findMany({
        where: {
          postId,
        },
        include: {
          user: {
            select: {
              username: true,
              ppic: true,
            },
          },
          likes: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return comments
    }),
})
