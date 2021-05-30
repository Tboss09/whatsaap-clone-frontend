import React from 'react'
// external
import { Avatar, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MoreVertIcon from '@material-ui/icons/MoreVert'

// internal
import Tabs from './Tabs'

const Header = ({setCurrentTab}) => {
  
const [tab, setTab] = React.useState(1)

React.useEffect(() =>{
  setCurrentTab(tab)
},[tab])

  
  return (
    <div className="App__header ">
      <div className="App__profile ">
        <div className="avatar">
          <Avatar />
        </div>

        <div className="logo">
          <h1 className="text-white  font-normal text-xl">WhatsApp</h1>
        </div>

        <div className="icons ">
          <SearchIcon style={{ color: '#fff' }} />

          <MoreVertIcon style={{ color: '#fff' }} />
        </div>
      </div>

      {/* Tabs */}
      <Tabs setCurrentTab={tab => setTab(tab)} />
      {/* Tabs */}
    </div>
  )
}

export default Header
