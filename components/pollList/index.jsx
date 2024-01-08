'use client'
import React from 'react'
import { H4, InlineCode } from '../typograph'
import ReadmoreText from '../readmore'
import { useQuery } from '@tanstack/react-query'
import usePoll from '@/hooks/usePoll'
import PageLoader from '../loader/PageLoader'
import { format } from 'date-fns'
const PollList = () => {
  const { getAllPolls } = usePoll()
  const {
    data: pollData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: 'polls',
    queryFn: getAllPolls,
  })

  if (isError) {
    throw error
  }
  if (isLoading) {
    return <PageLoader />
  }

  return (
    <>
      {pollData.map((poll) => (
        <div className="grid gap-3 py-8 border-b px-7" key={poll.$id}>
          <H4>{poll.question}</H4>
          <span>
            <InlineCode className="cursor-pointer">
              @{poll.user.name}
            </InlineCode>{' '}
            {format(new Date(), 'MMM, dd')}
          </span>
          {poll.description && (
            <ReadmoreText text={poll.description} maxLength={100} />
          )}
          {/* options */}

          <ul className="my-4 [&>li]:mt-6">
            {poll.options.map((option) => (
              <li
                className="relative border rounded-lg option-box"
                key={option.id}
              >
                <p className="flex items-center justify-between px-4 py-2 capitalize rounded-md cursor-pointer option-box md:py-3">
                  {option.label}
                  <span className="text-sm text-muted-foreground">40%</span>
                </p>
                <div
                  className="absolute top-0 bg-[#ffcc85] h-full -z-10 rounded-lg"
                  style={{ width: `${30}%` }}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}

export default PollList
