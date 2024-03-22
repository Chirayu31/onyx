import { z } from 'zod'

export const addPost = z.object({
  title: z.string(),
  description: z.string(),
  topicId: z.string(),
})

export const getPostById = z.object({
  id: z.string(),
})

export const deletePostById = z.object({
  id: z.string(),
})

export const getPostsByTopicId = z.object({
  topicId: z.string(),
  page: z.number(),
  pageSize: z.number(),
})
