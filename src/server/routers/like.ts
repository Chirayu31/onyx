import { checkLikeInput, postLikeInput } from '@/lib/validation/like'
import { protectedProcedure, router } from '../trpc'

export const likeRouter = router({
  likePost: protectedProcedure
    .input(postLikeInput)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.userId
      const { postId } = input

      const existingLike = await ctx.prisma.postLikes.findFirst({
        where: { postId, userId },
      })

      if (existingLike) {
        await ctx.prisma.postLikes.delete({ where: { id: existingLike.id } })
        return { liked: false }
      } else {
        await ctx.prisma.postLikes.create({
          data: { postId, userId },
        })
        return { liked: true }
      }
    }),
  isLiked: protectedProcedure
    .input(checkLikeInput)
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.userId
      const { postId } = input

      const existingLike = await ctx.prisma.postLikes.findFirst({
        where: { postId, userId },
      })
      if (existingLike) {
        return { liked: true }
      }
      return { liked: false }
    }),
})
