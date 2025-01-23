import { useState, useEffect } from 'react'
import { useZafClient } from './useZafClient'
import { OrganizationFields } from '../utils/zendeskApis'
import { OrganizationField } from '../types/zendeskTypes'

const useOrganizationFields = () => {
  const [fields, setFields] = useState<OrganizationField[]>()
  const client = useZafClient()

  useEffect(() => {
    const getData = async () => {
      const results = await client?.request(OrganizationFields.list)
      setFields(results.organization_fields)
    }
    if (client) getData()
  }, [client])

  return fields
}

export default useOrganizationFields