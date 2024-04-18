'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toast } from 'react-hot-toast'//t
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function signupPage() {
  const router = useRouter()



  const [user, setUser] = useState({

    email : "",
    password : "",
    username : ""

  })

  const [buttonDisable , setButtondisable] = useState(false)
  const [loding , setLoding] = useState(false)
const onSignup = async ()=>{

  try{

    setLoding(true)

    const response =  axios.post("/api/users/signup", user)
    console.log("signup success", (await response).data);
    router.push('/login')



  

  }catch(error:any){
    console.log("signup failed");
    toast.error(error.message)


  }
}

useEffect( () =>{
  if(user.username.length > 0 && user.email.length > 0 && user.password.length >0){
    setButtondisable(false)
  }
  else{
    setButtondisable(true)
  }

},[user])


  return (
    <div>
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
  <h1>{loding ? "processing" : "signup"}</h1>
  <hr/>

  <label htmlFor="username">username</label>
  <input className='p-2 border border-grey-300 rounded-lg mb-4 text-black'
  id='username'
    value = {user.username}
    onChange = {(e) => setUser({...user, username : e.target.value})

    }
    placeholder='username'

    type='text'
    
  
  />
  <hr/>

  <label htmlFor="email">email</label>
  <input className='p-2 border border-grey-300 rounded-lg mb-4 text-black'
  id='email'
    value = {user.email}
    onChange = {(e) => setUser({...user, email : e.target.value})

    }
    placeholder='email'

    type='text'
    
  
  />
  <hr/>

  <label htmlFor="password">password</label>
  <input className='p-2 border border-grey-300 rounded-lg mb-4 text-black'
  id='password'
    value = {user.password}
    onChange = {(e) => setUser({...user, password : e.target.value})

    }
    placeholder='password'

    type='text'
    
  
  />

   

    <button
    onClick={onSignup}
    className='p-2 border border-grey-300 rounded-lg'>
      {buttonDisable ? "fill form" : "signup"}


    </button>

    <Link href = "/login">visit login page</Link>

    </div>
      
    </div>
  )
}

