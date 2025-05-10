import React, { useEffect, useState } from 'react'
import BlogCard from '../component/BlogCard'
import Appbar from '../component/Appbar'
import Loader from '../component/Loader'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import FullBlog from '../component/FullBlog'

interface Blog{
  title: string;
  content: string;
  author: {
    email: string;
  };
  id: string;
}

const Blog = () => {
  const {id} = useParams();
  console.log(id)
  const [loading , setLoading] = useState(true);
  const [blog , setBlog] = useState<Blog>({
    title: "",
    content: "",
    author: {
      email: ""
    },
    id: ""
  });

  useEffect(() => {
    async function hello(){
      try{
        const res = await axios.get(`http://127.0.0.1:8787/api/v1/blog/${id}` , {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      setBlog(res.data.blog);
      setLoading(false);
      console.log(res.data.blog)
      }catch(err){
        console.log(err)
      }
    }
    hello();
  } , [id])

  if(loading){
    return <div className='flex justify-center items-center h-screen'>
        <Loader />
      </div>
  }
  
  return (
    <div>
      <FullBlog blog={blog}/>    
    </div>
  )
}

export default Blog