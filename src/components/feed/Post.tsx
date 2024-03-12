import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { EyeOpenIcon, HeartIcon } from '@radix-ui/react-icons'
import React from 'react'
import { BiComment } from 'react-icons/bi'

const Post = () => {
  const postContent = `I’ve noticed a big trend amongst my social circle where my liberal
              friends (I live in the Bay Area) are significantly less tolerant
              than my conservative friends. My liberal friends tend to spend a
              lot of time bashing red states (always about roe vs wade, guns ....`

  const truncatedContent =
    postContent.length > 200 ? postContent.substr(0, 200) + '...' : postContent
  return (
    <Card className='w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-fit cursor-pointer'>
      <CardHeader>
        <div className='flex items-center gap-2'>
          <img
            src='https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=640&crop=smart&auto=webp&s=22ed6cc79cba3013b84967f32726d087e539b699'
            className='w-10 h-10 rounded-full'
          />

          <p className='font-semibold text-zinc-500 text-base'>User956</p>
          <p className='text-sm text-zinc-400'>12h ago</p>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className='font-bold text-base lg:text-lg'>
          My conservative friends are more tolerant than my liberal friends
        </h2>
        <p className='text-sx sm:text-sm md:text-base'>{truncatedContent}</p>
      </CardContent>
      <CardFooter>
        <div className='flex gap-2'>
          <Button variant={'secondary'} className='py-0 px-4 rounded-full'>
            <HeartIcon className='mx-2' />
            {`51`}
          </Button>
          <Button variant={'secondary'} className='py-0 px-4 rounded-full'>
            <BiComment className='mx-2' />
            {`51`}
          </Button>
          <Button variant={'secondary'} className='py-0 px-4 rounded-full'>
            <EyeOpenIcon className='mx-2' />
            {`510`}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Post
