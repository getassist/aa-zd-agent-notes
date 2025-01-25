import React from 'react'
import { useSearch } from '../hooks/useSearch'
import { Stack, For } from '@chakra-ui/react'
import { Note } from '../types/appTypes'
import NoteCard from './NoteCard'
import { EmptyState } from '@/components/ui/empty-state'
import { RiFileSearchLine } from 'react-icons/ri'

const SearchResultsList = () => {
  const { searchResults } = useSearch()

  if (!searchResults || !searchResults.length) {
    return (
      <EmptyState
        icon={<RiFileSearchLine />}
        title='No Results'
        description='Try searching again'
      />
    )
  }

  return (
    <Stack marginTop={3}>
      <For each={searchResults}>
        {(note: Note) => (
          <NoteCard key={note.id} note={note} />
        )}
      </For>
    </Stack>
  )
}

export default SearchResultsList