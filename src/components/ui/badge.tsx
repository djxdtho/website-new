import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center border px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-white/20 bg-white text-black",
        secondary: "border-white/10 bg-black text-white/60",
        outline: "border-white/20 text-white",
        destructive: "border-white/20 bg-white text-black",
      },
    },
    defaultVariants: { variant: "default" },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
