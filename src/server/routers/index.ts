import { router } from '../trpc'
import { authRouter } from './auth'
import { postRouter } from './post'
import { topicsRouter } from './topics'

export const appRouter = router({
  auth: authRouter,
  topics: topicsRouter,
  post: postRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
