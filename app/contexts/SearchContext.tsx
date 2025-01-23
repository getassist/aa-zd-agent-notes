'use client'
import React, { createContext, useEffect, useState }  from 'react'
import { Note, ProviderProps, SearchContextType } from '../types/appTypes'
import { useNotes } from '../hooks/useNotes'

export const SearchContext = createContext<SearchContextType|undefined>(undefined)

export const SearchContextProvider: React.FC<ProviderProps> = ({children}) => {
  const {notes} = useNotes()
  const [searchResults, setSearchResults] = useState<Note[]>([])
  const [searchString, setSearchString] = useState<string>('')
  const [searchActive, setSearchActive] = useState(false)

  const matchNote = (note: Note, value: string): boolean => {
    if (note.title.toLocaleLowerCase().includes(value)) return true
    if (note.content.toLocaleLowerCase().includes(value)) return true
    return false
  }

  useEffect(() => {
    if (searchString) {
      const filtered = notes.filter((note) => matchNote(note, searchString))
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }, [searchString, notes])

  return (
    <SearchContext.Provider value={{searchResults, searchString, setSearchString, searchActive, setSearchActive}}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContext