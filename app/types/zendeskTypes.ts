export type AppLocation = 'ticket_sidebar' | 'new_ticket_sidebar' | 'organization_sidebar' | 'user_sidebar' | 'top_bar' | 'nav_bar' | 'modal' | 'ticket_editor' | 'background'

export type ObjectType = 'user' | 'ticket' | 'organization'

type ApiRequestType = 'GET' | 'POST' | 'PUT' | 'DELETE'

type ZAFContext = {
  instanceGuid: string,
  product: 'support',
  account: {
    subdomain: string
  },
  location: AppLocation,
  ticketId?: number,
  userId?: number,
  organizationId?: number,
}

type ZAFMetadata = {
  appId: number,
  name: string,
  installationId: number,
  version: string,
  stripe_subscription_id: string,
  plan: {
    name: string,
  },
  settings: {
    title: string,
  }
}

export type ZAFRequestOptions = {
  accepts?: {
    text: string,
  },
  autoRetry?: boolean,
  cache?: boolean,
  contentType?: string,
  data?: {
    keyExample: string,
  },
  dataType?: string
  httpCompleteResponse?: boolean,
  type: ApiRequestType,
  timeout?: number,
  url: string,
  xhrFields?: {
    withCredentials: boolean,
  }
}

export type ZAFClient = {
  get: (path: string | string[]) => Promise<any>,
  has: (path: string) => boolean,
  instance: (guid: string) => ZAFClient,
  set: (path: string) => Promise<any>,
  invoke: (path: string | object, ...args: any) => Promise<any>,
  request: (options: string | ZAFRequestOptions) => Promise<any>,
  context: () => Promise<ZAFContext>,
  metadata: () => Promise<ZAFMetadata>,
  off: (name: string, handler: Function) => void,
  on: (name: string, handler: Function) => void,
}

export type OrganizationField = {
  active: boolean,
  created_at: string,
  description: string,
  id: number,
  key: string,
  position: number,
  raw_description: string,
  raw_title: string,
  regexp_for_validation: string,
  title: string,
  type: string,
  updated_at: string,
  url: string,
}

export type FieldType = 'checkbox' | 'date' | 'decimal' | 'dropdown' | 'integer' | 'lookup' | 'multiselect' | 'regexp' | 'text' | 'textarea'

export type ConditionField = {
  key: string,
  title: string,
  type: FieldType,
}

export type ConditionOperator = {
  label: string,
  value: string,
}

export type ConditionValue = string | number

export type ViewCondition = {
  id: string,
  field: ConditionField,
  operator: ConditionOperator,
  value: ConditionValue
}

export type ViewColumn = {
  id: string,
  key: string,
  title: string,
  type: FieldType,
}

export type View = {
  id: string,
  title: string,
  type: string,
  createdAt: string,
  createdBy: string,
  updatedAt: string,
  updatedBy: string,
  conditions: ViewCondition[],
  columns: ViewColumn[],
}