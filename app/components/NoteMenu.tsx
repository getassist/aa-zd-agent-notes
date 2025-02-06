'use client'
import React, { useState } from 'react'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu'
import { RiArrowUpLine, RiMore2Fill, RiArrowDownLine, RiDeleteBin2Line, RiPushpin2Line } from 'react-icons/ri'
import { Box, IconButton, MenuSelectionDetails } from '@chakra-ui/react'
import { useNotes } from '../hooks/useNotes'
import { Note, NoteAssociation, NoteColor } from '../types/appTypes'
import ConfirmDialog from './ConfirmDialog'
import AssociationMenu from './AssociationMenu'
import ColorMenu from './ColorMenu'
import { useLocation } from '../hooks/useLocation'
import PinMenu from './PinMenu'

const NoteMenu = ({note}: {note: Note}) => {
  const {isFirst, isLast, id} = note
  const {updateNoteOrder, removeNote, updateNote, updateAssociations} = useNotes()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const {location, object, objectId, objectLabel} = useLocation()
  
  const handleConfirmDelete = () => setConfirmOpen(true)

  const handleRemove = () => removeNote(id)

  const handleSelectColor = (select: MenuSelectionDetails) => {
    const color = select.value as NoteColor
    return updateNote(id, {color})
  }

  const handleAddAssociation = () => {
    if (object && objectId && objectLabel) {
      const newAssociation: NoteAssociation = {
        object,
        id: objectId,
        label: objectLabel,
      }

      return updateAssociations(id, newAssociation, 'add')
    }
  }

  const handleRemoveAssociation = (value: string) => {
    const objectId = value.split('-')[1]

    if (note.associations) {
      const oldAssociation = note.associations.find((x) => x.id === Number(objectId))
      if (oldAssociation) return updateAssociations(id, oldAssociation, 'remove')
    }  
  }

  const handleSelectAssociation = (select: MenuSelectionDetails) => {
    if (select.value === 'new') return handleAddAssociation()
    return handleRemoveAssociation(select.value)
  }

  const handleMenuSelect = (details: MenuSelectionDetails) => {
    const {value} = details
    
    if (value === 'pin') updateNote(id, {pinned: true})
    if (value === 'unpin') updateNote(id, {pinned: false})
  }

  return (
    <MenuRoot positioning={{ placement: 'bottom-end' }} onSelect={handleMenuSelect}>
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

        <ColorMenu handleSelect={handleSelectColor} />

        <AssociationMenu associations={note.associations} handleSelect={handleSelectAssociation} />

        <PinMenu pinned={!!note.pinned} />

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