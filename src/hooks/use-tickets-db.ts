'use client'

import { useIndexedDB } from '@/hooks/use-indexed-db'
import type { TicketType } from '@/types'

const DB_NAME = 'TicketsDB'
const STORE_NAME = 'tickets'
const DB_VERSION = 1

const initDB = (db: IDBDatabase) => {
  const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
  // Create a unique compound index for email and name
  store.createIndex('emailAndName', ['email', 'name'], { unique: true })
  store.createIndex('email', 'email', { unique: false })
}

export function useTicketsDB() {
  const { pending, error, db } = useIndexedDB(DB_NAME, DB_VERSION, initDB)

  const getStore = (mode: IDBTransactionMode) => {
    return new Promise<IDBObjectStore>((resolve, reject) => {
      if (!db) {
        reject('Database not initialized.')
        return
      }

      const transaction = db.transaction([STORE_NAME], mode)
      const store = transaction.objectStore(STORE_NAME)
      resolve(store)
    })
  }

  const checkExistingTicket = async (ticket: TicketType) => {
    try {
      const store = await getStore('readonly')
      const index = store.index('emailAndName')
      const request = index.get([ticket.email, ticket.name])

      return new Promise<boolean>((resolve, reject) => {
        request.onsuccess = (event) => {
          resolve(!!(event.target as IDBRequest).result)
        }
        // request.onerror = () => reject(request.error)
        request.onerror = () => reject('Error checking existing ticket.')
      })
    } catch (error) {
      console.error('🔴[DB]:Error checking existing ticket:', error)
      throw error
    }
  }

  const addTicket = async (ticket: TicketType) => {
    try {
      const store = await getStore('readwrite')
      const request = store.add(ticket)

      return new Promise<void>((resolve, reject) => {
        request.onerror = () => reject('Error saving ticket.')
        request.onsuccess = () => resolve()
      })
    } catch (error) {
      console.error('🔴[DB]:Error saving ticket:', error)
      throw error
    }
  }

  const getLastEmail = async () => {
    try {
      const store = await getStore('readonly')
      const request = store.openCursor(null, 'prev')

      return new Promise<string | null>((resolve, reject) => {
        request.onerror = () => reject('Error getting last used email.')
        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result
          if (cursor) {
            resolve(cursor.value.email)
          } else {
            resolve(null)
          }
        }
      })
    } catch (error) {
      console.error('🔴[DB]:Error getting last used email:', error)
      throw error
    }
  }

  const getTicketsByEmail = async (email: string) => {
    try {
      const store = await getStore('readonly')
      const index = store.index('email')
      const request = index.getAll(email)

      return new Promise<TicketType[]>((resolve, reject) => {
        request.onerror = () => reject('Error getting tickets.')
        request.onsuccess = (event) => {
          const tickets = (event.target as IDBRequest).result as TicketType[]
          resolve(tickets)
        }
      })
    } catch (error) {
      console.error('🔴[DB]:Error getting tickets by email:', error)
      throw error
    }
  }

  return { pending, error, checkExistingTicket, addTicket, getLastEmail, getTicketsByEmail }
}
