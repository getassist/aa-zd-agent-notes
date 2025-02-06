import { Box, MenuItem } from '@chakra-ui/react'
import React from 'react'
import { RiPushpin2Line, RiPushpinLine } from 'react-icons/ri'

const PinMenu = ({pinned} : {pinned: boolean}) => {

  if (pinned) {
    return (
      <MenuItem value='unpin'>
        <RiPushpinLine />
        <Box>Unpin</Box>
      </MenuItem>  
    )
  }
  return (
    <MenuItem value='pin'>
      <RiPushpin2Line />
      <Box>Pin</Box>
    </MenuItem>
  )
}

export default PinMenu