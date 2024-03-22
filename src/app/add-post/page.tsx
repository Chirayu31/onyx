'use client'
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { trpc } from '@/utils/trpc'
import React, { MouseEventHandler, useState } from 'react'

const AddPost = () => {
  const topics = trpc.topics.getAllTopicsAndSubtopics.useQuery()
  const addPost = trpc.post.addPost.useMutation()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()

    if (!title || !description || !selectedTopicId) {
      console.log(title, description, selectedTopicId)
      alert('Please fill in all required fields!')
      return
    }

    setIsSubmitting(true)

    try {
      const response = addPost.mutate({
        title,
        description,
        topicId: selectedTopicId,
      })

      console.log('Post added successfully:', response)
    } catch (error) {
      console.error('Error adding post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className='space-y-1'>
            <Label htmlFor='email'>Description</Label>
            <Textarea
              id='description'
              name='description'
              placeholder='Add Post Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className='space-y-1'>
            <Label htmlFor='topics'>Select Topic</Label>

            <Select
              onValueChange={(value: string) => {
                setSelectedTopicId(value)
              }}>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Select a topic' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {topics.data &&
                    topics.data.map((topic) => (
                      <>
                        <SelectLabel>{topic.title}</SelectLabel>
                        {topic.subtopics.map((subtopic) => (
                          <SelectItem key={subtopic.id} value={subtopic.id}>
                            {subtopic.title}
                          </SelectItem>
                        ))}
                      </>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting ? 'Submitting...' : 'Post'}
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}

export default AddPost
