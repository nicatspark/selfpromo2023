import { useEffect, useRef, useState } from 'react'
import classes from './Toc.module.scss'

const Button = () => {
  const isSnippetsPage =
    globalThis?.location?.pathname.split('/')[1] === 'snippets'
  const ref = useRef<HTMLDivElement | null>(null)
  const [headers, setHeaders] = useState<string[]>([])

  const getHeaders = () => {
    const article = document.querySelector('article')
    const headerEls = article?.querySelectorAll('h5')
    if (!headerEls) return
    setHeaders([...headerEls].map((header) => header.innerText))
  }

  useEffect(() => {
    if (ref.current && !isSnippetsPage)
      ref.current.setAttribute('hidden', 'true')
    else getHeaders()
  }, [])

  return (
    <div
      ref={ref}
      hidden={headers.length === 0}
      className={classes.toccontainer}
    >
      <h4>Table of contents</h4>
      <ul>
        {headers.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
    </div>
  )
}

export default Button
