import io from 'socket.io-client'

const socket = io('https://whatsapp-cloned-backend.herokuapp.com', {
 withCredentials: true,
 
 extraHeaders: {
  'my-custom-header': 'abcd',
 },
})

export default socket
