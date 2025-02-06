import { useContext } from 'react'
import { NotesContext } from '../contexts/NotesContext'
import { SearchContextType } from '../types/appTypes'
import SearchContext from '../contexts/SearchContext'

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}