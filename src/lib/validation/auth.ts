import { z } from 'zod'

export const signupValidation = z.object({
  username: z.string().min(4, 'Username must be at least 4 characters long'),
  email: z
    .string()
    .email('Invalid email format')
    .endsWith('.ies@ipsacademy.org', 'Email must be of IPS Academy'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  course: z.string(),
  year: z.number(),
})

export const loginValidation = z.object({
  email: z.string().email(),
  password: z.string(),
})
