import React from 'react'
import { MdOutlinePoll } from 'react-icons/md'
import { VscAccount } from 'react-icons/vsc'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Link from 'next/link'
import Logout from '../logout'

const Navbar = () => {
  return (
    <div className="container flex justify-between px-6 py-4 max-w-[1000px] max-lg:border-b items-center">
      <Link href="/">
        <div className="logo">SHADOWBOX</div>
      </Link>
      <Popover>
        <PopoverTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[100px]">
          <ul className="my-4 [&>li]:mt-2">
            <Logout />
            <li className="flex items-center gap-2 cursor-pointer">
              <MdOutlinePoll />
              <Link href="/poll">Create Poll</Link>
            </li>
            <li className="flex items-center gap-2 cursor-pointer">
              <VscAccount />
              Account
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Navbar
