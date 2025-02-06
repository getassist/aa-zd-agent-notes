'use client'
import React from 'react'
import { Box, Spinner } from '@chakra-ui/react'
import { EmptyState } from '@/components/ui/empty-state'
import { useAuth } from '../hooks/useAuth'
import GetStarted from './GetStarted'
import AppMain from './AppMain'
import { useLocation } from '../hooks/useLocation'

const App = () => {
  const {appUser, loadingAuth} = useAuth()
  const {location} = useLocation()

  if (loadingAuth) {
    return (
      <EmptyState icon={<Spinner size='xl' />} title='Loading' />
    )
  }

  if (!appUser) return <GetStarted />

  if (location === 'top_bar') {
    return (
      <Box minHeight='100vh' display='flex' flexDirection='column' pl={4} pr={4}>
        <AppMain />
      </Box>  
    )
  }
  
  return (
    <Box minHeight='100vh' display='flex' flexDirection='column'>
      <AppMain />
    </Box>
  )
}

export default App