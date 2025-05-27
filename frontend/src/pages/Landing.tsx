import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Landing = () => {
    const navigate = useNavigate();
    useEffect(() => {
        function nav(){
            navigate('/signin')
        }
        nav()
    } , [])
  return (
    <div>
    </div>
  )
}

export default Landing