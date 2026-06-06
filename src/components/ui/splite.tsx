'use client'

import { useEffect, useState } from 'react'

interface SplineSceneProps {
  scene: string
  className?: string
}

function SplineFallback() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-white/[0.02] to-transparent relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/[0.04] animate-float"
            style={{
              width: `${100 + i * 60}px`,
              height: `${100 + i * 60}px`,
              top: `${5 + i * 8}%`,
              left: `${5 + i * 12}%`,
              animationDelay: `${-i * 1.8}s`,
              animationDuration: `${12 + i * 2}s`,
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white/[0.03]"
            style={{
              top: `${10 + (i * 17) % 80}%`,
              left: `${15 + (i * 23) % 70}%`,
              animation: `pulse ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${-i * 0.4}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function checkWebGL2(): { ok: boolean; info: string } {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2')
    if (gl instanceof WebGL2RenderingContext) {
      const renderer = gl.getParameter(gl.RENDERER)
      const vendor = gl.getParameter(gl.VENDOR)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      return { ok: true, info: `${vendor} | ${renderer}` }
    }
    return { ok: false, info: 'webgl2 context returned null' }
  } catch (e) {
    return { ok: false, info: String(e) }
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [showSpline, setShowSpline] = useState(false)

  useEffect(() => {
    const result = checkWebGL2()
    console.log('[Spline] WebGL 2.0 check:', result.ok, '|', result.info)
    if (!result.ok) return
    setShowSpline(true)
  }, [])

  if (!showSpline) return <SplineFallback />

  return <SplineLoader scene={scene} className={className} />
}

function SplineLoader({ scene, className }: SplineSceneProps) {
  const [Comp, setComp] = useState<React.ComponentType<{ scene: string }> | null>(null)
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    let cancelled = false
    import('@splinetool/react-spline').then((mod) => {
      if (!cancelled) {
        console.log('[Spline] Import succeeded')
        setComp(() => mod.default)
      }
    }).catch((err) => {
      if (!cancelled) {
        console.log('[Spline] Import failed:', String(err).substring(0, 200))
        setErrored(true)
      }
    })
    return () => { cancelled = true }
  }, [])

  if (errored) return <SplineFallback />
  if (!Comp) return <SplineFallback />

  return (
    <div className={className}>
      <Comp scene={scene} />
    </div>
  )
}
