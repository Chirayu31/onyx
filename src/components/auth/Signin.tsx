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
import { ChangeEvent, FormEvent, useState } from 'react'
interface FormData {
  email: string
  password: string
}

const Signin = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Perform form submission logic here
    // You can access form data via formData object
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Enter Unseen, Stay Secure</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
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
      </CardContent>
      <CardFooter>
        <Button className='w-full' onClick={handleSubmit}>
          Sign in
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Signin
