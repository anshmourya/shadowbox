'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { H4, InlineCode } from '../typograph'
import ReadmoreText from '../readmore'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import useVote from '@/hooks/useVote'
import { toast } from 'sonner'
const SinglePoll = ({ poll }) => {
  const queryClient = useQueryClient()
  const { addVote, getCurrentUserVotes } = useVote()
  const { mutate: vote } = useMutation({
    mutationKey: ['add vote'],
    mutationFn: addVote,

    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['polls'] })
      queryClient.invalidateQueries({ queryKey: ['current votes'] })
      if (result) {
        toast.success('vote has been added')
        queryClient.invalidateQueries({ queryKey: ['polls'] })
        queryClient.invalidateQueries({ queryKey: ['current votes'] })
      } else {
        toast.warning('you have been voted here already')
      }
    },
    onError: (err) => console.error(err),
  })

  const {
    data: currentVotes,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['current votes'],
    queryFn: () => getCurrentUserVotes(),
    enabled: !!user,
  })

  const votes = currentVotes?.reduce((poll, vote) => {
    poll.push(vote.poll.$id)
    return poll
  }, [])
  return (
    <>
      <div className="grid gap-3 py-8 border-b px-7" key={poll.$id}>
        <H4>{poll.question}</H4>
        <span>
          <InlineCode className="cursor-pointer">@{poll.user.name}</InlineCode>{' '}
          {format(new Date(), 'MMM, dd')}
        </span>
        {poll.description && (
          <ReadmoreText text={poll.description} maxLength={100} />
        )}
        {/* options */}

        <ul className="my-4 [&>li]:mt-6 ">
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
                  {votes?.includes(poll.$id) && (
                    <span className="text-sm text-muted-foreground">
                      {votePercentage}%
                    </span>
                  )}
                </p>
                {votes?.includes(poll.$id) && (
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
    </>
  )
}

export default SinglePoll
