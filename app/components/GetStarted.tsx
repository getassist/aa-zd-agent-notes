import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { Box } from '@chakra-ui/react'
import { Alert } from '@/components/ui/alert'
import { RiStickyNoteAddLine } from 'react-icons/ri'
import { useAuth } from '../hooks/useAuth'
import Database from '../utils/database'
import { AppAccount, AppUser } from '../types/appTypes'
import Loading from './Loading'

const GetStarted = () => {
  const [loading, setLoading] = useState(false)
  const {currentUser, subdomain, setAppUser} = useAuth()
  const [error, setError] = useState<string|null>(null)

  const getAccount = async (): Promise<AppAccount|null> => {
    if (subdomain) {    
      const account = await Database.find('accounts', 'subdomain', subdomain)

      if (account[0]) return account[0]
      
      const newAccount: Partial<AppAccount> = {
        subdomain: subdomain,
        createdBy: `${currentUser?.id}`,
      }
      const data: AppAccount = await Database.add('accounts', newAccount)
      return data
    }

    setError('Something went wrong.')
    return null
  }


  const getUser = async (account: AppAccount): Promise<AppUser|null> => {
    if (currentUser) {
      const user = await Database.find('users', 'zendeskUserId', `${currentUser.id}`)
      
      if (user[0]) return user[0]

      const newUser: Partial<AppUser> = {
        name: currentUser.name,
        email: currentUser.email,
        userId: `${currentUser.id}`,
        accountId: account.id,
        subdomain: account.subdomain,
      }
      const data = await Database.add('users', newUser)
      return data
    }

    setError('You might not be logged in.')
    return null
  }

  const handleGetStarted = async () => {
    setLoading(true)

    const account = await getAccount()
    if (!account) return setError('No account found')

    const user = await getUser(account)
    if (!user) return setError('No user found')
    setAppUser(user)
    setLoading(false)
  }

  return (
    <Box>
      <EmptyState
        icon={<RiStickyNoteAddLine />}
        title='Welcome to Agent Notes'
        description='Smart Notes for Better Support'
      >
        {!loading && <Button onClick={handleGetStarted}>Get Started</Button>}
        
        {loading && <Loading message='Here we go!' />}

        {error && (<Alert status='error' title={error} colorPalette='gray' />)}
      </EmptyState>
    </Box>
  )
}

export default GetStarted