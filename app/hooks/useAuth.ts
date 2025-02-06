import { useContext } from 'react'
import { AuthContextType } from '../types/appTypes'
import { AuthContext } from '../contexts/AuthContext'

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider')
  }
  return context
}