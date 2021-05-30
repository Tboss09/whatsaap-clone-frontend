import React from 'react'
import ChatMessages from './ChatBody/ChatMessages'
import ChatBody from './ChatBody/ChatBody'
import Header from './Header'
import Login from './Login'

// React Router
import { Route } from 'react-router-dom'
// React Router


const Home = ({ groupChat }) => {
  const [tab, setTab] = React.useState(1)
  const [showMessages, setShowMessages] = React.useState(false)
  console.log(showMessages);
  return (

    <>
      <Route path='/chat/:chatId'>
        <Header setCurrentTab={tab => setTab(tab)} />
        {tab === 1 ? <ChatBody tab={tab} groupChat={groupChat} groupUserChats={showMessages => setShowMessages(showMessages)} /> : 'Hey there'}
      </Route>


      {/* <ChatMessages/> */}
    </>


  )
}

export default Home
