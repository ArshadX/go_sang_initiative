'use client'
import React, { useState } from 'react'
import AdvanceInput from '@/components/register/AdvanceInput'



export default function Page() {
  const [phone,setPhone] = useState("")
  const [fullName,setFullName] = useState("")
  const [DOB,setDOB] = useState("")
  const [email,setEmail] = useState("")
  const [phoneValidated,setValidated] = useState("")

  return (
    <div className='bg-white flex flex-1 flex-col justify-center items-center min-h-svh gap-y-4'>
      {
        <div className='w-1/3'>
          <h1 className='font-bold text-2xl text-center mb-4'>Enter your phone number</h1>
          <AdvanceInput />
        </div> 
      }
  
        <div className='w-1/3'>
            <h1 className='font-bold text-2xl text-center mb-4'>Enter your full name</h1>
            <AdvanceInput />
        </div> 
        <div className='w-1/3'>
            <h1 className='font-bold text-2xl text-center mb-4'>Enter you date of birth (DOB)</h1>
            <AdvanceInput />
        </div> 
        <div className='w-1/3'>
            <h1 className='font-bold text-2xl text-center mb-4'>Enter your email (Optional)</h1>
            <AdvanceInput />
        </div> 
        <button
        className="rounded-md bg-sky-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Get started
        </button>
    </div>
    ) 
}