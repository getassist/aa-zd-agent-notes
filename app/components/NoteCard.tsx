import React, { useEffect } from 'react'
import { Note } from '@/app/types/appTypes'
import { Box, Collapsible, IconButton, Text, AbsoluteCenter, Show } from '@chakra-ui/react'
import { RiArrowDownWideLine, RiArrowUpWideLine } from 'react-icons/ri'
import { ClipboardRoot, ClipboardIconButton} from '@/components/ui/clipboard'
import 'quill/dist/quill.snow.css'
import { useNotes } from '@/app/hooks/useNotes'
import NoteMenu from './NoteMenu'
import { BLANK_EDITOR_CONTENT, COLOR_OPTIONS, DEFAULT_COLOR } from '../utils/constants'
import useEditor from '../hooks/useEditor'
import { getTextBeforeFirstNewline } from '../utils/helpers'

const NoteCard = (props: {note: Note}) => {
  const {updateNote} = useNotes()
  const {id, title, content, open, color} = props.note

  const {quill, quillRef, isEditing} = useEditor({toolbar: false})

  useEffect(() => {
    if (content && content !== BLANK_EDITOR_CONTENT) {
      quill?.clipboard.dangerouslyPasteHTML(content)
      quill?.blur()
    } else {
      quill?.focus()
      quill?.format('bold', true)
    }
  }, [content, quill])

  useEffect(() => {
    if (!quill) return

    if (!isEditing) {
      const textContent = quill.getText()
      const updatedContent = quill.getSemanticHTML()
      const updatedTitle = getTextBeforeFirstNewline(textContent)

      // skip update if empty note
      if (textContent.length === 1) return 

      // update if changes found
      if (updatedContent !== content) {
        updateNote(id, {content: updatedContent, title: updatedTitle})
      }
    }
  }, [isEditing, quill, content, id, updateNote])

  const handleShow = () => {updateNote(id, {open: !open})}

  return (
      <Box bg={COLOR_OPTIONS[color || DEFAULT_COLOR]} >
        <Collapsible.Root open={open} onOpenChange={handleShow} paddingTop={2} paddingBottom={2}>

          <Box position={'relative'}>
            <AbsoluteCenter axis="vertical">
              <Show when={open}>
                  <NoteMenu note={props.note} />
              </Show>
            </AbsoluteCenter>
            
            <Collapsible.Trigger>
              <AbsoluteCenter axis="vertical">
                <Text textStyle={'sm'} truncate marginLeft={3} cursor='pointer' maxW='250px'>{open ? '' : title}</Text>
              </AbsoluteCenter>
            </Collapsible.Trigger>

            <AbsoluteCenter axis="vertical" insetEnd="0">
              
              <ClipboardRoot value={content}>
                <ClipboardIconButton variant='ghost' bg='transparent'  />
              </ClipboardRoot>

              <IconButton size='sm' onClick={handleShow} variant='ghost' bg='transparent' >
                {open ? <RiArrowUpWideLine /> : <RiArrowDownWideLine />}
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