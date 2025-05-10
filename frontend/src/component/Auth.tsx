import React, { useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  type {  SignupInput } from '@kranti_sambhav/common'
import axios from "axios";
import { BACKEND_URL } from '../config';
const Auth = ({type} : {type: "signup" | "signin"}) => {

  const [postInput , setPostInput ]  = useState<SignupInput>({
    name: "",
    username: "",
    password: ""
  })

  const navigate = useNavigate();
  
  async function sendRequest(){
    try{
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInput);
      const jwt = res.data.token;
      localStorage.setItem("token" , jwt)
      navigate("/blogs")
    }catch(e){
      alert("Error in sending request")
    }
  } 

  return (
    <div className='h-full w-full flex justify-center items-center'>
      <div className='min-h-[26rem] w-full flex justify-center'>
        <div className='w-xs'>
        <h1 className='text-4xl font-bold text-center'>Create an account</h1>
          {type === "signup" ? <h1 className='text-center text-slate-600 mt-1'>Already have an account ? <Link className='underline' to={"/signin"}>Login</Link></h1> : <h1 className='text-center text-slate-600 mt-1'>Don't have an account ? <Link className='underline' to={"/signup"}>Register</Link></h1> }
          <div className='mt-6'>
          <LabelledInput type='text' label='Username' placeholder='Kranti Sambhav' onChange={(e) => {
            setPostInput(p => ({...p , username: e.target.value}))
          }} />
          <LabelledInput type='text' label='Email' placeholder='krantisambhav7@gmail.com' onChange={(e) => {
            setPostInput(p => ({...p , email: e.target.value}))
          }} />
          <LabelledInput type='password' label='Password' placeholder='12345' onChange={(e) => {
            setPostInput(p => ({...p , password: e.target.value}))
          }} />
          </div>
          <div className='w-full mt-6'>
          <button onClick={sendRequest} type="button" className="text-white w-full bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 hover:underline">{type === "signup" ? "Signup" : "Signin"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth 

interface LabelledInputType { 
  label: string,
  placeholder: string,
  onChange: (e : ChangeEvent<HTMLInputElement>) => void,
  type: string
}
function LabelledInput({label , placeholder , onChange , type} : LabelledInputType ){
  return <div>
            <div className='mt-4'>
        <label
          className="block mb-1 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <input
          type={type}
          id="first_name"
          onChange={onChange }
          className="bg-gray-50 border border-gray-800 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
  </div>
}