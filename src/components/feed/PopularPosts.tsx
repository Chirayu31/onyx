import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import PopularPostsItem from './PopularPostsItem'

const PopularPosts = () => {
  return (
    <Card className=' md:w-[300px] lg:w-[450px] h-fit'>
      <CardHeader>
        <h3 className='text-base md:text-lg font-bold'>Popular Posts</h3>
      </CardHeader>
      <CardContent>
        <PopularPostsItem />
        <PopularPostsItem />
        <PopularPostsItem />
      </CardContent>
    </Card>
  )
}

export default PopularPosts
