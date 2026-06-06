import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface ProtocolCardProps {
  number: string
  label: string
  title: string
  subtitle?: string
  description: string
  link?: {
    text: string
    href: string
  }
  className?: string
}

export function ProtocolCard({
  number,
  label,
  title,
  subtitle,
  description,
  link,
  className,
}: ProtocolCardProps) {
  return (
    <Card className={cn("p-6 md:p-8", className)}>
      <div className="flex items-center gap-3 mb-4">
        <span className="flex items-center gap-2 text-xs font-mono text-white/40 tracking-[1px] uppercase">
          <span className="font-bold text-white/60">[ {number} ]</span>
        </span>
        <span className="text-[10px] font-mono text-white/40 tracking-[1px] uppercase">
          {label}
        </span>
      </div>
      <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground tracking-tight mb-3 leading-[1.05]">
        {title}
      </h3>
      {subtitle && (
        <p className="text-white/50 text-sm md:text-base font-mono mb-4">
          {subtitle}
        </p>
      )}
      <p className="text-white/55 text-sm md:text-base leading-relaxed mb-6">
        {description}
      </p>
      {link && (
        <a
          href={link.href}
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.1em] text-white/70 hover:text-white transition-colors duration-200"
        >
          {link.text} <span className="text-white/40">&rarr;</span>
        </a>
      )}
    </Card>
  )
}
