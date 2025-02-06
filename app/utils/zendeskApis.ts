import { ZAFRequestOptions } from '../types/zendeskTypes'

type ApiTargets = {
  [target: string]: ZAFRequestOptions,
}

export const OrganizationFields: ApiTargets = {
  list: {
    type: 'GET',
    url: '/api/v2/organization_fields'
  }
}