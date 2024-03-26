import { procedure, protectedProcedure, router } from '../trpc'
import * as argon2 from 'argon2'
import { sign } from 'jsonwebtoken'
import { TRPCError } from '@trpc/server'
import { cookies } from 'next/headers'
import { loginValidation, signupValidation } from '@/lib/validation/auth'

const JWT_SECRET = process.env.JWT_SECRET!

export const authRouter = router({
  signup: procedure.input(signupValidation).mutation(async ({ ctx, input }) => {
    const { email, password, course, year } = input

    const existingUser = await ctx.prisma.user.findUnique({
      where: { email: email },
    })

    if (existingUser) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Email already registered',
      })
    }

    const animalResponse = await fetch(
      'https://random-word-form.herokuapp.com/random/animal'
    )
    const animalData = await animalResponse.json()
    const animal = animalData[0].toLowerCase()

    const randomNumber = Math.floor(Math.random() * 1000)
    const username = `${animal}${randomNumber}`

    const category = [
      'adventurer',
      'adventurer-neutral',
      'avataaars',
      'avataaars-neutral',
      'big-ears',
      'big-ears-neutral',
      'big-smile',
      'bottts',
      'croodles',
      'fun-emoji',
      'lorelei',
      'lorelei-neutral',
      'micah',
      'miniavs',
      'notionists',
      'open-peeps',
      'personas',
      'pixel-art',
    ]

    const ppic = `https://api.dicebear.com/8.x/${category[0]}/svg?seed=${username}`

    const hashedPassword = await argon2.hash(password)

    const user = await ctx.prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        course,
        year,
        ppic: ppic,
      },
    })

    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' })
    user.password = ''
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
      select: { username: true, password: true, id: true },
    })

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password',
      })
    }

    const validPassword = await argon2.verify(user.password, password)

    if (!validPassword) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Invalid email or password',
      })
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
  profile: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.userId

    const user = await ctx.prisma.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        ppic: true,
        course: true,
        year: true,
      },
    })

    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'User ID Not Found' })
    }

    return user
  }),
})
