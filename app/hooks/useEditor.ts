'use client'
import { useCallback, useEffect, useState } from 'react'
import { useQuill } from 'react-quilljs'
import { EditorProps, EditorType, SelectionChange, TextChange } from '../types/editorTypes'
import { REGEX_URL } from '../utils/constants'

const useEditor = (props: EditorProps): EditorType => {
  const [isEditing, setIsEditing] = useState(false)

  const {quill, quillRef} = useQuill({
    modules: {
      toolbar: false,
    }
  })

  const formatLinks = useCallback(() => {
    const content = quill?.getText()

    if (!content) return

    let match
    while((match = REGEX_URL.exec(content)) !== null) {
      const url = match[0]
      const index = match.index

      const formats = quill?.getFormat(index, url.length)
      if (formats && !formats.link) {
        quill?.formatText(index, url.length, 'link', url, 'api')
      }
    }
  }, [quill])

  const handleTextChange: TextChange = useCallback((delta, oldContent, source) => {
    if (props.onTextChange) props.onTextChange(delta, oldContent, source)

    formatLinks()
    if (!isEditing) setIsEditing(true)
  }, [props, formatLinks, isEditing])

  const handleSelectionChange: SelectionChange = useCallback((range, oldRange, source) => {
    if (props.onSelectionChange) props.onSelectionChange(range, oldRange, source)

    if (range) return setIsEditing(true)
    return setIsEditing(false)
  }, [props])

  const handleMouseLeave = useCallback(() => {
    quill?.blur()
  }, [quill])

  const handleClick = useCallback((e: Event) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'A') {
      const href = target.getAttribute('href')
      if (href) window.open(href, '_blank')
    }
  }, [])


  useEffect(() => {
    if (quill){
      quill.on('text-change', handleTextChange)
      quill.on('selection-change', handleSelectionChange)
      quill.root.addEventListener('click', handleClick)
      quill.root.addEventListener('mouseleave', handleMouseLeave)
    }

    // cleanup
    return () => {
      quill?.off('text-change')
      quill?.off('selection-change')
      quill?.root.removeEventListener('click', () => {})
      quill?.root.removeEventListener('mouseleave', () => {})
    }
  }, [quill, handleTextChange, handleSelectionChange, handleMouseLeave, handleClick])

  return {
    quill,
    quillRef,
    isEditing,
  }
}

export default useEditor