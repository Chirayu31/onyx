import {
  addPost,
  deletePostById,
  getPostById,
  getPostsByTopicId,
} from '@/lib/validation/post'
import { protectedProcedure, router } from '../trpc'

export const postRouter = router({
  addPost: protectedProcedure
    .input(addPost)
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
        include: { Likes: true, Comment: true, Views: true },
      })

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
})
