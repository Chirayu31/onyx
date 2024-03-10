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

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    course: '',
    year: '',
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
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
          <div className='space-y-1'>
            <Label htmlFor='username'>Username</Label>
            <Input
              id='username'
              type='text'
              name='username'
              value={`userABCSS@`}
              disabled={true}
              onChange={handleInputChange}
            />
          </div>
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
          </div>
          <div className='space-y-1'>
            <Label htmlFor='course'>Course of Study</Label>
            <Input
              id='course'
              type='text'
              name='course'
              value={formData.course}
              onChange={handleInputChange}
              placeholder='Enter Course of Study'
            />
          </div>
          <div className='space-y-1'>
            <Label htmlFor='year'>Year of Study</Label>
            <Input
              id='year'
              type='number'
              name='year'
              value={formData.year}
              onChange={handleInputChange}
              min={1}
              max={5}
              placeholder='Enter Year of Study'
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full' onClick={handleSubmit}>
          Register
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Signup
