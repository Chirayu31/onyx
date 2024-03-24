'use client'
import { MarkdownEditor } from '@/components/add-post/MarkdownEditor'
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
import { addPostSchema } from '@/lib/validation/post'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/navigation'
import React, { MouseEventHandler, useState } from 'react'

const AddPost = () => {
  const topics = trpc.topics.getAllTopicsAndSubtopics.useQuery()
  const addPost = trpc.post.addPost.useMutation()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    topicId: '',
  })

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()
    setErrors({
      title: '',
      description: '',
      topicId: '',
    })

    const formData = {
      title,
      description,
      topicId: selectedTopicId,
    }

    const result = await addPostSchema.safeParseAsync(formData)

    if (!result.success) {
      const validationErrors = result.error.formErrors.fieldErrors
      setErrors({
        title: validationErrors.title ? validationErrors.title[0] : '',
        description: validationErrors.description
          ? validationErrors.description[0]
          : '',
        topicId: validationErrors.topicId ? 'Topic is Required' : '',
      })
      return
    }

    setIsSubmitting(true)

    try {
      addPost.mutate(
        {
          title,
          description,
          topicId: selectedTopicId!,
        },
        {
          onSuccess: (response) => {
            setIsSubmitting(false)
            router.push(`/feed/${selectedTopicId}`)
          },
        }
      )
    } catch (error) {
      console.error('Error adding post:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <main className='flex mt-10 mb-5 h-fit justify-center'>
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
            {errors.title && (
              <span className='text-red-500'>{errors.title}</span>
            )}
          </div>

          <div className='space-y-1'>
            <Label htmlFor='email'>Description</Label>
            <MarkdownEditor
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <span className='text-red-500'>{errors.description}</span>
            )}
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
            {errors.topicId && (
              <span className='text-red-500'>{errors.topicId}</span>
            )}
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
