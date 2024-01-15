import React from 'react'
import Link from 'next/link'
import { LuPencilLine } from 'react-icons/lu'
import { BsThreeDotsVertical } from 'react-icons/bs'
const AccountNav = () => {
  return (
    <div className="container flex justify-between px-6 py-2 max-w-[1000px] max-lg:border-b items-center backdrop-blur-sm border-b">
      <Link href="/">
        <div className="logo">SHADOWBOX</div>
      </Link>
      <div className="flex gap-5 text-xl">
        <LuPencilLine className="cursor-pointer" />
        <BsThreeDotsVertical className="cursor-pointer" />
      </div>
    </div>
  )
}

export default AccountNav
