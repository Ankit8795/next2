'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast, { Toast } from 'react-hot-toast'//t
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function loginPage() {
  const router = useRouter()



  const [user, setUser] = useState({

    email : "",
    password : ""
  

  })

  const [buttonDisable , setButtondisable] = useState(false)
  const [loding , setLoding] = useState(false)
const onlogin = async ()=>{

  try{

    setLoding(true)

    const response =  axios.post("/api/users/login", user)
    console.log("login success", (await response).data);
    router.push('/profile')



  

  }catch(error:any){
    console.log("login failed");
    toast.error(error.message)


  }
}

useEffect( () =>{
  if( user.email.length > 0 && user.password.length >0){
    setButtondisable(false)
  }
  else{
    setButtondisable(true)
  }

},[user])


  return (
    <div>
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
  <h1>{loding ? "processing" : "login"}</h1>

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
    onClick={onlogin}
    className='p-2 border border-grey-300 rounded-lg'>
      {buttonDisable ? "fill form" : "login"}


    </button>

    <Link href = "/signup">visit signup page</Link>

    </div>
      
    </div>
  )
}

