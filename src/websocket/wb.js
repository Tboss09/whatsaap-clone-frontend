import io from 'socket.io-client'

const socket = io('http://localhost:5000', {
 reconnection: true,
 reconnectionDelay: 1000,
 reconnectionDelayMax: 3500,
 reconnectionAttempts: 10,
 withCredentials: false,
     extraHeaders: {
  'my-custom-header': 'abcd',
 },
})

export default socket
