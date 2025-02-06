import { Flex, Icon, IconButton, Show, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { Note, NoteAssociation } from '../types/appTypes'
import AssociationLink from './AssociationLink'
import { RiPushpin2Fill } from 'react-icons/ri'

const LINKS_LIMIT = 3

const NoteFooter = ({note}: {note: Note}) => {

  const calculateExtraAssociations = () => {
    if (note.associations && note.associations.length > LINKS_LIMIT) return note.associations.length - LINKS_LIMIT
    return 0
  }

  const AssociationExtraCount = () => {
    if (calculateExtraAssociations() > 0) {
      return (
        <Text fontSize='xs' pl={2}>+ {calculateExtraAssociations()}</Text>
      )
    }
    return null
  }

  return (
    <Flex justifyItems='end' pl={4} pr={4} opacity='0.4'>
      <Show when={note.pinned}>
        <Text fontSize='sm'><RiPushpin2Fill /></Text>
      </Show>
      
      <Spacer />

      {note.associations?.slice(0,LINKS_LIMIT).map((association: NoteAssociation) => (
        <AssociationLink association={association} key={association.id} />
      ))}

      <AssociationExtraCount />
    </Flex>
  )
}

export default NoteFooter