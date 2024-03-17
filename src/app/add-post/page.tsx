import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const AddPost = () => {
  return (
    <main className='flex mt-20 h-fit justify-center'>
      <Card className='w-full max-w-[600px] mx-5 md:mx-10'>
        <CardHeader>
          <CardTitle>Add a new Post</CardTitle>
        </CardHeader>
        <CardContent className='space-y-2'>
          <div className='space-y-1'>
            <Label htmlFor='email'>Title</Label>
            <Input
              id='title'
              type='text'
              name='title'
              placeholder='Add Post Title'
            />
          </div>

          <div className='space-y-1'>
            <Label htmlFor='email'>Description</Label>
            <Textarea
              id='description'
              name='description'
              placeholder='Add Post Description'
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Post</Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export default AddPost
