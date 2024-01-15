import AccountTab from '@/components/account/Tab'
import AccountNav from '@/components/account/navbar'
import Profile from '@/components/account/profile'
import React from 'react'

const page = () => {
  return (
    <>
      {/* <AccountNav /> */}
      <AccountNav />
      <div className="container max-w-[1000px] py-4">
        <Profile />
        <AccountTab />
      </div>
    </>
  )
}

export default page
