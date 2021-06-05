import React from 'react'

// internal files
import ChatRoom from './components/newComponent/Chats/ChatRoom'
import HomePage from './components/newComponent/Home/HomePage'
import Login from './components/Login'

// external files
import { Switch, Route } from 'react-router-dom'
import ThemeContext from './components/Context/ThemeContext'

const App = () => {
 const [user, setUser] = React.useState(null)
 return user ? (
  <Switch>
   <>
    <ThemeContext.Provider value={{name:user.displayName,email:user.email}}>
    <Route path="/chatroom/:roomId">
     <ChatRoom />
    </Route>

     <Route exact path="/">
      <HomePage user={user} />
     </Route>
    </ThemeContext.Provider>
   </>
  </Switch>
 ) : (
  <Login setUserInfo={user => setUser(user)} />
 )
}

export default App
