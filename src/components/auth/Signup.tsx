'use client'
import { ChangeEvent, MouseEventHandler, useState } from 'react'
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

const Signup = () => {
  const signup = trpc.auth.signup.useMutation()
  const [formData, setFormData] = useState({
    username: 'user@1010',
    email: '',
    password: '',
    course: '',
    year: 1,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    try {
      const validatedData = signupValidation.safeParse(formData)
      if (!validatedData.success) {
        return
      }

      const data = validatedData.data
      signup.mutate(data)
      setFormData({
        username: 'user@1010',
        email: '',
        password: '',
        course: '',
        year: 1,
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
          <div className={`space-y-1 `}>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              type='text'
              name='username'
              value={formData.username}
              disabled={true}
            />
          </div>
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
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p>{JSON.stringify(signup.data)}</p>
        <Button className='w-full' onClick={handleSubmit}>
          Register
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Signup
