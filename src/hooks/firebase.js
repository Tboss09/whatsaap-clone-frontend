import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBrOp0jArKBpFUlUcezpnMPtgXPlsED5g8",
    authDomain: "whatsapp-clone-ee050.firebaseapp.com",
    projectId: "whatsapp-clone-ee050",
    storageBucket: "whatsapp-clone-ee050.appspot.com",
    messagingSenderId: "756226265365",
    appId: "1:756226265365:web:bf58076fa600db6af8d91c",
    measurementId: "G-Q2FTJXPJW4"
  };


  
const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

// this authenicates the user
const auth = firebase.auth()
// this authenicates the user
const provider = new firebase.auth.GoogleAuthProvider()

export {auth,provider}
export default db