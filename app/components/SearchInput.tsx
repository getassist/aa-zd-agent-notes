import React, { ChangeEvent, PropsWithChildren, useEffect } from 'react'
import { InputProps } from '../types/inputTypes'
import useInput from '../hooks/useInput'
import { Flex, IconButton, Input } from '@chakra-ui/react'
import { InputGroup } from '@/components/ui/input-group'
import { RiCloseLine, RiSearchLine } from 'react-icons/ri'

const SearchInput = (props: PropsWithChildren<InputProps>) => {
  const {placeholder, handleChange, handleCancel} = props
  const input = useInput('', 500)

  useEffect(() => {
    if (handleChange) handleChange(input.value)
  }, [input.value, handleChange])

  return (
    <Flex alignItems='center' justifyContent='space-betwen' w='100%'>

      <InputGroup flex='1' startElement={<RiSearchLine />} >
        <Input variant='flushed' size='sm' autoFocus placeholder={placeholder} onChange={input.handleChange} />
      </InputGroup>
      <IconButton size='sm' variant='ghost' onClick={handleCancel} bg='transparent'>
        <RiCloseLine />
      </IconButton>

    </Flex>
  )
}
export default SearchInput