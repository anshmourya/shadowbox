import * as React from 'react'

import { cn } from '@/lib/utils'
import { useController } from 'react-hook-form'
const Textarea = React.forwardRef(
  ({ name, control, className, ...props }, ref) => {
    const { field } = useController({
      name,
      control,
    })
    return (
      <div>
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...field}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
