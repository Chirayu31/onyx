import { postLikeInput } from '@/lib/validation/like'
import { protectedProcedure, router } from '../trpc'

export const likeRouter = router({
  likePost: protectedProcedure
    .input(postLikeInput)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.userId
      const { postId, isLiked } = input

      if (isLiked) {
        await ctx.prisma.postLikes.delete({ where: { id: postId } })
        return { liked: false }
      } else {
        await ctx.prisma.postLikes.create({
          data: { postId, userId },
        })
        return { liked: true }
      }
    }),
  isLiked: protectedProcedure
    .input(postLikeInput)
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.userId
      const { postId } = input

      const existingLike = await ctx.prisma.postLikes.findFirst({
        where: { postId, userId },
      })
      if (existingLike) {
        return { liked: true, id: existingLike.id }
      }
      return { liked: false }
    }),
})
