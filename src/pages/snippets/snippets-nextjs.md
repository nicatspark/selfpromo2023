---
layout: '../../layouts/SnippetPost.astro'
title: 'Next js'
description: 'SSR with Next'
pubDate: 'Jan 7 2023'
---

##### Are we in the client?

```js
export const isSsr = typeof window === 'undefined'
```

##### Local and Session Storage

```js
import { useState, useEffect } from 'react'
import { isSsr } from '@/utils/isSsr'

export const getStorage = (storage, key) => JSON.parse(storage.getItem(key))

export const setStorage = (storage, key, newValue) =>
  storage.setItem(key, JSON.stringify(newValue))

const useStorage = (storageType, key, initialValue) => {
  if (isSsr) return [initialValue]

  const storageName = `${storageType}Storage`
  const storage = window[storageName]

  const [value, setValue] = useState(getStorage(storage, key) || initialValue)

  useEffect(() => {
    setStorage(storage, key, value)
  }, [value])

  return [value, setValue]
}

export default useStorage
```
