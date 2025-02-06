import React from 'react'
import { ObjectType } from '../types/zendeskTypes'
import { RiBuilding4Fill, RiTicketFill, RiUser3Fill } from 'react-icons/ri'

const AssociationIcon = ({object}:{object?: ObjectType}) => {
  switch (object) {
    case 'user':
      return <RiUser3Fill />

    case 'ticket':
      return <RiTicketFill />

    case 'organization':
      return <RiBuilding4Fill />

    default:
      return null
  }
}

export default AssociationIcon