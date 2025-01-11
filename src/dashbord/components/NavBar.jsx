import React from 'react'

const NavBar = ({showLoginHandler,showResisterHandler,showLogout,logoutHandler}) => {
  const firmName=localStorage.getItem('firmName')
   
  return (
    <>
    <div className="Navsection">
      <div className="company">
        Vendor Dashbord 
      </div>
      <div className="firmName">
        Firmname : {firmName}
      </div>
      <div className="userauth">
        { ! showLogout ? <>
        <span onClick={showLoginHandler}> Login   / </span>
        <span onClick={showResisterHandler}>  Resistration</span>
        </>:<span onClick={logoutHandler}> Logout</span> }
        
        
        
      </div>
    </div>
    </>
  )
}

export default NavBar