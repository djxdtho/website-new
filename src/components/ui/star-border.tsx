"use client"

interface StarBorderProps {
  children: React.ReactNode
  className?: string
  color?: string
  speed?: string
  as?: React.ElementType<any>
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

export function StarBorder({
  children,
  className = "",
  color = "rgba(255,255,255,0.12), rgba(255,255,255,0.02), rgba(255,255,255,0.12)",
  speed = "8s",
  as: Component = "div",
  ...props
}: StarBorderProps) {
  const El = Component as React.ComponentType<{ className?: string; children?: React.ReactNode }>
  return (
    <El
      className={`star-border-container ${className}`}
    >
      <div
        className="border-gradient-full"
        style={{
          background: `conic-gradient(from 0deg, transparent, ${color}, transparent)`,
          animationDuration: speed,
        }}
      />
      <div className="inner-content">{children}</div>
    </El>
  )
}
