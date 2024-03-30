'use client'
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
import { loginValidation } from '@/lib/validation/auth'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

interface FormData {
  email: string
  password: string
}

const Signin = () => {
  const login = trpc.auth.login.useMutation()
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

  const router = useRouter()

  const [unauthorizedError, setUnauthorizedError] = useState('')
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({})

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFormErrors({})
    setUnauthorizedError('')
    try {
      const validatedData = loginValidation.safeParse(formData)

      if (!validatedData.success) {
        const errors: Partial<FormData> = {}

        for (const [key, value] of Object.entries(
          validatedData.error.formErrors.fieldErrors
        )) {
          errors[key as keyof FormData] = value?.join(', ') ?? ''
        }

        setFormErrors(errors)

        return
      }

      const data = validatedData.data

      login.mutate(data, {
        onSuccess: () => {
          router.push('/topics')
        },
        onError: (error) => {
          setUnauthorizedError(error.message)
        },
      })
    } catch (error) {
      console.error('Error during signup:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Enter Unseen, Stay Secure</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <p className='text-red-500'>{unauthorizedError && unauthorizedError}</p>

        <div className='space-y-1'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Enter College e-mail address'
          />
          <p className='text-red-500'>{formErrors.email && formErrors.email}</p>
        </div>
        <div className='space-y-1'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            placeholder='Enter Secure Password'
          />
          <p className='text-red-500'>
            {formErrors.password && formErrors.password}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className='w-full'
          onClick={handleSubmit}
          disabled={login.isPending}>
          {login.isPending ? 'Logging in' : 'Sign in'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Signin
