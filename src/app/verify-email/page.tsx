'use client'
import React, { useState } from 'react'
import { trpc } from '@/utils/trpc'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const VerificationTokenCard = () => {
  const { mutate: verifyEmail } = trpc.auth.verifyEmail.useMutation()

  const [token, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      verifyEmail(
        { token },
        {
          onSuccess: () => {
            router.push('/topics')
          },
          onError: (error) => {
            setError(error.message)
          },
        }
      )
    } catch (error) {
      console.error('Error verifying email:', error)
      setError('An unexpected error occurred! Try again later')
    }
    setIsLoading(false)
  }

  return (
    <div className='flex justify-center mt-10'>
      <Card className='w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] h-fit'>
        <CardHeader>
          <h2 className='font-semibold'>Verify Your Email</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && <p className='text-red-500 mb-4'>{error}</p>}
            <div className='mb-4'>
              <Label htmlFor='verificationToken' className='mb-6'>
                Verification Token
              </Label>
              <Input
                type='text'
                id='verificationToken'
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder='Enter verification token'
                autoComplete='off'
              />
            </div>
            <div className='flex justify-end'>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default VerificationTokenCard
