import React from 'react'

import { Avatar, TextareaAutosize } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import socket from '../../../websocket/wb'
import whatsappDate from 'date-and-time'

const ChatRoom = ({ googleUsername }) => {
 const urlParam = useParams()
 let history = useHistory()
 const { roomId } = urlParam
 const [messageHeader, setMessageHeader] = React.useState('')
 const [messages, setMessages] = React.useState('')
 const [myValue, setValue] = React.useState('')

 // Set Images of group chat
 // Fetch data for Group
 React.useEffect(() => {
  socket.open()
  socket.emit('get_group_by_id', roomId)
  socket.on('get_group_with_id', message => {
   setMessageHeader(message.name)
  setMessages(message)
  })
 }, [roomId])
 // Fetch data for Group

 // Sumbit message to Server

 const handleSubmit = e => {
  e.preventDefault()

  if (myValue.trim().length >= 1) {
   socket.emit('send_chat_message', {
    name: googleUsername,
    message: myValue,
    _id: roomId,
   })
  }
  setValue('')
 }

 // this makes the app real time
 //  /Through the app of socket io, this allows you to see the message you sent immediately
 React.useEffect(() => {
  socket.open()
  socket.emit('get_last_sent_message_foreach_group')
  socket.on('get_last_sent_message_foreach_group', chatMessage => {
    console.log(chatMessage)
   setMessages(prevMessage => ({
    user: [...(prevMessage.user || []), chatMessage[0]],
   }))
  })
 }, [])

 return (
  <div className="chatBodyMessage ">
   <div className="chat-header   flex justify-between items-center bg-header h-14 py-8 pl-1 pr-2">
    {/* back icon and  avatar and name of groupssss  */}
    <div className="flex items-center">
     {/* Go back icon */}
     <div className="icon " onClick={history.goBack}>
      <svg
       className="h-6 w-6 text-white"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
      >
       {' '}
       <line x1="19" y1="12" x2="5" y2="12" />{' '}
       <polyline points="12 19 5 12 12 5" />
      </svg>
     </div>
     {/* Go back icon */}

     {/* Avatar */}
     {/* back icon and  avatar*/}
     <Avatar src={`https://picsum.photos/200/300`} />

     {/* name of Group Chat */}
     <div className="pl-2">
      <h2 className="font-semibold truncate w-48 lg:w-72 lg:text-xl capitalize leading-5 text-base text-white ">
       {messageHeader}
      </h2>
     </div>
     {/* name of Group Chat */}
    </div>

    {/* Icons to the right */}
    <div className="flex">
     <span className="pr-3">
      <svg
       className="h-5 w-5 text-gray-300"
       width="24"
       height="24"
       viewBox="0 0 24 24"
       strokeWidth="2"
       stroke="currentColor"
       fill="none"
       strokeLinecap="round"
       strokeLinejoin="round"
      >
       {' '}
       <path stroke="none" d="M0 0h24v24H0z" />{' '}
       <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />{' '}
       <path d="M15 6h6m-3 -3v6" />
      </svg>
     </span>

     <span>
      <svg
       className="h-5 w-5 text-gray-300"
       viewBox="0 0 24 24"
       fill="none"
       stroke="currentColor"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
      >
       {' '}
       <circle cx="12" cy="12" r="1" /> <circle cx="12" cy="5" r="1" />{' '}
       <circle cx="12" cy="19" r="1" />
      </svg>
     </span>
    </div>
    {/* Icons to the right */}
   </div>
   {/*Body  */}

   <div className="conversation ">
    <div className="conversation-container pt-10 px-4">
      
     {messages.user !== undefined ? 
      messages.user.map((user) => {
        const {  name,message, _id, date } = user !== undefined && user
        console.log(user)
        const currentUserName = name
       const isMessageFromCurrentUser = googleUsername === currentUserName
       const dateOfMessage = new Date(date)
       
       return (
        <div
         className={`message  relative mb-2 ${
          isMessageFromCurrentUser ? 'sent' : 'received'
         }`}
         key={_id}
        >
         {message}
         <span className="absolute text-xs -top-4 truncate left-0 text-green-700 font-bold capitalize  w-24">
          {!isMessageFromCurrentUser && currentUserName}
         </span>
         <span className="metadata">
          <span className="time">
           {whatsappDate.format(dateOfMessage, 'hh:mm')}
          </span>
          <span className="tick">
           <svg
            className="h-4 w-4 text-gray-400 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
           >
            <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M5 13l4 4L19 7"
            />
           </svg>
          </span>
         </span>
        </div>
       )
      })
      :''
      }
    </div>

    <form className="input-area " onSubmit={handleSubmit}>
     <div className="input">
      <div className="smiley animated bounceIn">
       <i className="far fa-smile"></i>
      </div>
      <div className="text-input">
       <TextareaAutosize
        onChange={e => setValue(e.target.value)}
        value={myValue}
        placeholder="Type a message"
        className="outline-none"
       />
      </div>
      <div className="attachment animated bounceIn">
       <svg
        className="h-5 w-5 text-gray-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
       >
        {' '}
        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
       </svg>
      </div>
      <div className="camera animated bounceIn">
       <svg
        className="h-5 w-5 text-gray-500"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
       >
        {' '}
        <path stroke="none" d="M0 0h24v24H0z" />{' '}
        <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />{' '}
        <circle cx="12" cy="13" r="3" />
       </svg>
      </div>
     </div>

     <div className="mic-button outline-none">
      <button
       className=" w-12 h-12 flex items-center justify-center outline-none "
       type="submit"
      >
       <span>
        {myValue.trim().length >= 1 ? (
         <svg
          className="h-6 w-6 outline-none text-white transform rotate-45"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
         >
          {' '}
          <path stroke="none" d="M0 0h24v24H0z" />{' '}
          <line x1="10" y1="14" x2="21" y2="3" />{' '}
          <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
         </svg>
        ) : (
         <svg
          className="h-5 w-5 text-white outline-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
         >
          <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth="2"
           d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
         </svg>
        )}
       </span>
      </button>
     </div>
    </form>
   </div>
   {/* text area */}
  </div>
 )
}

export default ChatRoom
