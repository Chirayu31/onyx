import { z } from 'zod'

export const signupValidation = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .endsWith('.ies@ipsacademy.org', 'Email must be of IPS Academy'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  course: z.string().min(1, 'Course cannot be empty'),
  year: z.number().min(1, 'Year cannot be empty'),
})

export const loginValidation = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .endsWith('.ies@ipsacademy.org', 'Email must be of IPS Academy'),
  password: z.string().min(1, 'Password cannot be empty'),
})
