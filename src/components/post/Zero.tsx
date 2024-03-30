import React from 'react'

interface ZeroProps {
  type: 'feed' | 'userProfile'
}

const Zero: React.FC<ZeroProps> = ({ type }) => {
  let message = ''

  switch (type) {
    case 'feed':
      message = 'There are no posts yet!'
      break
    case 'userProfile':
      message = 'User has no posts yet.'
      break
    default:
      message = 'No data available.'
  }

  if (type === 'userProfile')
    return <p className='text-xl text-center font-semibold'>{message}</p>

  return (
    <div className='flex items-center justify-center min-h-screen -mt-20'>
      <p className='text-xl font-semibold'>{message}</p>
    </div>
  )
}

export default Zero
