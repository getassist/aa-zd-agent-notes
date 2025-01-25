import Quill, { Delta } from 'quill'

export type TextChange = (delta: Delta, oldContents: Delta, source: string) => void

export type SelectionChange = (
  range: { index: number, length: number },
  oldRange: { index: number, length: number },
  source: string
) => void

export type EditorProps = {
  toolbar: boolean,
  blurDelay?: number,
  onTextChange?: TextChange
  onSelectionChange?: SelectionChange
}

export type EditorType = {
  quill: Quill | undefined,
  quillRef: React.RefObject<any>,
  isEditing: boolean,
}
