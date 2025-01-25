'use client'
import React, { createContext, useEffect, useState } from 'react'
import { NewNote, Note, NotesContextType, ProviderProps } from '../types/appTypes'
import { findFromArray, isEqual, sortArray, uuid } from '../utils/helpers'
import { useAuth } from '../hooks/useAuth'
import Database from '../utils/database'
import { collection, doc, orderBy, query, QuerySnapshot, writeBatch, where } from 'firebase/firestore'
import { db } from '../utils/firebase'

export const NotesContext = createContext<NotesContextType|undefined>(undefined)

export const NotesContextProvider: React.FC<ProviderProps> = ({children}) => {
  const {appUser} = useAuth()
  const [notes, setNotes] = useState<Note[]>([])

  const markFirstAndLast = (notes: Note[]): Note[] => {
    return notes.map((x) => {
      if (x.order === notes.length) return {...x, isFirst: true}
      if (x.order === 1) return {...x, isLast: true}
      return x
    })
  }

  const moveAndReorder = async (id: string, direction: 'up' | 'down') => {
    const notesCopy = notes

    const currentIndex = notesCopy.findIndex((x) => x.id === id)

    if (currentIndex === -1) return // not found

    let swapIndex
    if (direction === 'up' && currentIndex > 0) {
      swapIndex = currentIndex - 1 // Move up
    } else if (direction === 'down' && currentIndex < notesCopy.length - 1) {
      swapIndex = currentIndex + 1 // Move down
    } else {
      return
    }

    const currentNote = notesCopy[currentIndex]
    const swapNote = notesCopy[swapIndex]

    try {
      const batch = writeBatch(db)
      const currentNoteRef = doc(db, 'notes', currentNote.id)
      const swapNoteRef = doc(db, 'notes', swapNote.id)
  
      const currentNoteNewOrder = swapNote.order
      const swapNoteNewOrder = currentNote.order
  
      batch.update(currentNoteRef, { order: currentNoteNewOrder })
      batch.update(swapNoteRef, { order: swapNoteNewOrder})
  
      await batch.commit()
    } catch (error) {
      return error
    }
  }

  const deleteAndReorder = async (id: string) => {
    const notesCopy = notes

    const indexToDelete = notesCopy.findIndex((x) => x.id === id)

    if (indexToDelete === -1) return // not found

    notesCopy.splice(indexToDelete, 1)
    sortArray(notesCopy, 'order')

    try {
      const batch = writeBatch(db)

      const currentNoteRef = doc(db, 'notes', id)
      batch.delete(currentNoteRef)

      notesCopy.forEach((note: Note, index: number) => {
        const docRef = doc(db, 'notes', note.id)
        const update = {order: index + 1}

        batch.update(docRef, update)
      })
      await batch.commit()
    } catch (error) {
      return error
    }
  }

  const addNote = async (note: NewNote) => {
    const newNote: Note = {
      ...note,
      createdBy: appUser?.id,
      order: notes.length + 1,
      id: uuid(),
    }

    return Database.add('notes', newNote)
  }

  const removeNote = (id: string) => {
    return deleteAndReorder(id)
  }

  const updateNote = (id: string, updatedNote: Partial<Note>) => {
    const currentNote = findFromArray(notes, 'id', id)
    const newNote = {...currentNote, ...updatedNote}

    if (currentNote && isEqual(currentNote, newNote)) return // only update if changes found
    
    return Database.update('notes', {...updatedNote, id})
  }

  const updateNoteOrder = (id: string, direction: 'up' | 'down') => {
    return moveAndReorder(id, direction)
  }

  useEffect(() => {
    const unsubscribe = async (snapshot: QuerySnapshot) => {
      const data: Note[] = []
      if (snapshot) {
        snapshot.forEach((snap) => data.push(snap.data() as Note))
        setNotes(markFirstAndLast(data))
      }
    }

    if (appUser) {
      const ref = collection(db,'notes')
      const notesQuery = query(ref, where('createdBy', '==', appUser.id), orderBy('order', 'desc'))
      Database.observe(notesQuery, unsubscribe)
    }
  }, [appUser])

  return (
    <NotesContext.Provider value={{ notes, addNote, removeNote, updateNote, updateNoteOrder }}>
      {children}
    </NotesContext.Provider>
  )
}