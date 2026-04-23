import { useState, useEffect } from 'react'

export function useFontsLoaded(): boolean {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    document.fonts.ready.then(() => setLoaded(true))
  }, [])

  return loaded
}
