import React from 'react'
import Appbar from '../component/Appbar'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Publish = () => {
    const [title , setTitle] = React.useState("");
    const [content , setContent] = React.useState("");
    const navigate = useNavigate();
  return (
    <div>
        <Appbar name='Kranti'/>
        <div className='w-1/2 mx-auto'>
            <textarea onChange={(e) => {
                setTitle(e.target.value);
            }} id="message" rows={2} className="block w-full text-3xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-4xl placeholder:font-serif placeholder:py-[0.7rem] placeholder:px-2" placeholder="Title"></textarea>
            
            <div className='mt-4'>
                <textarea onChange={(e) => {
                    setContent(e.target.value);
                }} id="message" rows={14} className="block w-full text-xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-4xl placeholder:font-serif placeholder:py-[0.7rem] placeholder:px-2" placeholder="Content"></textarea>
            </div>
            <button onClick={() => {
                async function publishPost(){
                    const res = await axios.post("http://127.0.0.1:8787/api/v1/blog" , {
                        title: title,
                        content: content
                    } , {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    })
                    navigate(`/blog/${res.data.blog.id}`);
                }
                publishPost();
            }} className='bg-green-400 px-8 py-1 rounded-xl mt-4 cursor-pointer font-semibold text-lg'>Publish Post</button>
        </div>
    </div>
  )
}

export default Publish