import { router } from '../trpc'
import { authRouter } from './auth'
import { topicsRouter } from './topics'

export const appRouter = router({
  auth: authRouter,
  topics: topicsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
