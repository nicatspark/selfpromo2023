import { useEffect, useRef, useState } from 'react'
import classes from './Toc.module.scss'

const TocPanel = () => {
  const [showMax, setShowMax] = useState(3)
  const isSnippetsPage =
    globalThis?.location?.pathname.split('/')[1] === 'snippets'
  const ref = useRef<HTMLDivElement | null>(null)
  const [headers, setHeaders] = useState<HTMLHeadingElement[]>([])

  const getHeaders = () => {
    const article = document.querySelector('article')
    const headerEls = article?.querySelectorAll('h5')
    if (!headerEls) return
    const headerArr = [...headerEls]
    setHeaders(headerArr)
  }

  const scrollToEl = (el: HTMLHeadingElement) => {
    const headerHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--header-height'
      )
    )
    const margin = 10
    const pixelsToScroll =
      window.scrollY + el.getBoundingClientRect().y - headerHeight - margin
    window.scrollTo({ top: pixelsToScroll, behavior: 'smooth' })
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
      <ul>
        {headers.slice(0, showMax).map((h, i) => (
          <li key={i}>
            <button onClick={() => scrollToEl(h)}>{h.innerText}</button>
          </li>
        ))}
        {headers.length > showMax && (
          <li className='showall'>
            <button onClick={() => setShowMax(100)}>
              show all {headers.length}
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default TocPanel
