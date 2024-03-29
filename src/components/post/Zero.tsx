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

  return <p className='text-center mt-10 text-xl font-semibold'>{message}</p>
}

export default Zero
