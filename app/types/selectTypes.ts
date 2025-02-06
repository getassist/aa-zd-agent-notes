import { OptionValue } from '@zendeskgarden/react-dropdowns.next'

export type SelectOption = {
  value: string,
  label: string,
}

// props received by Select component
export type SelectProps = {
  value: SelectOption | null,
  options: SelectOption[],
  label?: string,
  defaultExpanded?: boolean,
  handleChange?: (value: SelectOption | null) => void,
}

// from zendesk types
export type SelectChanges = {
    type: string 
    isExpanded?: boolean
    selectionValue?: OptionValue | OptionValue[] | null
    inputValue?: string
    activeIndex?: number
}

// from zendesk types
export type SelectOnChange = (changes: SelectChanges) => void | undefined