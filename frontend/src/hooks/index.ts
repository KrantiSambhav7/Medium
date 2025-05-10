import { useEffect, useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config";

export const useBlogs = (id : string ) => {
    const [loading , setLoading] = useState(true);
    const [blogs , setBlogs] = useState([]);
    
    useEffect(() => {
        async () => {
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}` , {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            setLoading(false);
            setBlogs(res.data.blog);
        }
    } , [])

    return {
        loading , blogs
    }
}