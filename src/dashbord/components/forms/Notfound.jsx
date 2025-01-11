import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
  return (
    <>
    
    <div className="pageerror">
    <Link to='/'><p style={{fornSize:'1.5rem'}}>Go To HOME Page</p></Link>
    <h1>404</h1>
    <h3>Page Not Found </h3> 
    </div>
    
    </>
    
  )
}

export default Notfound