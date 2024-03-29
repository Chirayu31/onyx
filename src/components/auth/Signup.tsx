'use client'
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { trpc } from '@/utils/trpc'
import { signupValidation } from '@/lib/validation/auth'
import { useRouter } from 'next/navigation'
import { TRPCError } from '@trpc/server'

interface FormData {
  username: string
  email: string
  password: string
  course: string
  year: number
}

const Signup = () => {
  const signup = trpc.auth.signup.useMutation()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    course: '',
    year: 1,
  })

  const [formErrors, setFormErrors] = useState<Partial<FormData>>({})
  const [error, setError] = useState('')

  const router = useRouter()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'year' ? parseInt(value, 10) : value,
    }))
    setFormErrors({})
    setError('')
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const validatedData = signupValidation.safeParse(formData)

      if (!validatedData.success) {
        const errors = validatedData.error.issues.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message
          return acc
        }, {} as { [key: string]: string })

        setFormErrors(errors)
        return
      }

      const data = validatedData.data
      signup.mutate(data, {
        onSuccess: () => {
          router.push('/verify-email')
        },
        onError: (error) => {
          setError(error.message)
        },
      })
    } catch (error) {
      console.error('Error during signup:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Join the Campus Connection Anonymously!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          {error && <p className='text-red-500'>{error}</p>}
          <div className={`space-y-1`}>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Enter College e-mail address'
            />
            {formErrors.email && (
              <p className='text-red-500 text-sm mt-1'>{formErrors.email}</p>
            )}
          </div>
          <div className={`space-y-1 `}>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Enter your password'
            />
            {formErrors.password && (
              <p className='text-red-500 text-sm mt-1'>{formErrors.password}</p>
            )}
          </div>
          <div className={`space-y-1 `}>
            <Label htmlFor='course'>Course</Label>
            <Input
              id='course'
              type='text'
              name='course'
              value={formData.course}
              onChange={handleInputChange}
              placeholder='Enter your course'
            />
            {formErrors.course && (
              <p className='text-red-500 text-sm mt-1'>{formErrors.course}</p>
            )}
          </div>
          <div className={`space-y-1 `}>
            <Label htmlFor='year'>Year</Label>
            <Input
              id='year'
              type='number'
              name='year'
              value={formData.year}
              onChange={handleInputChange}
              placeholder='Enter your year of study'
            />
            {formErrors.year && (
              <p className='text-red-500 text-sm mt-1'>{formErrors.year}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p>{JSON.stringify(signup.data)}</p>
        <Button
          className='w-full'
          onClick={handleSubmit}
          disabled={signup.isPending}>
          {signup.isPending ? 'Registering' : 'Register'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Signup
