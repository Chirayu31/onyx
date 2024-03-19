import { z } from 'zod'

export const checkLikeInput = z.object({ postId: z.string() })
export const postLikeInput = z.object({
  postId: z.string(),
})
