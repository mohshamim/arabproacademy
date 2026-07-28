import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-navy outline-none transition-colors placeholder:text-gray-500 focus:border-gold",
        className
      )}
      {...props}
    />
  )
}

export { Input }
