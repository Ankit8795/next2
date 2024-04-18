'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function profilepage() {

  const router = useRouter()
  const [data, setData] = useState("nothing")

  const getUserDetails = async ()=>{
    try{
    const res = await axios.post("/api/users/me")
         setData(res.data.data._id)
    }catch(err:any){
      console.log(err.message)
    }

  }
  const logOut = async ()=>{
    try{
    const res = await axios.get("/api/users/logout")
     toast.success("logout success")
     router.push("/login")
    }catch(err:any){
      console.log(err.message)
    }

  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>profile</h1>
      <hr/>
      <h2>{data ==="nothing" ? "no data avilable": <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr/>
      <button className='bg-green-500 text-white rounded' 
      onClick={logOut}>
        logout

      </button>
      <hr/>
      <button className='bg-green-500 text-white rounded m-2' 
      onClick={getUserDetails}>
        getUserDetails

      </button>
    </div>
  )
}

