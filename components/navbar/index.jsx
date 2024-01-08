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
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
const Navbar = () => {
  const router = useRouter()
  return (
    <div className="container flex justify-between px-6 py-2 max-w-[1000px] max-lg:border-b items-center sticky top-0  z-10 backdrop-blur-sm border-b">
      <Link href="/">
        <div className="logo">SHADOWBOX</div>
      </Link>
      <div>
        <Button
          className="mx-4 max-md:hidden"
          onClick={() => router.push('/poll')}
        >
          Create poll
        </Button>
        <Popover>
          <PopoverTrigger>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://githubd.com/shadcn.png" />
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
    </div>
  )
}

export default Navbar
