'use client'

import { useEffect, useState } from 'react'
import { ZAFClient } from '../types/zendeskTypes'

let zafClient: ZAFClient | null = null

export const useZafClient = () => {
  const [client, setClient] = useState(zafClient)
  
  useEffect(() => {
    if (!client && typeof window.ZAFClient !== 'undefined') {
      zafClient = window.ZAFClient.init()      
      setClient(zafClient)
    }
  }, [client])
  
  return client
}