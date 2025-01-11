

    import React from 'react'
    import { useState } from 'react'
    import {API_Path} from '../../apipath/Apipath'
    
    export const Resister = ({showLoginHandler}) => {
      const [userName,setUserName]=useState()
      const [email,setEmail]=useState()
      const [password,setPassword]=useState()

      const handleSubmit= async(e)=>{
          e.preventDefault()
        try {
          const response = await fetch(`${API_Path}vender/resister`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({userName,email,password})
          })
         const data =await response.json()
         
          if(response.ok){
          setEmail("")
          setPassword("")
          setUserName("")
          console.log("Response Data:", data);
          alert("registerd from front end")
          showLoginHandler()
         }
         else if (data.message==="Email alredy exist from back end"){alert("Email alredy exist from back end")}
         else{alert("Error from back end")}
        } catch (error) {
          console.error("resistration faild",error)
          console.log("error")
          
        }
      }
      return (
        <>
             <div className="resisterSection">
         
        <form onSubmit={handleSubmit} className='authForms'>
        <h2>Vendor resistration</h2>
            <label >User Email</label>
            <input type="text" name="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label >User Name</label>
            <input type="text" name="userName"  value={userName} onChange={(e)=>setUserName(e.target.value)} />
            <label >Password</label>
            <input type="text" name="password"  value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
            <button type="submit">submit</button>
        </form>
    </div>
    </>
      )
    }

    export default Resister
    