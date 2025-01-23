import React from 'react'
import SearchInput from './SearchInput'
import { Box, Flex, IconButton } from '@chakra-ui/react'
import { RiAddLine, RiSearchLine } from 'react-icons/ri'
import { useNotes } from '@/app/hooks/useNotes'
import { useSearch } from '../hooks/useSearch'

const Toolbar = () => {
  const { addNote } = useNotes()
  const {setSearchString, searchActive, setSearchActive} = useSearch()

  const cancelHandler = () => {
    setSearchString('')
    setSearchActive(false)
  }

  const handleAdd = () => addNote()

  const handleSearch = (value: string) => setSearchString(value)

  if (searchActive) {
    return (
      <SearchInput handleCancel={cancelHandler} placeholder='Search notes...' handleChange={handleSearch} />
    )
  }

  return (
      <Flex gap='4' alignItems='center' justifyContent='space-betwen' w='100%' position='sticky'>
        
        <Box marginEnd='auto'>
          <IconButton size='sm' onClick={handleAdd} variant='ghost' bg='transparent' >
            <RiAddLine />
          </IconButton>
        </Box>
        <Box>
          <IconButton size='sm' onClick={() => setSearchActive(true)} variant='ghost' bg='transparent' >
            <RiSearchLine />
          </IconButton>
        </Box>

      </Flex>
  )
}

export default Toolbar