import React from 'react'
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTriggerItem,
} from '@/components/ui/menu'
import { RiPaletteLine } from 'react-icons/ri'
import { Box, ColorSwatch, For, MenuSelectionDetails } from '@chakra-ui/react'
import { NoteColor } from '../types/appTypes'
import { COLOR_OPTIONS } from '../utils/constants'

type ColorMenuProps = {
  handleSelect: (details: MenuSelectionDetails) => void,
}

const ColorMenu = ({handleSelect}: ColorMenuProps) => {
  return (
    <MenuRoot positioning={{ placement: 'right-start', gutter: 2 }} onSelect={handleSelect}>
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
  )
}

export default ColorMenu