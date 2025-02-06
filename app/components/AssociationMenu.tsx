import React from 'react'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTriggerItem,
} from '@/components/ui/menu'
import { RiLink, RiLinkUnlinkM } from 'react-icons/ri'
import { Box, For, MenuSelectionDetails, Separator, Text } from '@chakra-ui/react'
import {  NoteAssociation } from '../types/appTypes'
import AssociationIcon from './AssociationIcon'
import { useLocation } from '../hooks/useLocation'

type AssociationMenuProps = {
  associations: NoteAssociation[] | undefined,
  handleSelect: (details: MenuSelectionDetails) => void,
}

const AssociationMenu = (props: AssociationMenuProps) => {
  const {associations, handleSelect} = props
  const {object, objectId} = useLocation()

  const isAssociated = (): boolean => {
    const found = associations?.find((x) => {
      if (x.object === object && x.id === objectId) return x
    })

    if (found) return true
    return false
  }

  if (!object && !associations) return null // hide in top bar

  return (
    <MenuRoot positioning={{ placement: 'right-start', gutter: 2 }} onSelect={handleSelect}>
      <MenuTriggerItem value='association'>
        <RiLink />
        <Box flex='1'>Links</Box>
      </MenuTriggerItem>
      <MenuContent>
        {object && (
          <MenuItem value='new' key='new' disabled={isAssociated()}>
            <RiLink />
            <Text maxW='110px'>Link this {object}</Text>
          </MenuItem>
        )}

        {(associations && object) && <Separator />}
        
        <For each={associations}>
          {(association: NoteAssociation) => (
            <MenuItem value={`${association.object}-${association.id}`} key={association.id}>
              <RiLinkUnlinkM />
              <AssociationIcon object={association.object} />
              <Text maxW='110px' truncate>
                {association.label}
              </Text>
            </MenuItem>
          )}
        </For>
        
      </MenuContent>
    </MenuRoot>
  )
}

export default AssociationMenu