'use client'
import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Input } from '../ui/input'
import { useFieldArray } from 'react-hook-form'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
const Options = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'option',
  })

  const appendOptions = () => {
    if (fields.length < 4) {
      append({ label: '' })
    } else {
      toast("Can't have more than 4 options.")
    }
  }
  const removeOptions = (index) => {
    if (fields.length > 2) {
      remove(index)
    } else {
      toast('You need at least 2 options to have a poll.')
    }
  }

  return (
    <>
      <div className="grid gap-4 ">
        {fields.map((field, index) => {
          const error = errors?.options?.[index]?.label
          return (
            <div key={field.id} className="relative">
              <Input
                control={control}
                name={`option[${index}].label`}
                placeholder={`Option ${index + 1}`}
                className={error ? 'border-red-500' : ''}
              />
              <RxCross2
                className="absolute border border-black rounded-full cursor-pointer -right-1 -top-2"
                onClick={() => removeOptions(index)}
              />
              <p
                className={cn(
                  error ? 'visible' : 'hidden',
                  'text-red-500 mt-1',
                )}
              >
                {error?.message || 'nothing'}
              </p>
            </div>
          )
        })}
        <Button
          type="button"
          onClick={appendOptions}
          variant="link"
          className="flex justify-end"
        >
          add more +
        </Button>
      </div>
    </>
  )
}

export default Options
