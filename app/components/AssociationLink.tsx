import { Tag } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { NoteAssociation } from '../types/appTypes'
import { getTextBeforeFirstSpace } from '../utils/helpers'
import AssociationIcon from './AssociationIcon'
import { useZafClient } from '../hooks/useZafClient'

const AssociationLink = ({association}: {association: NoteAssociation}) => {
  const client = useZafClient()

  const handleOpen = () => {
    client?.invoke('routeTo', association.object, association.id)
  }

  return (
    <Link href='#' onClick={handleOpen}>
      <Tag.Root size='sm' variant='outline' ml={1} maxW='100px' pr={0}>
        <Tag.StartElement>
          <AssociationIcon object={association.object} />
        </Tag.StartElement>
        <Tag.Label>
          {getTextBeforeFirstSpace(association.label)}
        </Tag.Label>
      </Tag.Root>
    </Link>
  )
}

export default AssociationLink