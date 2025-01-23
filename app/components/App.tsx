'use client'
import React from 'react'
import { Box, Spinner } from '@chakra-ui/react'
import { EmptyState } from '@/components/ui/empty-state'
import { useAuth } from '../hooks/useAuth'
import GetStarted from './GetStarted'
import AppMain from './AppMain'

const App = () => {
  const {appUser, loadingAuth} = useAuth()

  if (loadingAuth) {
    return (
      <EmptyState icon={<Spinner size='xl' />} title='Loading' />
    )
  }

  if (!appUser) return <GetStarted />
  
  return (
    <Box minHeight='100vh' display='flex' flexDirection='column'>
      <AppMain />
    </Box>
  )
}

export default App