import { ReactNode } from 'react'
import { COLOR_OPTIONS } from '../utils/constants'
import { AppLocation, ObjectType } from './zendeskTypes'
import { Timestamp } from 'firebase/firestore'

export type ViewType = 'personal' | 'shared'

export type ViewAction = 'edit' | 'delete' | 'export'

export type NoteAssociation = {
  object: ObjectType,
  id: number,
  label: string,
}

export type Note = {
  id: string,
  title: string,
  content: string,
  open: boolean,
  order: number,
  color?: NoteColor,
  isLast?: boolean,
  isFirst?: boolean,
  createdAt?: Timestamp,
  createdBy?: string,
  updatedBy?: string,
  updatedAt?: Timestamp,
  associations?: NoteAssociation[],
  pinned?: boolean,
}

export type NewNote = Omit<Note, 'id'>

export type ZendeskUser = {
  id: number,
  name: string,
  role: string,
  email: string,
}

export type AppUser = {
  id: string,
  name: string,
  email: string,
  accountId: string,
  subdomain: string,
  userId: string,
  createdAt: string,
}

export type AppAccount = {
  id: string,
  subdomain: string,
  createdAt: string,
  createdBy: string,
  active: boolean,
}

export type NoteColor = keyof typeof COLOR_OPTIONS

export type NotesContextType = {
  notes: Note[],
  addNote: (note: NewNote) => void,
  removeNote: (id: string) => void,
  updateNote: (id: string, note: Partial<Note>) => void,
  updateNoteOrder: (id: string, direction: 'up' | 'down') => void,
  updateAssociations: (id: string, association: NoteAssociation, action: 'add' | 'remove') => void,
}

export type LocationContextType = {
  location?: AppLocation,
  object?: ObjectType,
  objectId?: number,
  objectLabel?: string,
}

export type SearchContextType = {
  searchString: string,
  searchResults: Note[],
  searchActive: boolean,
  setSearchString: (value: string) => void
  setSearchActive: (value: boolean) => void
}

export type AuthContextType = {
  subdomain: string | null,
  currentUser: ZendeskUser | null,
  appUser: AppUser | null,
  setAppUser: (user: AppUser|null) => void
  setCurrentUser: (user: ZendeskUser|null) => void
  loadingAuth: boolean,
}

export type ProviderProps = { children: ReactNode }

export type DialogType = {
  isOpen?: boolean,
  title?: string,
  content?: string,
  onOpen?: () => void
  onClose?: () => void
  onConfirm?: () => void
}

export type FilterType = 'linked' | 'pinned' | 'all'