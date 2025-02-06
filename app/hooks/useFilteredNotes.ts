import { SetStateAction, useCallback, useEffect, useState } from 'react'
import { FilterType, Note } from '../types/appTypes'
import { useLocation } from './useLocation'

type FilterNotesProps = {
  notes: Note[],
  filter: FilterType,
}

const useFilteredNotes = ({notes, filter}: FilterNotesProps) => {
  const {objectId} = useLocation()
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([])

  const findLinkedNotes = useCallback(() => {
    return notes.filter((note) => {
      const found = note.associations?.find((x) => x.id === objectId)
      if (found) return note
    })
  }, [notes, objectId])

  useEffect(() => {
    switch (filter) {
      case 'all':
        setFilteredNotes(notes)
        break
      case 'pinned':
        setFilteredNotes(notes.filter(note => note.pinned))
        break
      case 'linked':
        setFilteredNotes(findLinkedNotes())
        break
      default:
        setFilteredNotes(notes)
        break
    }
  }, [filter, notes, findLinkedNotes])

  return filteredNotes
}

export default useFilteredNotes