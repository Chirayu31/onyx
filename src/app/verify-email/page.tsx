'use client'
import React, { useState } from 'react'
import { trpc } from '@/utils/trpc'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

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
    <div className='bg-white rounded-lg shadow-md p-6 mx-10'>
      <h2 className='text-xl font-bold mb-4'>Verify Your Email</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className='text-red-500 mb-4'>{error}</p>}
        <div className='mb-4'>
          <Label htmlFor='verificationToken' className='mb-2'>
            Verification Token
          </Label>
          <Input
            type='text'
            id='verificationToken'
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder='Enter verification token'
          />
        </div>
        <div className='flex justify-end'>
          <Button type='submit' disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default VerificationTokenCard
