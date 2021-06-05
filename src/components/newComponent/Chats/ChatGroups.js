import React from 'react'

// external file
import { Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'

// internal file
import socket from '../../../websocket/wb'
import whatsappDate from 'date-and-time'
import ThemeContext from '../../Context/ThemeContext'

const ChatGroups = () => {
 const google = React.useContext(ThemeContext)

 //About to add new groups
 const [showAddNewGroup, setShowAddNewGroup] = React.useState(false)
 //  get the chat rooms
 const [chatRooms, setChatRooms] = React.useState(undefined)

 React.useEffect(() => {
  socket.open()
  socket.emit('get_all_whatsapp_group')
  socket.on('get_data', message => {
    console.log(message)
   setChatRooms(message)
  })
  return () => socket.close()
 }, [])

 //  Form
 const initialState = {
  name: '',
 }

 const [group, setGroup] = React.useState(initialState)
 //  Form
 //  Submit new group
 const handleSubmit = e => {
  const { name } = group
  e.preventDefault()
  if (name.trim().length >= 1) {
   socket.emit('create_new_group', { name, user: [] })
   setGroup(initialState)
   setShowAddNewGroup(false)
  }
 }
 const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 5, 3, 2, 3, 4, 4, 4, 6, 4, 3]

 React.useEffect(() => {
  socket.on('newly_created_group', message => {
   setChatRooms(oldChatRoom => [message, ...oldChatRoom])
  })
 }, [])

 return (
  <>
   {!showAddNewGroup ? (
    <div className="relative chatGroup-container transition ease-linear delay-300 ">
     <div
      className={`" ${
       chatRooms !== undefined ? 'bg-green-400' : 'bg-gray-300 animate-bounce'
      } fixed z-50  bottom-10 right-5 flex justify-center items-center w-12   h-12 rounded-full "`}
      onClick={() => setShowAddNewGroup(true)}
     >
      {chatRooms !== undefined ? (
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
      ) : (
       ''
      )}
     </div>
     {chatRooms !== undefined ? (
      chatRooms.map(({ name, updatedAt, _id, user }) => {
       const message = user !== undefined && user[user.length - 1]
       console.log(message)
       const timeOfMessage = new Date(updatedAt)
       const dateOfMessage =
        timeOfMessage.getMilliseconds() < new Date().getMilliseconds()
         ? whatsappDate.format(timeOfMessage, 'hh:mm')
         : whatsappDate.format(timeOfMessage, ' hh:mm')

       return (
        <Link key={_id} to={`/chatroom/${_id}`}>
         <div className="chatGroup"  key={_id}>
          <div className="flex items-center">
           <Avatar
            src="https:picsum.photos/500/500"
            className="object-contain"
           />

           <div className="pl-3">
            <h2 className="text-base w-56 truncate font-semibold capitalize leading-7 ">
             {name}
            </h2>

            <p
             className={`font-normal text-base truncate ${
              message !== undefined
               ? ' w-56 text-gray-600'
               : 'text-gray-300 font-light italic'
             } `}
            >
             {message !== undefined
              ? `${message.name !== google.name ? message.name + ':' : ''} ${
                 message.message
                } `
              : 'Tap to start a conversation'}
            </p>
           </div>
          </div>
          <div className="text-xs self-start">
           {dateOfMessage !== undefined ? dateOfMessage : '00:00'}
          </div>
         </div>
        </Link>
       )
      })
     ) : (
      <div className="skeleton mx-2 bg-gray-50 h-full">
       {skeleton.map(skeleton => (
        <>
         {/* Skeleton to load when data is not available */}
         <div
          key={skeleton}
          className="flex items-center mb-2 h-24 w-full justify-evenly animate-pulse  border-b-2 border-gray-300"
         >
          <div className="image h-10 w-10 bg-gray-300 rounded-full"></div>
          <div>
           <div className="image h-8 w-60 bg-gray-300 mb-2"></div>
           <div className="image h-3 w-32 bg-gray-200 "></div>
          </div>
          {/* time */}
          <div className="image h-3 w-6 bg-gray-300 self-center"></div>
          {/* time */}
         </div>
        </>
       ))}
      </div>
     )}
    </div>
   ) : (
    <form
     className="z-50 px-2  shadow-xl py-2 h-52 fixed top-24 
    mx-4  w-11/12 flex flex-col  bg-white rounded"
     onSubmit={handleSubmit}
    >
     <div className="text-center pb-4 text-lg text-header font-normal relative">
      <p>Add a New Group</p>

      {/* Close Icon */}
      <svg
       className="h-6 w-6 text-green-400 absolute right-0 top-0 outline-none focus:outline-none"
       width="24"
       height="24"
       viewBox="0 0 24 24"
       strokeWidth="2"
       stroke="currentColor"
       fill="none"
       strokeLinecap="round"
       strokeLinejoin="round"
       onClick={() => setShowAddNewGroup(false)}
      >
       {' '}
       <path stroke="none" d="M0 0h24v24H0z" />{' '}
       <line x1="18" y1="6" x2="6" y2="18" />{' '}
       <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
      {/* Close Icon */}
     </div>

     <div className=" flex justify-around w-full  items-center ">
      <div>
       <input
        type="text"
        className=" rounded-lg  transition ease-in duration-200 border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent"
        placeholder="Type group subject here"
        value={group.name}
        onChange={e => setGroup({ ...group, name: e.target.value })}
       />
      </div>
     </div>

     {/* Optional text mesage */}
     <p className="text-gray-500 font-normal text-xs pl-4 pt-4">
      Provide a group subject and optional group icon
     </p>
     {/* Optional text mesage */}

     {/* submit button */}
     <div className="self-end mt-2">
      <button className="bg-green-400 transition ease-in duration-200 rounded-full h-12 w-12 flex justify-center items-center ">
       <svg
        className="h-7 w-7 text-white"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLineJoin="round"
       >
        {' '}
        <path stroke="none" d="M0 0h24v24H0z" /> <path d="M5 12l5 5l10 -10" />
       </svg>
      </button>
     </div>
    </form>
   )}
  </>
 )
}

export default ChatGroups
