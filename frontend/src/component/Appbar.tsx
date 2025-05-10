import React from 'react'
import { Avatar } from './BlogCard'

const Appbar = ({name = "Harkirat"} : {name: string}) => {
  return (
    <div className='border-b border-slate-400 px-4 py-4 mb-8 flex justify-between items-center'>
        <div className='font-bold text-xl'><h1>Medium</h1></div>
        <Avatar name={"A"} size={8} />
    </div>
  )
}

export default Appbar



