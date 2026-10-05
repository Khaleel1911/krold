import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

// False on the server and while hydrating its HTML, true from then on (and on client navigations).
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}
