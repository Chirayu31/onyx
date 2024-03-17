import { procedure, router } from '../trpc'
import * as argon2 from 'argon2'
import { sign } from 'jsonwebtoken'
import { TRPCError } from '@trpc/server'
import { cookies } from 'next/headers'
import { loginValidation, signupValidation } from '@/lib/validation/auth'

const JWT_SECRET = process.env.JWT_SECRET!

export const authRouter = router({
  signup: procedure.input(signupValidation).mutation(async ({ ctx, input }) => {
    const { username, email, password, course, year } = input

    const existingUser = await ctx.prisma.user.findUnique({
      where: { email: email },
    })

    if (existingUser) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Email already registered',
      })
    }

    const hashedPassword = await argon2.hash(password)

    const user = await ctx.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        course,
        year,
        ppic: '',
      },
    })

    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' })

    cookies().set({
      name: 'auth',
      value: token,
      maxAge: 24 * 60 * 60 * 30, // 30 days
      httpOnly: true, // Prevent client-side JavaScript access
      secure: process.env.NODE_ENV === 'production', // Set secure flag in production
      path: '/', // Set cookie path (adjust if needed)
    })

    return { user }
  }),
  login: procedure.input(loginValidation).mutation(async ({ ctx, input }) => {
    const { email, password } = input

    const user = await ctx.prisma.user.findUnique({
      where: { email: email },
    })

    if (!user) {
      return { error: 'Invalid email or password' }
    }

    const validPassword = await argon2.verify(user.password, password)

    if (!validPassword) {
      return { error: 'Invalid email or password' }
    }

    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' })

    cookies().set({
      name: 'auth',
      value: token,
      maxAge: 24 * 60 * 60 * 30, // 30 days
      httpOnly: true, // Prevent client-side JavaScript access
      secure: process.env.NODE_ENV === 'production', // Set secure flag in production
      path: '/', // Set cookie path (adjust if needed)
    })

    return { user }
  }),
})
