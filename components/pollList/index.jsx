'use client'
import React, { useState } from 'react'
import { H4, InlineCode } from '../typograph'
import ReadmoreText from '../readmore'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import usePoll from '@/hooks/usePoll'
import PageLoader from '../loader/PageLoader'
import { format } from 'date-fns'
import useVote from '@/hooks/useVote'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import useAuth from '@/context/Auth'
const PollList = () => {
  const { user } = useAuth()
  const { getAllPolls } = usePoll()
  const { addVote, getCurrentUserVotes } = useVote()
  const queryClient = useQueryClient()
  const { mutate: vote } = useMutation({
    mutationKey: ['add vote'],
    mutationFn: addVote,

    onSuccess: (result) => {
      result
        ? toast.success('vote has been added')
        : toast.warning('you have been voted here already')
    },
    onError: (err) => console.error(err),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['polls'] })
      queryClient.invalidateQueries({ queryKey: ['current votes'] })
    },
  })

  const {
    data: pollData,
    isLoading: pollLoading,
    error: pollError,
    isError: pollDataErrorStatus,
  } = useQuery({
    queryKey: ['polls'],
    queryFn: getAllPolls,
  })

  const {
    data: currentVotes,
    isLoading: currentVotesLoading,
    error: currentvotesError,
    isError: currentvotesErrorStatus,
  } = useQuery({
    queryKey: ['current votes'],
    queryFn: getCurrentUserVotes,
    enabled: !!user,
  })

  if (pollDataErrorStatus) {
    console.error(pollError)
    throw new Error("can't get the polls, something went wrong.")
  }
  if (pollLoading) {
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
            {poll.option.map((option) => {
              const votePercentage = (
                (option.vote.length / (poll.vote.length || 1)) *
                100
              ).toFixed()

              return (
                <li
                  className="relative border rounded-lg option-box"
                  key={option.$id}
                  onClick={() => vote({ poll: poll.$id, option: option.$id })}
                >
                  <p className="flex items-center justify-between px-4 py-2 capitalize rounded-md cursor-pointer option-box md:py-3">
                    {option.label}
                    {currentVotes?.includes(poll.$id) && (
                      <span className="text-sm text-muted-foreground">
                        {votePercentage}%
                      </span>
                    )}
                  </p>
                  {currentVotes?.includes(poll.$id) && (
                    <motion.div
                      className="absolute top-0 bg-[#ffcc85] h-full -z-10 rounded-lg w-[30%]"
                      initial={{ width: 0 }}
                      animate={{ width: votePercentage + '%' }}
                      transition={{ duration: 2 }}
                    ></motion.div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </>
  )
}

export default PollList
