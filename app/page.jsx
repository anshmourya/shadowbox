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
