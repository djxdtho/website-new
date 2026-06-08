'use client'

import { useEffect, useState } from 'react'

interface SplineSceneProps {
  scene: string
  className?: string
}

function SplineFallback() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-white/[0.03] to-transparent relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/[0.06] animate-float"
            style={{
              width: `${100 + i * 60}px`,
              height: `${100 + i * 60}px`,
              top: `${5 + i * 8}%`,
              left: `${5 + i * 12}%`,
              animationDelay: `${-i * 0.36}s`,
              willChange: "transform",
            }}
          />
        ))}
        {[
          [12, 84], [68, 16], [34, 62], [82, 44], [21, 76],
          [56, 28], [44, 92], [74, 52], [8, 38], [92, 68],
          [38, 14], [62, 48],
        ].map(([t, l], i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-[2px] h-[2px] rounded-full bg-white/[0.06]"
            style={{
              top: `${t}%`,
              left: `${l}%`,
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
    if (!result.ok) {
      console.log('[Spline] WebGL2 not available, using fallback')
      return
    }
    setShowSpline(true)
  }, [])

  if (!showSpline) {
    console.log('[Spline] Rendering fallback (WebGL2 unavailable)')
    return <SplineFallback />
  }

  return <SplineLoader scene={scene} className={className} />
}

function SplineLoader({ scene, className }: SplineSceneProps) {
  const [Comp, setComp] = useState<React.ComponentType<{ scene: string }> | null>(null)
  const [errored, setErrored] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    let cancelled = false
    const timeout = setTimeout(() => {
      if (!cancelled && !Comp) {
        console.log('[Spline] Loading timeout (5s)')
        setTimedOut(true)
      }
    }, 5000)
    import('@splinetool/react-spline').then((mod) => {
      if (!cancelled) {
        console.log('[Spline] Import succeeded')
        setComp(() => mod.default)
        clearTimeout(timeout)
      }
    }).catch((err) => {
      if (!cancelled) {
        console.log('[Spline] Import failed:', String(err).substring(0, 200))
        setErrored(true)
        clearTimeout(timeout)
      }
    })
    return () => { cancelled = true; clearTimeout(timeout) }
  }, [])

  if (errored || timedOut) {
    console.log('[Spline] Rendering fallback (error/timeout)')
    return <SplineFallback />
  }
  if (!Comp) return <SplineFallback />

  return (
    <div className={className} style={{ willChange: "transform" }}>
      <Comp scene={scene} />
    </div>
  )
}
