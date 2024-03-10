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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Join the Campus Connection Anonymously!
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='space-y-1'>
          <Label htmlFor='password'>Username</Label>
          <Input id='username' type='text' value='user16578' disabled />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            placeholder='Enter College e-mail address'
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            placeholder='Enter Secure Password'
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='password'>Course of Study</Label>
          <Input id='course' type='text' placeholder='Enter Course of Study' />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='password'>Year of Study</Label>
          <Input
            id='year'
            type='number'
            min={1}
            max={5}
            placeholder='Enter Year of Study'
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Register</Button>
      </CardFooter>
    </Card>
  )
}

export default Signup
