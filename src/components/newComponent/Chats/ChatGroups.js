import { Avatar } from '@material-ui/core'
import React from 'react'
import socket from '../../../websocket/wb'
import { Link } from 'react-router-dom'
import whatsappDate from 'date-and-time'

//  internal files

const ChatGroups = () => {
 const [chatRooms, setChatRooms] = React.useState(undefined)

 React.useEffect(() => {
  socket.emit('get_all_whatsapp_group')
  socket.on('get_data', message => {
   message && setChatRooms(message)
  })
  return () => socket.close()
 }, [])
 const handleNewGroup = () => {
  const nameOfGroup = prompt('Please Enter Name Of Group you want to create ')
  nameOfGroup &&
   socket.emit('create_new_group', {
    name: nameOfGroup,
    user: [],
   })
 }

 return (
  <div className="relative">
   <div
    className="bg-green-400 fixed z-50  bottom-10 right-5 flex justify-center items-center w-12   h-12 rounded-full "
    onClick={handleNewGroup}
   >
    <svg
     className="h-5 w-5 text-white"
     fill="none"
     viewBox="0 0 24 24"
     stroke="currentColor"
    >
     <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4v16m8-8H4"
     />
    </svg>
   </div>
   {chatRooms !== undefined &&
    chatRooms.map(({ name, date, _id }) => {
     const timeOfMessage = new Date(date)
     const dateOfMessage =
      timeOfMessage.getMilliseconds() < new Date().getMilliseconds()
       ? whatsappDate.format(timeOfMessage, 'hh:mm')
       : whatsappDate.format(timeOfMessage, ' hh:mm')

     return (
      <Link key={_id} to ={`/chatroom/${_id}`}>
       <div className="chatGroup  px-3 h-20  py-6 rounded-t-sm   flex justify-between items-center ">
        <div className="flex items-center">
         <Avatar
          src={`https:picsum.photos/500/500`}
          className="object-contain"
         />
         <div className="pl-3">
          <h2 className="text-sm font-semibold capitalize leading-5 ">{name}</h2>

          <p className="text-sm text-gray-800 ">How is it going</p>
         </div>
        </div>

        <div className="text-xs self-start">{dateOfMessage}</div>
       </div>
      </Link>
     )
    })}
  </div>
 )
}

export default ChatGroups
