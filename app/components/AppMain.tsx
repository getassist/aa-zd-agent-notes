'use client'
import React, { useEffect, useState } from 'react'
import Toolbar from './Toolbar'
import { Box } from '@chakra-ui/react'
import ListContainer from './ListContainer'  

const AppMain = () => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box marginBottom={3}>
      <Box
        as='header' position='sticky' top={0} left={0} right={0} bg='white' zIndex='1'
        transition="box-shadow 0.2s ease, border-bottom 0.2s ease"
        borderBottom={hasScrolled ? '2px solid teal.700' : 'none'}
        boxShadow={hasScrolled ? 'sm' : 'none'}
      >
        <Toolbar />
      </Box>
      <Box as='main' flex={1}>
        <ListContainer />
      </Box>
    </Box>
  )
}

export default AppMain