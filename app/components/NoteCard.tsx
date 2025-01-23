import React, { useEffect, useState } from 'react'
import { Note } from '@/app/types/appTypes'
import { Box, Collapsible, IconButton, Text, AbsoluteCenter, Show } from '@chakra-ui/react'
import { RiArrowDownWideLine, RiArrowUpWideLine } from 'react-icons/ri'
import { ClipboardRoot, ClipboardIconButton} from '@/components/ui/clipboard'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import { getTextBeforeFirstNewline } from '@/app/utils/helpers'
import { useNotes } from '@/app/hooks/useNotes'
import NoteMenu from './NoteMenu'
import { COLOR_OPTIONS, DEFAULT_COLOR } from '../utils/constants'

const NoteCard = (props: {note: Note}) => {
  const {updateNote} = useNotes()
  const {id, title, content, open, color} = props.note
  const [newContent, setNewContent] = useState(content)
  const [newTitle, setNewTitle] = useState(title)
  const [isOpen, setIsOpen] = useState(open || false)
  const [isEditing, setIsEditing] = useState(false)

  const {quill, quillRef} = useQuill({
    modules: {
      toolbar: false,
    }
  })

  useEffect(() => {
    if (quill){
      quill.on('text-change', () => {
        setNewTitle(getTextBeforeFirstNewline(quill.getText()))
        setNewContent(quill.getSemanticHTML())
      })
  
      quill.on('selection-change', (range) => {
        if (range) return setIsEditing(true)
        return setIsEditing(false)
      })
    }

    // cleanup
    return () => {
      quill?.off('text-change')
      quill?.off('selection-change')
    }
  }, [quill])

  useEffect(() => {
    if (content) {
      quill?.clipboard.dangerouslyPasteHTML(content)
      quill?.blur()
    } else {
      quill?.focus()
      quill?.format('bold', true)
      setIsEditing(true)
    }
  }, [content, quill])

  useEffect(() => {
    const timer = setTimeout(() => quill?.blur(),3000)
    return () => clearTimeout(timer)
  }, [newContent, quill])

  useEffect(() => {
    if (!isEditing) {
      if (content !== newContent) {
        updateNote(id, {content: newContent, title: newTitle})
      }
    }
  }, [isEditing, id, content, newContent, newTitle, updateNote])

  const handleShow = () => {
    updateNote(id, {open: !isOpen})
    setIsOpen(!isOpen)
  }

  return (
      <Box bg={COLOR_OPTIONS[color || DEFAULT_COLOR]} >
        <Collapsible.Root open={isOpen} onOpenChange={handleShow} paddingTop={2} paddingBottom={2}>

          <Box position={'relative'}>
            <AbsoluteCenter axis="vertical">
              <Show when={isOpen}>
                  <NoteMenu note={props.note} />
              </Show>
            </AbsoluteCenter>
            
            <Collapsible.Trigger>
              <AbsoluteCenter axis="vertical">
                <Text textStyle={'sm'} truncate marginLeft={3} cursor='pointer' maxW='250px'>{isOpen ? '' : title}</Text>
              </AbsoluteCenter>
            </Collapsible.Trigger>

            <AbsoluteCenter axis="vertical" insetEnd="0">
              
              <ClipboardRoot value={newContent}>
                <ClipboardIconButton variant='ghost' bg='transparent'  />
              </ClipboardRoot>

              <IconButton size='sm' onClick={handleShow} variant='ghost' bg='transparent' >
                {isOpen ? <RiArrowUpWideLine /> : <RiArrowDownWideLine />}
              </IconButton>
            </AbsoluteCenter>
          </Box>

          <Collapsible.Content>
            <div ref={quillRef} />
          </Collapsible.Content>
        </Collapsible.Root>

      </Box>
  )
}

export default NoteCard