<<<<<<< HEAD
import { Note } from '../types/appTypes'

export const BLANK_NOTE: Omit<Note, 'id'> = {
  title: '',
  content: '',
  open: true,
  order: 1,
}
=======
import { NewNote, NoteColor } from '../types/appTypes'
>>>>>>> review-3

export const COLOR_OPTIONS = {
  gray: '#f8f9f9',
  red: '#fff2f3',
  blue: '#edf7ff',
  green: '#eef8f4',
  yellow: '#fff7d4',
}

<<<<<<< HEAD
export const DEFAULT_COLOR = 'gray'

// NEED TO UPDATE NAMES OF ALL CONTSANTS BELOW
export const TEST_NOTES: Note[] = [
  {
    id: '1',
    open: false,
    order: 1,
    title: 'lorem ipsum',
    content: 'In TypeScript, you can create a type alias for an ISO 8601 date string to ensure that it conforms to the ISO format. While TypeScript cannot validate the format at runtime (it only checks types at compile time), the type can be useful for documenting and enforcing the expected type.'
  },
  {
    id: '2',
    open: true,
    color: 'red',
    order: 3,
    title: 'third note',
    content: 'Enforcing ISO Format, If you need runtime validation to ensure the string is in a valid ISO 8601 format, you can use a utility function.'
  },
  {
    id: '3',
    open: false,
    order: 2,
    color: 'blue',
    title: 'second note',
    content: 'Enforcing ISO Format, If you need runtime validation to ensure the string is in a valid ISO 8601 format, you can use a utility function.'
  },
  {
    id: '4',
    open: true,
    order: 4,
    title: 'Enforcing ISO Format',
    content: 'Enforcing ISO Format, If you need runtime validation to ensure the string is in a valid ISO 8601 format, you can use a utility function.'
  }
]
=======
export const BLANK_EDITOR_CONTENT = '<p></p>'

export const DEFAULT_COLOR: NoteColor = 'gray'

export const REGEX_URL = /(https?:\/\/[^\s]+)/g

export const BLANK_NOTE: NewNote = {
  color: DEFAULT_COLOR,
  title: '',
  content: '',
  open: true,
  order: 1,
}
>>>>>>> review-3
