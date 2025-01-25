'use client'
import React, { createContext, useCallback, useEffect, useState } from 'react'
import { AppUser, AuthContextType, ProviderProps, ZendeskUser } from '../types/appTypes'
import { useZafClient } from '../hooks/useZafClient'
import { auth } from '../utils/firebase'
import { signInAnonymously } from 'firebase/auth'
import Database from '../utils/database'
import { DatabaseQuery } from '../types/databaseTypes'

export const AuthContext = createContext<AuthContextType|undefined>(undefined)

export const AuthContextProvider: React.FC<ProviderProps> = ({children}) => {
  const client = useZafClient()
  const [loadingAuth, setLoadingAuth] = useState(true)
  const [currentUser, setCurrentUser] = useState<ZendeskUser|null>(null)
  const [appUser, setAppUser] = useState<AppUser|null>(null)
  const [subdomain, setSubdomain] = useState<string|null>(null)

  const getSubdomain = useCallback(async (): Promise<string|null> => {
    const context = await client?.context()
    const subdomain = context?.account.subdomain

    return subdomain || null
  }, [client])

  const getCurrentUser = useCallback(async (): Promise<ZendeskUser|null> => {
    const results = await client?.get('currentUser')
    if (results) return results.currentUser
    else return null
  }, [client])

  const anonymousSignIn = async () => {
    return signInAnonymously(auth)
      .then((response) => response.user)
  }

  const findAppUser = useCallback(async (currentUser: ZendeskUser, subdomain: string) => {
    const conditions: DatabaseQuery[] = [
      { field: 'userId', operator: '==', value: `${currentUser.id}` },
      { field: 'subdomain', operator: '==', value: subdomain },
    ]
    const results = await Database.query('users', conditions)
    if (results[0]) setAppUser(results[0])
    setLoadingAuth(false)
  }, [])

  useEffect(() => {
    const getData = async () => {
      const user = await getCurrentUser()
      setCurrentUser(user)

      const subdomain = await getSubdomain()
      if (subdomain) setSubdomain(subdomain)

      if (user && subdomain) {
        await anonymousSignIn()
        return findAppUser(user, subdomain)
      }
    }
    if (client) getData()
  }, [client, findAppUser, getCurrentUser, getSubdomain])

  return (
    <AuthContext.Provider value={{
      subdomain,
      currentUser,
      appUser,
      setAppUser,
      setCurrentUser,
      loadingAuth,
    }}>
      {children}
    </AuthContext.Provider>
  )
}