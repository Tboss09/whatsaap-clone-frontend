import React from 'react'

// external files
import { Avatar } from '@material-ui/core'
// external files
// internal files
import Tabs from './Tabs'
const HomePage = ({ user }) => {
 const { photoURL } = user
 return (
  <>
   {/* Headers */}
   <div className="App_header  items-start pt-6 bg-header h-24 px-4 flex justify-between">
     <Avatar className="text-sm" src={photoURL} />
     <div>
      <p className="text-lg font-normal text-white">WhatsApp</p>
     </div>
    {/* Icons */}

    <div className="flex">
     <span className="pr-4">
      <svg
       xmlns="http://www.w3.org/2000/svg"
       className="h-6 text-white w-6"
       fill="none"
       viewBox="0 0 24 24"
       stroke="currentColor"
      >
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
       />
      </svg>
     </span>

     <span>
      <svg
       xmlns="http://www.w3.org/2000/svg"
       className="h-6 text-white w-6"
       fill="none"
       viewBox="0 0 24 24"
       stroke="currentColor"
      >
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
       />
      </svg>
     </span>
    </div>
    {/* Icons */}
   </div>

   {/* tabs */}
   <Tabs />
   {/* tabs */}
  </>
 )
}

export default HomePage
