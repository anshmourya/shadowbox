import * as React from 'react'

import { cn } from '@/lib/utils'
import { useController } from 'react-hook-form'
const Input = React.forwardRef(
  ({ name, control, className, type, ...props }, ref) => {
    const { field } = useController({
      name,
      control,
    })
    return (
      <div>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 outline-none',
            className,
          )}
          ref={ref}
          {...field}
          {...props}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
