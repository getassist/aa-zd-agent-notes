'use client'
import React, { createContext, useEffect, useState } from 'react'
<<<<<<< HEAD
import { Note, NotesContextType, ProviderProps } from '../types/appTypes'
import { uuid } from '../utils/helpers'
import { BLANK_NOTE } from '../utils/constants'
import { useAuth } from '../hooks/useAuth'
import Database from '../utils/database'
import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot, writeBatch, where } from 'firebase/firestore'
=======
import { NewNote, Note, NotesContextType, ProviderProps } from '../types/appTypes'
import { findFromArray, isEqual, sortArray, uuid } from '../utils/helpers'
import { useAuth } from '../hooks/useAuth'
import Database from '../utils/database'
import { collection, doc, orderBy, query, QuerySnapshot, writeBatch, where } from 'firebase/firestore'
>>>>>>> review-3
import { db } from '../utils/firebase'

export const NotesContext = createContext<NotesContextType|undefined>(undefined)

export const NotesContextProvider: React.FC<ProviderProps> = ({children}) => {
  const {appUser} = useAuth()
  const [notes, setNotes] = useState<Note[]>([])

<<<<<<< HEAD
  const isFirst = (newOrder: number): boolean => {
    return newOrder === 1
  }
  
  const isLast = (newOrder: number, arrayLength: number): boolean => {
    return newOrder === arrayLength
  }

  const moveAndReorder = async (id: string, direction: 'up' | 'down') => {
    const shallowNotes = notes

    const currentIndex = shallowNotes.findIndex((x) => x.id === id)

    // if not found
    if (currentIndex === -1) return
=======
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
>>>>>>> review-3

    let swapIndex
    if (direction === 'up' && currentIndex > 0) {
      swapIndex = currentIndex - 1 // Move up
<<<<<<< HEAD
    } else if (direction === 'down' && currentIndex < shallowNotes.length - 1) {
=======
    } else if (direction === 'down' && currentIndex < notesCopy.length - 1) {
>>>>>>> review-3
      swapIndex = currentIndex + 1 // Move down
    } else {
      return
    }

<<<<<<< HEAD
    const currentNote = shallowNotes[currentIndex]
    const swapNote = shallowNotes[swapIndex]
=======
    const currentNote = notesCopy[currentIndex]
    const swapNote = notesCopy[swapIndex]
>>>>>>> review-3

    try {
      const batch = writeBatch(db)
      const currentNoteRef = doc(db, 'notes', currentNote.id)
      const swapNoteRef = doc(db, 'notes', swapNote.id)
  
      const currentNoteNewOrder = swapNote.order
      const swapNoteNewOrder = currentNote.order
  
<<<<<<< HEAD
      batch.update(currentNoteRef, { order: currentNoteNewOrder, isFirst: isFirst(currentNoteNewOrder), isLast: isLast(currentNoteNewOrder, shallowNotes.length) })
      batch.update(swapNoteRef, { order: swapNoteNewOrder,  isFirst: isFirst(swapNoteNewOrder), isLast: isLast(swapNoteNewOrder, shallowNotes.length)})
=======
      batch.update(currentNoteRef, { order: currentNoteNewOrder })
      batch.update(swapNoteRef, { order: swapNoteNewOrder})
>>>>>>> review-3
  
      await batch.commit()
    } catch (error) {
      return error
    }
  }

<<<<<<< HEAD
  const addAndReorder = async (note: Note) => {
    const shallowNotes = notes

    try {
      // add to database
      await Database.add('notes', note)

      // batch update
      const batch = writeBatch(db)
      shallowNotes.forEach((note: Note, index: number) => {
        const docRef = doc(db, 'notes', note.id)
        const update = {
          order: index + 2,
          isFirst: false,
          isLast: isLast(index + 1, shallowNotes.length)
        }
        batch.update(docRef, update)
      })
      await batch.commit()
    } catch (error) {
      return error
    }
  }

  const deleteAndReorder = async (id: string) => {
    const shallowNotes = notes

    const indexToDelete = shallowNotes.findIndex((x) => x.id === id)

    // if not found
    if (indexToDelete === -1) return

    // delete from shallow array
    shallowNotes.splice(indexToDelete, 1)

    try {
      // delete note from db
      await Database.delete('notes', id)
  
      // batch update
      const batch = writeBatch(db)
      shallowNotes.forEach((note: Note, index: number) => {
        const docRef = doc(db, 'notes', note.id)
        const update = {
          order: index + 1,
          isFirst: index === 0,
          isLast: (index + 1) === shallowNotes.length
        }
=======
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

>>>>>>> review-3
        batch.update(docRef, update)
      })
      await batch.commit()
    } catch (error) {
      return error
    }
  }

<<<<<<< HEAD
  const addNote = async () => {
    const newNote: Note = {
      ...BLANK_NOTE,
      id: uuid(),
      createdAt: new Date().toISOString(),
      createdBy: appUser?.id,
      isFirst: true,
      order: 1,
    }

    return addAndReorder(newNote)
=======
  const addNote = async (note: NewNote) => {
    const newNote: Note = {
      ...note,
      createdBy: appUser?.id,
      order: notes.length + 1,
      id: uuid(),
    }

    return Database.add('notes', newNote)
>>>>>>> review-3
  }

  const removeNote = (id: string) => {
    return deleteAndReorder(id)
  }

  const updateNote = (id: string, updatedNote: Partial<Note>) => {
<<<<<<< HEAD
=======
    const currentNote = findFromArray(notes, 'id', id)
    const newNote = {...currentNote, ...updatedNote}

    if (currentNote && isEqual(currentNote, newNote)) return // only update if changes found
    
>>>>>>> review-3
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
<<<<<<< HEAD
        setNotes(data)
=======
        setNotes(markFirstAndLast(data))
>>>>>>> review-3
      }
    }

    if (appUser) {
      const ref = collection(db,'notes')
<<<<<<< HEAD
      const notesQuery = query(ref, where('createdBy', '==', appUser.id), orderBy('order'))
=======
      const notesQuery = query(ref, where('createdBy', '==', appUser.id), orderBy('order', 'desc'))
>>>>>>> review-3
      Database.observe(notesQuery, unsubscribe)
    }
  }, [appUser])

  return (
    <NotesContext.Provider value={{ notes, addNote, removeNote, updateNote, updateNoteOrder }}>
      {children}
    </NotesContext.Provider>
  )
}