import { useEffect, useRef, useState } from 'react'
import styles from './Toaster.module.scss'
import { useMicroTransitions } from '../helpers/useMicroTransitions'

type InfoStates = 'success' | 'error' | 'warning' | 'info'
type ToastData = [string, number, InfoStates]

interface Detail {
  detail: [string, number, InfoStates]
}

const Toaster = () => {
  const [toaster, setToaster] = useState<ToastData | null>(null)
  const [listitem, setListitem] = useState<HTMLLIElement | null>(null)
  const id = useRef<NodeJS.Timeout>()

  useMicroTransitions(listitem)

  const setToasterToState = (data: ToastData) => setToaster(data)

  useEffect(() => {
    const listenerCb = ({ detail }: CustomEventInit) => {
      setToasterToState(detail)
      if (!id.current) {
        clearTimeout(id.current)
        id.current = undefined
      }
    }
    id.current = setTimeout(() =>
      document.body.addEventListener('TOASTER', listenerCb)
    )
    return document.body.removeEventListener('TOASTER', listenerCb)
  }, [])

  useEffect(() => {
    if (!toaster) return
    //reset toaster after 5sec
    setTimeout(() => {
      setToaster(null)
    }, toaster[1] * 1000)
  }, [toaster])

  return (
    <ul className={styles.toaster__container}>
      {toaster && (
        <li
          ref={setListitem}
          data-type={toaster[2]}
          className={`${styles.toaster__item}`}
        >
          {toaster[0]}
        </li>
      )}
    </ul>
  )
}

export default Toaster
