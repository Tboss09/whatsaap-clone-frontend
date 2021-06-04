import io from 'socket.io-client'

const socket = io.connect('https://whatsapp-cloned-backend.herokuapp.com', {
 reconnection: true,
 reconnectionDelay: 1000,
 reconnectionDelayMax: 3000,
 reconnectionAttempts: 10,
 withCredentials: false,
 extraHeaders: {
  'my-custom-header': 'abcd',
 },
})

export default socket
