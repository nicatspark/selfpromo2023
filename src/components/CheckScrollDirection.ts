import { useEffect } from 'react'
let scrollPos = 0
let previousScrollDir: boolean | undefined, id: NodeJS.Timeout

const CheckScrollDirection = () => {
  const check = () => {
    const scrollUp = document.body.getBoundingClientRect().top > scrollPos
    if (previousScrollDir != scrollUp) {
      clearTimeout(id)
      document.dispatchEvent(
        new CustomEvent('NEWSCROLLDIRECTION', {
          detail: scrollUp ? 'UP' : 'DOWN',
        })
      )
    }
    previousScrollDir = scrollUp
    id = setTimeout(() => (previousScrollDir = undefined), 2000)
    scrollPos = document.body.getBoundingClientRect().top
  }

  const init = () => {
    document.addEventListener('scroll', check)
    return window.removeEventListener('scroll', check)
  }

  useEffect(() => init(), [])
}

export default CheckScrollDirection
