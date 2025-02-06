import { SegmentedControl } from '@/components/ui/segmented-control'
import { Flex, SegmentGroupValueChangeDetails } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { RiLinkM, RiListUnordered, RiPushpin2Line } from 'react-icons/ri'
import { useLocation } from '../hooks/useLocation'
import { FilterType } from '../types/appTypes'

type NotesFilter = {
  filter: FilterType,
  setFilter: Dispatch<SetStateAction<FilterType>>,
}

const NotesFilter = ({filter, setFilter}: NotesFilter) => {
  const {location} = useLocation()
  // const [filter, setFilter] = useState<FilterType>()

  const handleChange = (details: SegmentGroupValueChangeDetails) => {
    const value = details.value as FilterType
    setFilter(value)
  }

  // useEffect(() => {
  //   if (location) {
  //     if (location === 'top_bar') return setFilter('pinned')
  //     return setFilter('linked')
  //   }
  // }, [location])

  return (
    <Flex justifyContent='center'>
      <SegmentedControl
        cursor='pointer'
        value={filter}
        onValueChange={handleChange}
        size='xs'
        items={[
          { value: 'linked', label: (<RiLinkM />), disabled: location === 'top_bar' },
          { value: 'pinned', label: (<RiPushpin2Line />) },
          { value: 'all', label: (<RiListUnordered />) },
        ]}
      />
    </Flex>
  )
}

export default NotesFilter