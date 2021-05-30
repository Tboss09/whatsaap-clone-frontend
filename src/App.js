import React from 'react'

// internal files
import ChatRoom from './components/newComponent/Chats/ChatRoom'
import HomePage from './components/newComponent/Home/HomePage'
import Login from './components/Login'

// external files
import { Switch, Route } from 'react-router-dom'


const App = () => {
 const [user, setUser] = React.useState(null)


 return user ? (
  <Switch>
   <>
    <Route path="/chatroom/:roomId">
     <ChatRoom googleUsername={user.displayName} />
    </Route>

    <Route exact path="/">
     <HomePage user={user} />
    </Route>
   </>
  </Switch>
 ) : (
  <Login setUserInfo={user => setUser(user)} />
 )
}

export default App
