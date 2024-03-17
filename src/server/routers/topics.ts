import { protectedProcedure, router } from '../trpc'

export const topicsRouter = router({
  getAllTopicsAndSubtopics: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.topics.findMany({
      include: { subtopics: true },
    })

    return data
  }),
})
