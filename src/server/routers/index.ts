import { router } from '../trpc'
import { authRouter } from './auth'
import { likeRouter } from './like'
import { postRouter } from './post'
import { topicsRouter } from './topics'

export const appRouter = router({
  auth: authRouter,
  topics: topicsRouter,
  post: postRouter,
  like: likeRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
