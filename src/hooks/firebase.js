import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUb_ZjnhzQB6tbISn0iaNiubisLiSPzEw",
  authDomain: "whatsapp-clone-app-786e3.firebaseapp.com",
  projectId: "whatsapp-clone-app-786e3",
  storageBucket: "whatsapp-clone-app-786e3.appspot.com",
  messagingSenderId: "752645794717",
  appId: "1:752645794717:web:165d5459a674f1f4431d74",
  measurementId: "G-GR9CWL23WZ"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

// this authenicates the user
const auth = firebase.auth()
// this authenicates the user
const provider = new firebase.auth.GoogleAuthProvider()

export {auth,provider}
export default db