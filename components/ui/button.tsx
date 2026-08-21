import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 touch-manipulation disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring max-sm:whitespace-normal sm:whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "bg-gold text-navy shadow-lg shadow-gold/30 hover:bg-gold-light hover:scale-105 max-sm:hover:scale-100",
        secondary:
          "bg-navy text-white hover:bg-navy-mid",
        outline:
          "border-2 border-teal text-teal hover:bg-teal/20 hover:text-white",
        ghost: "hover:bg-white/10 text-gray-300 hover:text-gold",
        whatsapp:
          "border-2 border-teal text-teal hover:bg-teal/20 hover:text-white",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-5 py-2 text-sm",
        lg: "min-h-12 px-6 py-3 text-sm font-bold sm:h-14 sm:px-10 sm:py-4 sm:text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
