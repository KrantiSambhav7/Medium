import React, { useEffect, useState } from 'react'
import BlogCard from '../component/BlogCard'
import Appbar from '../component/Appbar'
import { useBlogs } from '../hooks'
import Loader from '../component/Loader'
import axios from 'axios'
import { useParams } from 'react-router-dom'

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
  const {blog , loading} = useBlogs(id || "");
  
  return (
    <div>{blog}</div>
  )
}

export default Blog