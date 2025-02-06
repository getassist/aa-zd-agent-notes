import { useContext } from 'react'
import { NotesContext } from '../contexts/NotesContext'
import { NotesContextType } from '../types/appTypes'

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext)
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider')
  }
  return context
}