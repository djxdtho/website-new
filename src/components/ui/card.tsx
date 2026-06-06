import * as React from "react"
import { cn } from "@/lib/utils"

export const CornerBrackets = ({ className }: { className?: string }) => (
  <div className={cn("absolute inset-0 pointer-events-none", className)} aria-hidden="true">
    <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-white/20" />
    <div className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-white/20" />
    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-white/20" />
    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-white/20" />
  </div>
)

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative bg-card text-card-foreground border border-white/[0.06] card-grid card-glow",
      className,
    )}
    {...props}
  >
    <CornerBrackets />
    {props.children}
  </div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight font-display",
      className,
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
