import React, { ChangeEventHandler, useState } from 'react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import Markdown from 'markdown-to-jsx'

interface MarkdownEditorProps {
  value: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
}) => {
  const [previewMode, setPreviewMode] = useState(false)

  const handleTogglePreview = () => {
    setPreviewMode(!previewMode)
  }

  return (
    <div>
      {previewMode ? (
        <div className='border rounded-md p-2'>
          <article className='prose prose-neutral'>
            <Markdown>{value}</Markdown>
          </article>
        </div>
      ) : (
        <Textarea
          id='description'
          name='description'
          placeholder='Add Post Description'
          value={value}
          onChange={onChange}
          rows={8}
        />
      )}
      <div className={`flex justify-end mt-2`}>
        <Button onClick={handleTogglePreview}>
          {previewMode ? 'Edit' : 'Preview'}
        </Button>
      </div>
    </div>
  )
}
