import { NewNote, NoteColor } from '../types/appTypes'

export const COLOR_OPTIONS = {
  gray: '#f8f9f9',
  red: '#fff2f3',
  blue: '#edf7ff',
  green: '#eef8f4',
  yellow: '#fff7d4',
}

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
