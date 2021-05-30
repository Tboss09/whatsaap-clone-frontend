import React from 'react'

import { auth, provider } from '../hooks/firebase'

import WhatsappLogo from  './assets/img/Logo.svg'
const Login = ({ setUserInfo }) => {
//  const [user, setUser] = React.useState('')

 const signIn = () => {
  auth
   .signInWithPopup(provider)
   .then(res => {
    setUserInfo(res.user)
   })
   .catch(err => console.error('Error', err.message))
 }

 return (
  <>
   <div className="min-h-screen flex px-8 lg:px-0 flex-col items-center justify-center sm:mx-6 bg-gray-300">
    <div className="flex flex-col  bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
     <div className="flex flex-col">
      <div>
      <img src ={WhatsappLogo} alt ="Whatsapp Logo"  /> 
      </div>

      <div className="font-medium pb-4 self-center text-xl sm:text-2xl uppercase text-gray-800">
       Sign in to Whatsapp
      </div>

      <div className="flex w-full">
       <button
        onClick={signIn}
        type="submit"
        className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-600 hover:bg-green-400 rounded py-4 w-full lg:mx-10 transition duration-150 ease-in mx-10"
       >
        <span className="mr-2 uppercase">Signin</span>
        <span>
         <svg
          className="h-6 w-6"
          fill="none"
          strokelinejoincap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
         >
          <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
        </span>
       </button>
      </div>
     </div>
    </div>
   </div>
  </>
 )
}

export default Login
