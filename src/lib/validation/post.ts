import { z } from 'zod'

export const addPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  topicId: z.string().min(1, 'Topic is required'),
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

export const getPostsByUserId = z.object({
  page: z.number(),
  pageSize: z.number(),
})
