import React from 'react'
import { Stack, For } from '@chakra-ui/react'
import { Note } from '@/app/types/appTypes'
import NoteCard from './NoteCard'
import { useNotes } from '@/app/hooks/useNotes'
import { EmptyState } from '@/components/ui/empty-state'
import { RiStickyNoteLine } from 'react-icons/ri'

const NotesList = () => {
  const { notes } = useNotes()

  if (!notes || !notes.length) return (
    <EmptyState
      icon={<RiStickyNoteLine />}
      title='Empty Notes'
      description='Click + to add your first note'
    />
  )

  return (
    <Stack marginTop={3}>
      <For each={notes}>
        {(note: Note) => (
          <NoteCard key={note.id} note={note} />
        )}
      </For>
    </Stack>
  )

}

export default NotesList
