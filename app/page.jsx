'use client'
import PrivatePage from '@/components/PrivatePage'
import usePoll from '@/hooks/usePoll'
import React from 'react'

const Home = () => {
  const { getPolls, createPoll, updatePoll } = usePoll()
  return (
    <>
      <button
        onClick={() =>
          createPoll({
            title: 'ansh mourya',
            description: 'mourya',
            option: ['one', 'two', 'three'],
          })
        }
      >
        create poll
      </button>
      <br />
      <button onClick={getPolls}>get polls</button>
      <br />
      <button onClick={updatePoll}>update polls</button>
    </>
  )
}

export default PrivatePage(Home)
