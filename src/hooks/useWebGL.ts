'use client'

import { useEffect, useState } from 'react'

export function useWebGL(): boolean | null {
  const [available, setAvailable] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      setAvailable(
        !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl2') || canvas.getContext('webgl'))
        ),
      )
    } catch {
      setAvailable(false)
    }
  }, [])

  return available
}
