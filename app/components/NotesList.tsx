import React, { useEffect, useState } from 'react'
import { Stack, For, Box, Flex, Center, Icon, Text, Tooltip } from '@chakra-ui/react'
import { FilterType, Note } from '@/app/types/appTypes'
import NoteCard from './NoteCard'
import { useNotes } from '@/app/hooks/useNotes'
import { EmptyState } from '@/components/ui/empty-state'
import { RiStickyNoteLine } from 'react-icons/ri'
import NotesFilter from './NotesFilter'
import useFilteredNotes from '../hooks/useFilteredNotes'
import { useLocation } from '../hooks/useLocation'

const NotesList = () => {
  const { notes } = useNotes()
  const {location} = useLocation()
  const [filter, setFilter] = useState<FilterType>('all')
  const filteredNotes = useFilteredNotes({notes, filter})

  useEffect(() => {
    if (location) {
      if (location === 'top_bar') return setFilter('all')
      return setFilter('linked')
    }
  }, [location])

  if (!notes || !notes.length) return (
    <EmptyState
      icon={<RiStickyNoteLine />}
      title='Empty Notes'
      description='Click + to add your first note'
    />
  )

  return (
    <Stack marginTop={3}>
      <NotesFilter filter={filter} setFilter={setFilter} />
      
      <For each={filteredNotes}>
        {(note: Note) => (
          <NoteCard key={note.id} note={note} />
        )}
      </For>
    </Stack>
  )

}

export default NotesList
