import prisma from '@/lib/prisma'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export async function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  return {
    req,
    resHeaders,
    prisma,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
