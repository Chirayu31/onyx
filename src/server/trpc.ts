import { TRPCError, initTRPC } from '@trpc/server'
import { Context } from './context'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

const t = initTRPC.context<Context>().create()

const isAuthorized = t.middleware(async ({ ctx, next }) => {
  const token = cookies().get('auth')?.value
  if (!token) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  const userVerified = verify(token, JWT_SECRET) as { userId: string }

  return next({
    ctx: { ...ctx, user: userVerified },
  })
})

// Base router and procedure helpers
export const router = t.router
export const procedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthorized)
