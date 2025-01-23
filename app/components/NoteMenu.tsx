'use client'
import React, { PropsWithChildren, useState } from 'react'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from '@/components/ui/menu'

import { RiArrowUpLine, RiMore2Fill, RiArrowDownLine, RiDeleteBin2Line, RiPaletteLine } from 'react-icons/ri'
import { Box, ColorSwatch, For, IconButton, MenuSelectionDetails } from '@chakra-ui/react'
import { useNotes } from '../hooks/useNotes'
import { Note, NoteColor } from '../types/appTypes'
import ConfirmDialog from './ConfirmDialog'
import { COLOR_OPTIONS } from '../utils/constants'

const NoteMenu = (props: {note: Note}) => {
  const {isFirst, isLast, id} = props.note
  const {updateNoteOrder, removeNote, updateNote} = useNotes()
  const [confirmOpen, setConfirmOpen] = useState(false)
  
  const handleConfirmDelete = () => setConfirmOpen(true)

  const handleRemove = () => removeNote(id)

  const handleSelectColor = (select: MenuSelectionDetails) => {
    const color = select.value as NoteColor
    return updateNote(id, {color})
  }

  return (
    <MenuRoot positioning={{ placement: 'bottom-end' }} >
      <MenuTrigger asChild _active={{bg: 'transparent'}}>
        <IconButton size='xs' variant='ghost' bg='transparent' >
          <RiMore2Fill />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value='move-up' onClick={() => updateNoteOrder(id, 'up')} disabled={isFirst}>
          <RiArrowUpLine />
          <Box>Move Up</Box>
        </MenuItem>
        <MenuItem value='move-down' onClick={() => updateNoteOrder(id, 'down')} disabled={isLast}>
          <RiArrowDownLine />
          <Box>Move Down</Box>
        </MenuItem>

        <MenuRoot positioning={{ placement: 'right-start', gutter: 2 }} onSelect={handleSelectColor}>
          <MenuTriggerItem value='color'>
            <RiPaletteLine />
            <Box flex='1'>Color</Box>
          </MenuTriggerItem>
          <MenuContent>
            <For each={Object.keys(COLOR_OPTIONS) as NoteColor[]}>
              {(color: NoteColor) => (
                <MenuItem value={color} key={color}>
                  <ColorSwatch value={COLOR_OPTIONS[color]} size='xs'/>
                  {color}
                </MenuItem>
              )}
            </For>
          </MenuContent>
        </MenuRoot>

        <MenuItem value='delete' onClick={handleConfirmDelete}>
          <RiDeleteBin2Line />
          <Box>Delete</Box>
        </MenuItem>
      </MenuContent>
      <ConfirmDialog isOpen={confirmOpen} title='Delete note?' onClose={() => setConfirmOpen(false)} onConfirm={handleRemove}/>
    </MenuRoot>
  )
}

export default NoteMenu