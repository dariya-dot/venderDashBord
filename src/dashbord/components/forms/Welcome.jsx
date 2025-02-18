import React from 'react'

const Welcome = () => {
  const venderName=localStorage.getItem('venderName')
  return (
    <>
    <div className='welcomepage'>
      <center><h2>WELCOME TO THE VENDER PAGE</h2></center>
      <h1>{venderName}</h1>
    </div>
    </>
    
  )
}

export default Welcome