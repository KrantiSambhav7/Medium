import React, { useEffect, useState } from 'react'
import BlogCard from '../component/BlogCard'
import Appbar from '../component/Appbar'
import { useBlogs } from '../hooks'
import Loader from '../component/Loader'
import axios from 'axios'

interface Blog{
  title: string;
  content: string;
  author: {
    email: string;
  };
  id: string;
}

const Blogs = () => {
  const [loading , setLoading] = useState(true);
  const [blogs , setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function hello(){
      const res = await axios.get("http://localhost:8787/api/v1/blog/bulk" , {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      console.log(res.data.blog)
      setBlogs(res.data.blog);
      setLoading(false);
    }
    hello();
  } , [])

  if(loading){
    return <div className='flex justify-center items-center h-screen'>
        <Loader />
      </div>
  }

  return (
    <div>
      <Appbar name={"Kranti"}/>
      <div className='flex justify-center items-center'>
      <div className='w-full h-full max-w-4xl flex flex-col gap-6'>
      {blogs.map(item => (
          <BlogCard title={item.title} publishedDate='29/01/2014' content={item.content} authorName={item.author.email} id={item.id} />
      ))}
      </div>
    </div>
    </div>
  )
}

export default Blogs