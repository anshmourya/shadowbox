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
            question: 'test2',
            description: 'mourya',
            options: [{ label: 'one' }, { label: 'two' }, { label: 'three' }],
          })
        }
      >
        create poll
      </button>
      <br />
      <button onClick={getPolls}>get polls</button>
      <br />
      <button
        onClick={() =>
          updatePoll(
            {
              // question: 'ansh mourya',
              // description: 'mourya',
              label: 'four',
            },
            '6598e24f70d496c9f1e7',
          )
        }
      >
        update polls
      </button>
    </>
  )
}

export default PrivatePage(Home)
