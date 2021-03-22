import { useCallback, useEffect } from "react"

/**
 * A helper function to mock the debounce function
 *    from lodash in React hooks.
 * This function is inspired by custom hooks in this post:
 *    https://stackoverflow.com/questions/54666401/how-to-use-throttle-or-debounce-with-react-hook
 * 
 * @param { (...args: any[]) => any } fn - A callback function to use debounce effect on.
 * @param { number } delay - A number that indicates how much time it waits.
 * @param { any[] } deps - A dependency list.
 * 
*/
export const useDebounce = (
  fn: (...args: any[]) => any,
  delay: number,
  deps: any[]
) => {
  const callback = useCallback(fn, deps)

  useEffect(() => {
    const handler = setTimeout(() => {
      callback()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [callback, delay])
}