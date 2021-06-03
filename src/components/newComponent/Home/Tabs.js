import React, { useState } from 'react'
import { Tabs } from 'react-simple-tabs-component'
import ChatGroups from '../Chats/ChatGroups'
// Component Example

// Component Example
const TabTwo = () => {
 return (
  <>
   
   <p className ="text-center pt-36">
     Feature coming soon 😊✌
   </p>
  </>
 )
}

// Component Example
const TabThree = () => {
 return (
  <>
   
   <p className ="text-center pt-36">
     Feature coming soon 😊✌
   </p>
  </>
 )
}

// Tabs structure Array
const tabs = [
 {
  label: 'Chats', // Tab title
  index: 1, // Tab index
  Component: ChatGroups, // Tab Component
 },
 {
  label: 'Status',
  index: 2,
  Component: TabTwo,
 },
 {
  label: 'Calls',
  index: 3,
  Component: TabThree,
 },
]

export default function TabsComponent() {
 const [selectedTab, setSelectedTab] = useState(tabs[0].index)
 return (
  <div>
   <Tabs tabs={tabs} onClick={setSelectedTab} selectedTab={selectedTab} />
  </div>
 )
}
