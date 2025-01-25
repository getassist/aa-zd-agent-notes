import React from 'react'
import SearchInput from './SearchInput'
import { Box, Flex, IconButton } from '@chakra-ui/react'
import { RiAddLine, RiSearchLine } from 'react-icons/ri'
import { useNotes } from '@/app/hooks/useNotes'
import { useSearch } from '../hooks/useSearch'
<<<<<<< HEAD
=======
import { BLANK_NOTE } from '../utils/constants'
>>>>>>> review-3

const Toolbar = () => {
  const { addNote } = useNotes()
  const {setSearchString, searchActive, setSearchActive} = useSearch()

  const cancelHandler = () => {
    setSearchString('')
    setSearchActive(false)
  }

<<<<<<< HEAD
  const handleAdd = () => addNote()
=======
  const handleAdd = () => {
    addNote(BLANK_NOTE)
  }
>>>>>>> review-3

  const handleSearch = (value: string) => setSearchString(value)

  if (searchActive) {
    return (
      <SearchInput handleCancel={cancelHandler} placeholder='Search notes...' handleChange={handleSearch} />
    )
  }

  return (
      <Flex gap='4' alignItems='center' justifyContent='space-betwen' w='100%' position='sticky'>
        
        <Box marginEnd='auto'>
<<<<<<< HEAD
          <IconButton size='sm' onClick={handleAdd} variant='ghost' bg='transparent' >
=======
          <IconButton size='sm' onClick={handleAdd} variant='ghost' bg='transparent'>
>>>>>>> review-3
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