import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Activites from '@/components/account/Tab/Activites'
import UserPoll from '@/components/account/Tab/userPoll'

const AccountTab = () => {
  return (
    <Tabs defaultValue="2">
      <TabsList>
        <TabsTrigger value="1" className="w-full" disabled>
          Activites
        </TabsTrigger>
        <TabsTrigger value="2" className="w-full">
          My Poll
        </TabsTrigger>
      </TabsList>
      <TabsContent value="1">
        <Activites />
      </TabsContent>
      <TabsContent value="2">
        <UserPoll />
      </TabsContent>
    </Tabs>
  )
}

export default AccountTab
