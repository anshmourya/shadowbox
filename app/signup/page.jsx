'use client'
import { H1 } from '@/components/typograph'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpSchema } from '@/constant/validate'
import { cn } from '@/lib/utils'
import { useAccount } from '@/hooks/useAccount'
const Signup = () => {
  const { createAccount } = useAccount()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
    createAccount(data)
  }
  return (
    <>
      <div className="container grid h-screen place-items-center">
        <form
          className="m-auto max-w-[500px] w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <H1 className="text-center">Signup</H1>
          <div className="my-10">
            <Input
              placeholder="Please enter your email"
              {...register('email')}
            />
            <p
              className={cn(
                errors.name ? 'visible ' : 'hidden',
                'text-red-500 mt-1',
              )}
            >
              {errors.email?.message || 'nothing'}
            </p>
          </div>

          <div className="my-10">
            <Input
              placeholder="Enter your anynomous name :)"
              {...register('name')}
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
              placeholder="Put strong password to keep you safe..."
              type="password"
              {...register('password')}
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

export default Signup
