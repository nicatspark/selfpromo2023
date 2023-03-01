import { useEffect } from 'react'

/**
 * A functional and separated way to add one or more transition based animations
 * using the Web Animation API.
 * Takes an array of objects with transition data and applies that to an element.
 * Returns a object containing and array of promises that resolves after transition out
 * as well as a function to cancel all transitions.
 *
 * Nota Bene:
 * Unless an extra state is toggled via the callback (E.g elOpenWithTransition: boolean;)
 * that is true before transition in and false on transition out, or you might cut off
 * the transition out.
 * The target element for the transition must have default value to transition from set.
 * E.g. opacity: 0;
 */
type OnResolveCallback = () => void

interface TransitionRequests {
  callback?: OnResolveCallback // Executes after transition out.
  delay?: number
  el: HTMLElement
  opacity: 0 | 1
  transitionTime?: number
}

interface MiTrReturns {
  cleanUp: () => void
  transitionArr: (Promise<unknown> | null)[]
}

const microTransitions = (
  transitionRequests: TransitionRequests[]
): MiTrReturns => {
  const cancelFns: (() => void)[] = []
  const transitionArr = transitionRequests
    .map((tr) => {
      if (!tr.el) return null
      return new Promise((resolve) => {
        let id: NodeJS.Timeout
        const delay = tr.delay || 0
        tr.el.style.opacity = tr.opacity === 0 ? '1' : '0'
        id = setTimeout(() => {
          const trTime = tr.transitionTime || 200
          tr.el.animate([{ opacity: tr.opacity }], {
            duration: trTime,
            iterations: 1,
            fill: 'forwards',
          })
          const transitionOut = tr.opacity === 0
          if (transitionOut) {
            id = setTimeout(
              () => resolve(tr.callback ? tr.callback : null),
              trTime
            )
            cancelFns.push(() => clearTimeout(id))
          }
        }, delay)
        cancelFns.push(() => clearTimeout(id))
      })
    })
    .filter(Boolean)

  const cleanUp = () => cancelFns.forEach((cancelTimeout) => cancelTimeout())
  return { transitionArr, cleanUp }
}

export const useMicroTransitions = (
  element: HTMLElement | null,
  delay = 200
) => {
  /**
   * In case we also want a transition out we need to create an extra boolean state here
   * that toggles after transition out has occured (as in the next commented line.)
   */
  useEffect(() => {
    if (!element) return
    const { cleanUp } = microTransitions([{ el: element, opacity: 1, delay }])
    // Promise.all(transitionArr).then((callback) => console.log(callback));
    return cleanUp
  }, [element])
}
