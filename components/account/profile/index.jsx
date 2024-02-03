import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { H5, P } from '@/components/typograph'
import { LiaPollSolid } from 'react-icons/lia'
import { MdOutlineComment } from 'react-icons/md'
import { MdOutlineHowToVote } from 'react-icons/md'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const Profile = () => {
  return (
    <>
      <div className="relative">
        <div className="flex items-center justify-between">
          <Avatar className="w-16 h-16">
            <AvatarImage src="https://githubd.com/shadcn.png" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <P className="font-semibold text-center max-sm:text-sm">0 poll</P>
          <P className="font-semibold text-center max-sm:text-sm">0 Follower</P>
          <P className="font-semibold text-center max-sm:text-sm">
            0 Following
          </P>
        </div>
        {/* votes information */}
        <div className="flex items-center justify-around py-10">
          <P className="flex items-center gap-2 text-center max-sm:text-sm">
            <MdOutlineHowToVote /> 0 votes
          </P>
          <P className="flex items-center gap-2 text-center max-sm:text-sm">
            <MdOutlineComment /> 0 comments
          </P>
          <P className="flex items-center gap-2 text-center max-sm:text-sm">
            <LiaPollSolid /> 0 polls
          </P>
        </div>
        <Button className="w-full option-box" variant="secondary">
          Share Profile
        </Button>
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full backdrop-blur-sm">
          {' '}
          <H5>This will be live soon</H5>
        </div>
      </div>
      <Separator className="mt-10" />
    </>
  )
}

export default Profile
