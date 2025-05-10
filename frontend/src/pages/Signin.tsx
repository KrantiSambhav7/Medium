import React from 'react'
import Quote from '../component/Quote'
import Auth from '../component/Auth'

const Signin = () => {
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2'> 
        <Auth type={"signin"}/>
        <div className='hidden lg:block'>
        <Quote />
        </div>
      </div>
    </div>
  )
}

export default Signin