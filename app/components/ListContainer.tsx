import React from 'react'
import { useSearch } from '../hooks/useSearch'
import SearchResultsList from './SearchResultsList'
import NotesList from './NotesList'

const ListContainer = () => {
  const {searchActive, searchString} = useSearch()

  if (searchActive && searchString) {
    return <SearchResultsList />
  }

  return <NotesList />
}

export default ListContainer