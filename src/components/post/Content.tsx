import Markdown from 'markdown-to-jsx'
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
        <article className='prose prose-neutral text-sx sm:text-sm md:text-base'>
          {truncatedContent}
        </article>
      ) : (
        <article className='prose prose-neutral text-base'>
          <Markdown>{body}</Markdown>
        </article>
      )}
    </>
  )
}

export default Content
