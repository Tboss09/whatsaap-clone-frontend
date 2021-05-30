import React from 'react'

import { Avatar, TextareaAutosize } from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import socket from '../../../websocket/wb'
import whatsappDate from 'date-and-time'

const ChatRoom = ({ googleUsername }) => {
 const urlParam = useParams()
 let history = useHistory()
 const { roomId } = urlParam
 const [messages, setMessages] = React.useState('')
 const [myValue, setValue] = React.useState('')

 // Set Images of group chat
 // Fetch data for Group
 React.useEffect(() => {
  socket.emit('get_group_by_id', roomId)
  socket.on('get_group_with_id', message => {
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
 //  /Through the app of socket io, this allows you to see the mssage you sent immediately
 React.useEffect(() => {
  socket.on('chat_message', chatMessage => {
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
      <h2 className="font-semibold leading-5 text-sm text-white ">
       {messages.name && messages.name.length >= 28
        ? `${messages.name.slice(0, 25)}...`
        : messages.name}
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
    <div className="conversation-container pt-32 ">
     {messages.user !== undefined &&
      messages.user.map(({ name, message, _id, date }) => {
       const isMessageFromCurrentUser = googleUsername === name
       const dateOfMessage = new Date(date)
       return (
        <div
         className={`message  relative ${
          isMessageFromCurrentUser ? 'sent' : 'received'
         }`}
         key={_id}
        >
         {message}
         <span className="absolute text-xs -top-4 truncate left-0 text-green-700 font-bold capitalize  w-24">
          {name}
         </span>
         <span className="metadata">
          <span className="time">
           {whatsappDate.format(dateOfMessage, 'hh:mm')}
          </span>
          <span className="tick">
           <svg
            className="h-4 w-4 text-gray-400"
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
      })}
    </div>

    <form className="input-area" onSubmit={handleSubmit}>
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
       <i className="fas fa-paperclip"></i>
      </div>
      <div className="camera animated bounceIn">
       <i className="fas fa-camera"></i>
      </div>
     </div>

     <div className="mic-button">
      <button className="animated rotateIn">
       <i className="fas fa-microphone"></i>
      </button>
     </div>
    </form>
   </div>
   {/* text area */}
  </div>
 )
}

export default ChatRoom
