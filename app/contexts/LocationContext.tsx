'use client'
import { createContext, useCallback, useEffect, useState } from 'react'
import { LocationContextType, ProviderProps } from '../types/appTypes'
import { AppLocation, ObjectType, ZAFClient } from '../types/zendeskTypes'
import { useZafClient } from '../hooks/useZafClient'

export const LocationContext = createContext<LocationContextType|undefined>(undefined)

export const LocationContextProvider: React.FC<ProviderProps> = ({children}) => {
  const client = useZafClient()
  const [location, setLocation] = useState<AppLocation>()
  const [object, setObject] = useState<ObjectType>()
  const [objectId, setObjectId] = useState<number>()
  const [objectLabel, setObjectLabel] = useState<string>()

  const clientGet = async (client: ZAFClient, data: string) => {
    const response = await client.get(data)
    if (response) return response[data]
  }

  const getObject = (location: AppLocation): ObjectType | undefined=> {
    if (location === 'ticket_sidebar' || location === 'new_ticket_sidebar') return 'ticket'
    if (location === 'user_sidebar') return 'user'
    if (location === 'organization_sidebar') return 'organization'
  }

  const getObjectLabel = useCallback(async (object: ObjectType, client: ZAFClient) => {
    if (object === 'ticket') return '#' + await clientGet(client, 'ticket.id')
    if (object === 'user') return await clientGet(client, 'user.name')
    if (object === 'organization') return await clientGet(client, 'organization.name')
  }, [])

  const getContext = useCallback(async (client: ZAFClient) => {
    const context = await client.context()

    if (!context) return

    const location = context.location
    setLocation(location)
    
    const object = getObject(context.location)
    setObject(object)

    if (!object) return

    const objectId = context[`${object}Id`]
    setObjectId(objectId)

    const objectLabel = await getObjectLabel(object, client)
    setObjectLabel(objectLabel)
  }, [getObjectLabel])

  useEffect(() => {
    if (client) getContext(client)
  }, [client, getContext])

  return (
    <LocationContext.Provider value={{ location, object, objectId, objectLabel }}>
      {children}
    </LocationContext.Provider>
  )
}

