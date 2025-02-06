import { Query, QuerySnapshot } from 'firebase/firestore'

export type DatabaseQueryOperator = '<' | '<=' | '==' | '>' | '>=' | '!=' | 'array-contains' | 'array-contains-any' | 'in' | 'not-in'

export type DatabaseQuery = {
  field: string,
  operator: DatabaseQueryOperator,
  value: any
}

export type DatabaseType = {
  add: (store: string, data: any) => Promise<any>,
  update: (store: string, data: any) => Promise<any>
  get: (store: string, id: string) => Promise<any>
  getAll: (store: string) => Promise<any[]>
  delete: (store: string, id: string) => Promise<void>
  find: (store: string, field: string, value: any) => Promise<any[]>
  query: (store: string, conditions: DatabaseQuery[]) => Promise<any[]>
  observe: (ref: Query, observer: (snapshot: QuerySnapshot) => void) => void
  removeFromArray: (store: string, id: string, array: string, object: any) => Promise<any>
  addToArray: (store: string, id: string, array: string, object: any) => Promise<any>
}
