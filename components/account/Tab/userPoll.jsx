'use client'
import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import usePoll from '@/hooks/usePoll'
import PageLoader from '@/components/loader/PageLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import SinglePoll from '@/components/poll'
import Skeleton from '@/components/skeleton'
const UserPoll = () => {
  const { getUserPoll } = usePoll()
  const {
    data: pollData,
    error: pollError,
    isError: pollDataErrorStatus,
    fetchNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['UserPoll'],
    queryFn: getUserPoll,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.$id,
  })
  if (pollDataErrorStatus) {
    console.error(pollError)
    throw new Error("can't get the polls, something went wrong.")
  }
  if (status == 'pending') {
    return <PageLoader />
  }

  const polls = pollData.pages.reduce((acc, page) => {
    return [...acc, ...page]
  }, [])
  const lastPage = pollData.pages[pollData.pages.length - 1].length > 0
  return (
    <>
      <InfiniteScroll
        hasMore={lastPage}
        loader={<Skeleton />}
        next={fetchNextPage}
        dataLength={polls.length || 0}
        endMessage={<p>No more data to load.</p>}
      >
        {polls.map((poll) => (
          <SinglePoll key={poll.$id} poll={poll} />
        ))}
      </InfiniteScroll>
    </>
  )
}

export default UserPoll
