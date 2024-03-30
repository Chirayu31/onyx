import {
  addPostSchema,
  deletePostById,
  getPostById,
  getPostsByTopicId,
  getPostsByUserId,
} from '@/lib/validation/post'
import { protectedProcedure, router } from '../trpc'
import { TRPCError } from '@trpc/server'

export const postRouter = router({
  addPost: protectedProcedure
    .input(addPostSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.userId
      const { topicId, title, description } = input

      const post = await ctx.prisma.post.create({
        data: {
          title,
          body: description,
          userId,
          topicId,
        },
      })

      return post
    }),
  getPostById: protectedProcedure
    .input(getPostById)
    .query(async ({ ctx, input }) => {
      const { id } = input

      const post = await ctx.prisma.post.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          body: true,
          userId: true,
          createdAt: true,
          user: {
            select: {
              username: true,
              ppic: true,
            },
          },
          _count: {
            select: { Likes: true, Comment: true, Views: true },
          },
        },
      })

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post does not exists.',
        })
      }

      return post
    }),
  deletePost: protectedProcedure
    .input(deletePostById)
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      await ctx.prisma.post.delete({
        where: { id },
      })

      return { id }
    }),

  getPostsByTopicId: protectedProcedure
    .input(getPostsByTopicId)
    .query(async ({ ctx, input }) => {
      const { topicId, page = 1, pageSize = 25 } = input
      const offset = (page - 1) * pageSize

      const topic = await ctx.prisma.subtopics.findUnique({
        where: { id: topicId },
      })

      if (!topic) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Invalid Topic Id' })
      }

      const posts = await ctx.prisma.post.findMany({
        where: { topicId },
        select: {
          id: true,
          title: true,
          body: true,
          userId: true,
          createdAt: true,
          user: {
            select: {
              username: true,
              ppic: true,
            },
          },
          _count: {
            select: { Likes: true, Comment: true, Views: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: pageSize,
      })

      return posts
    }),

  getPostsByUserId: protectedProcedure
    .input(getPostsByUserId)
    .query(async ({ ctx, input }) => {
      const { page = 1, pageSize = 25 } = input
      const offset = (page - 1) * pageSize
      const userId = ctx.user.userId

      const posts = await ctx.prisma.post.findMany({
        where: { userId },
        select: {
          id: true,
          title: true,
          body: true,
          userId: true,
          createdAt: true,
          user: {
            select: {
              username: true,
              ppic: true,
            },
          },
          _count: {
            select: { Likes: true, Comment: true, Views: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: pageSize,
      })

      return posts
    }),
})
