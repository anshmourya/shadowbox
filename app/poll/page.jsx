'use client'
import React from 'react'
import Navbar from '@/components/navbar'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Options from '@/components/options'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/components/ui/button'
import { pollSchema } from '@/constant/validate'
import usePoll from '@/hooks/usePoll'
import { cn } from '@/lib/utils'
import PrivatePage from '@/components/PrivatePage'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
const Poll = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { createPoll } = usePoll()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      option: [{ label: '' }, { label: '' }],
    },
    resolver: yupResolver(pollSchema),
  })

  const onSubmit = async (data) => {
    const newPoll = await createPoll(data)
    if (newPoll) {
      reset()
      toast.success('new poll created successfully')
      queryClient.invalidateQueries({ queryKey: ['polls'] })
      router.push('/')
    } else {
      toast.error('something went wrong, please try again')
    }
  }

  return (
    <>
      <Navbar />
      <form
        className="container py-4 max-w-[1000px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div>
            <Label>Your Question*</Label>
            <Textarea
              placeholder="Your wiredest question goes here.."
              name="question"
              control={control}
            />
            <p
              className={cn(
                errors.question ? 'visible ' : 'hidden',
                'text-red-500 mt-1',
              )}
            >
              {errors.question?.message || 'nothing'}
            </p>
          </div>
          <div className="my-8">
            <Label>
              Description
              <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              placeholder="Your wiredest question goes here.."
              name="description"
              control={control}
            />
          </div>
        </div>
        {/* options */}
        <div>
          <Label className="flex items-center gap-2">
            Add options{' '}
            <IoMdInformationCircleOutline className="cursor-pointer text-muted-foreground" />
          </Label>
          <Options control={control} errors={errors} />
          <Button type="submit" className="w-full my-6">
            Ask away !
          </Button>
        </div>
      </form>
    </>
  )
}

export default PrivatePage(Poll)
