'use client'


import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function verifyEmailpage() {

    // const router = useRouter()

    const  [token , setToken] = useState("")
    const  [verified , setVerified] = useState(false)
    const  [error , setError] = useState(false)

    const verifyUserEmail = async ()=>{
        try{

        await axios.post("/api/users/verifyemail",{token})
        setVerified(true)

        useEffect( ()=>{
            const urlToken = window.location.search.split("=")[1]

            
            // const {query} = router
            // const urlTokentwo :any= query.token
            setToken(urlToken || "")


        },[])

        useEffect( ()=>{

            if(token.length > 0){

                verifyUserEmail()
            }

        },[token])



        }catch(error: any){

            setError(true)
            console.log(error.response.data);

        }

       

    }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl '>Verify Email</h1>
      <h2 className='p-2 bg-orange-500 text-black'>{token? `${token}` : "noo token"}</h2>

      {verified && (
      
      <div>
        <h2>Verified</h2>
        <Link href="/login">login</Link>
      </div>
        )}
      {error && (
      
      <div>
        <h2>error</h2>
    
      </div>
        )}
      
    </div>
  )
}

 
