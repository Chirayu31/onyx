import React from 'react'

interface ContentProps {
  body: string
  isFeed: boolean
}

const Content: React.FC<ContentProps> = ({ body, isFeed }) => {
  const truncatedContent =
    body.length > 200 ? body.substr(0, 200) + '...' : body

  return (
    <>
      {isFeed ? (
        <p className='text-sx sm:text-sm md:text-base'>{truncatedContent}</p>
      ) : (
        <p className='text-base'>{body}</p>
      )}
    </>
  )
}

export default Content
