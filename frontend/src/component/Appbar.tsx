import React from 'react'
import { Avatar } from './BlogCard'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Appbar = ({name = "Harkirat"} : {name: string}) => {
  const navigate = useNavigate();
  return (
    <div className='border-b border-slate-400 px-4 py-4 mb-8 flex justify-between items-center'>
        <div onClick={() => {
          navigate("/blogs");
        }} className='font-bold text-xl cursor-pointer'><h1>Medium</h1></div>
        <div className='flex items-center gap-10'>
          <Link to={"/publish"}>
            <button className='bg-green-400 px-6 rounded-full font-semibold cursor-pointer py-2 hover:bg-green-600'>Publish</button>
          </Link>
          <Avatar name={"A"} size={8} />
        </div>
    </div>
  )
}

export default Appbar



