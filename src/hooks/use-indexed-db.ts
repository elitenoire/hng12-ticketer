import { useState, useEffect, useRef } from 'react'

type SetupCallback = (db: IDBDatabase, transaction: IDBTransaction) => void

export function useIndexedDB(dbName: string, dbVersion: number, setupCallback: SetupCallback) {
  const [db, setDb] = useState<IDBDatabase | null>(null)
  const [pending, setPending] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isMounted = useRef(false)
  const cleanupPending = useRef(false)

  useEffect(() => {
    isMounted.current = true
    setPending(true)
    setError(null)

    let database: IDBDatabase | null = null
    const request = indexedDB.open(dbName, dbVersion)

    request.onerror = (event) => {
      if (!isMounted.current) return
      console.error('🔴[DB]:Error opening database:', event)
      setError('Failed to open database.')
      setPending(false)
    }

    request.onblocked = (event) => {
      if (!isMounted.current) return
      console.error('🔴[DB]: Blocked! Close other tabs on this site', event)
      setError('Blocked from opening database.')
      setPending(false)
    }

    request.onsuccess = (event) => {
      database = (event.target as IDBOpenDBRequest).result
      if (!isMounted.current) {
        database.close()
        return
      }
      setDb(database)
      setPending(false)
    }

    request.onupgradeneeded = (event) => {
      database = (event.target as IDBOpenDBRequest).result
      const transaction = (event.target as IDBOpenDBRequest).transaction

      try {
        setupCallback(database, transaction!)

        transaction?.addEventListener('error', (e) => {
          throw (e.target as IDBRequest).error
        })
        transaction?.addEventListener('complete', () => {
          if (isMounted.current && !cleanupPending.current) {
            setDb(database)
          }
        })
      } catch (e) {
        setError((e as Error).message)
        transaction?.abort()
        database.close()
        setPending(false)
      }
    }

    return () => {
      cleanupPending.current = true
      isMounted.current = false

      if (database) {
        database.close()
        setDb(null)
      }

      // Reset cleanup flag after potential remount
      setTimeout(() => {
        cleanupPending.current = false
      }, 0)
    }
  }, [dbName, dbVersion, setupCallback])

  return { db, pending, error }
}
