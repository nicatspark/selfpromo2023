---
layout: '../../layouts/SnippetPost.astro'
title: 'Next js'
description: 'SSR with Next'
pubDate: 'Jan 7 2023'
---

##### Local and Session Storage

Code needs to be improved since hooks are called conditionally inside.

```ts
import { useState, useEffect } from 'react'

type StorageProp = 'local' | 'session'

export const isSsr: boolean = typeof window === 'undefined'
export const getStorage = (storage: Storage, key: string) =>
  JSON.parse(storage.getItem(key) || 'null')

export const setStorage = <T>(storage: Storage, key: string, newValue: T) =>
  storage.setItem(key, JSON.stringify(newValue))

const useStorage = <T>(
  storageType: StorageProp,
  key: string,
  initialValue: T
) => {
  if (isSsr) return [initialValue]

  const storageName = `${storageType}Storage` as
    | 'localStorage'
    | 'sessionStorage'
  const storage = window[storageName] as Storage

  const [value, setValue] = useState(getStorage(storage, key) || initialValue)

  useEffect(() => {
    setStorage(storage, key, value)
  }, [key, storage, value])

  return [value, setValue]
}

export default useStorage
```
