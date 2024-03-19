import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import LikesButton from './LikesButton'
import { Card, CardContent, CardHeader } from '../ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog'
import Content from './Content'

const Comment = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-col'>
        <div className='flex flex-row justify-center gap-2'>
          <img
            src='https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=640&crop=smart&auto=webp&s=22ed6cc79cba3013b84967f32726d087e539b699'
            className='w-10 h-10 rounded-full'
          />
          <Card className='w-full border-2 max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-fit cursor-pointer'>
            <CardHeader>
              <div className='flex items-center gap-2'>
                <p className='font-semibold text-zinc-500 text-base'>User956</p>
                <p className='text-sm text-zinc-400'>12h ago</p>
              </div>
            </CardHeader>
            <CardContent>{/* <Content /> */}</CardContent>
          </Card>
        </div>

        <div className=' flex gap-2 ml-10  py-2  max-w-auto '>
          {/* <LikesButton /> */}
          <Dialog>
            <DialogTrigger>Reply</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <h2 className='font-sans flex justify-center text-base lg:text-lg'>
                  Add your comment
                </h2>
                <div className='flex w-full py-2 max-w-auto items-center space-x-2'>
                  <Input type='email' placeholder='Add a comment' />
                  <Button type='submit'>Submit</Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

export default Comment
