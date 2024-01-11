'use client'
import React from 'react'
import { H1 } from '@/components/typograph'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInSchema } from '@/constant/validate'
import { cn } from '@/lib/utils'
import { useAccount } from '@/hooks/useAccount'
import useAuth from '@/context/Auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Signin = () => {
  const router = useRouter()
  const { user, fetchUser } = useAuth()
  const { createSession } = useAccount()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      name: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    if (!user) {
      await createSession(data.name, data.password)
      fetchUser()
      router.push('/')
    } else {
      console.log('this is user', user)
      toast.error("You're already logged in.", {
        action: {
          label: 'go home',
          onClick: () => router.push('/'),
        },
      })
    }
  }
  return (
    <>
      <div className="container flex items-center h-screen">
        <form
          className="m-auto max-w-[500px] w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <H1 className="text-center">SignIn</H1>
          <div className="my-10">
            <Input
              placeholder="Please enter your userName"
              control={control}
              name="name"
            />
            <p
              className={cn(
                errors.name ? 'visible ' : 'hidden',
                'text-red-500 mt-1',
              )}
            >
              {errors.name?.message || 'nothing'}
            </p>
          </div>

          <div>
            <Input
              placeholder="Enter your password..."
              type="password"
              name="password"
              control={control}
            />
            <p
              className={cn(
                errors.password ? 'visible' : 'hidden',
                'text-red-500 mt-1',
              )}
            >
              {errors.password?.message || 'nothing'}
            </p>
          </div>
          <div className="flex justify-center my-10">
            <Button>Let&apos;s goo!!!</Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signin
