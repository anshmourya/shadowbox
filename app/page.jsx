'use client'
import React from 'react'
import PrivatePage from '@/components/PrivatePage'
import Navbar from '@/components/navbar'
import PollList from '@/components/pollList'

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container max-w-[1000px] border-r border-l p-0">
        <PollList />
      </div>
    </>
  )
}

export default PrivatePage(Home)
// <button
//       onClick={() =>
//         createPoll({
//           question: 'test2',
//           description: 'mourya',
//           options: [{ label: 'one' }, { label: 'two' }, { label: 'three' }],
//         })
//       }
//     >
//       create poll
//     </button>
//     <br />
//     <button onClick={getPolls}>get polls</button>
//     <br />
//     <button
//       onClick={() =>
//         updatePoll(
//           {
//             // question: 'ansh mourya',
//             // description: 'mourya',
//             label: 'four',
//           },
//           '6598e24f70d496c9f1e7',
//         )
//       }
//     >
//       update polls
//     </button>
