import { Box, Spinner, Text } from '@chakra-ui/react'
import React from 'react'

const Loading = (props: {message: string}) => {
  const {message} = props
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
    >
      <Spinner marginRight={2}/>
      <Text>
        {message || 'Loading...'}
      </Text>
    </Box>
  )
}

export default Loading