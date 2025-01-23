import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  where,
  serverTimestamp,
  query,
  onSnapshot,
} from 'firebase/firestore'
import { db } from './firebase'
import { uuid } from './helpers'
import { DatabaseType } from '../types/databaseTypes'

const Database: DatabaseType = {
  add: async (store, data) => {
    const docData = data

    if (!data.id) docData.id = uuid()
    docData.createdAt = serverTimestamp()
    const ref = doc(db, `${store}/${docData.id}`)
    await setDoc(ref, data)
    return docData
  },

  update: async (store, data) => {
    if (!data.id) return false

    const docData = data
    docData.updatedAt = serverTimestamp()
    const ref = doc(db, `${store}/${data.id}`)
    await updateDoc(ref, data)
    return docData
  },


  get: async (store, id) => {
    const ref = doc(db, store, id)
    const docSnap = await getDoc(ref)
    const data = docSnap.data()
    return data
  },

  getAll: async (store) => {
    const ref = collection(db, store)
    const docSnaps = await getDocs(ref)
    const data: any[] = []
    docSnaps.forEach((snap) => data.push(snap.data()))
    return data
  },

  delete: async (store, id) => {
    const ref = doc(db, store, id)
    return deleteDoc(ref)
  },

  find: async (store, field, value) => {
    const ref = collection(db, store)
    const q = query(ref, where(field, '==', value))

    const querySnaps = await getDocs(q)
    const data: any[] = []
    querySnaps.forEach((snap) => data.push(snap.data()))

    return data
  },

  query: async (store, conditions) => {
    const ref = collection(db, store)
    const qs: any[] = []
    conditions.forEach((condition) => {
      qs.push(where(condition.field, condition.operator, condition.value))
    })
    const q = query(ref, ...qs)

    const querySnaps = await getDocs(q)
    const data: any[] = []
    querySnaps.forEach((snap) => data.push(snap.data()))

    return data
  },

  // Database.createAccount = async (newAccount, newUser) => {
  //   const batch = writeBatch(db)

  //   const userRef = doc(db, 'users', newUser.id)
  //   batch.set(userRef, newUser)

  //   const accountRef = doc(db, 'accounts', newAccount.id)
  //   batch.set(accountRef, newAccount)

  //   return batch.commit()
  // }

  // getRef: (store, id) => {
  //   if (id) return doc(db, store, id)
  //   return collection(db, store)
  // },

  observe: (ref, observer) => {
    return onSnapshot(ref, observer)
  },
}

export default Database
