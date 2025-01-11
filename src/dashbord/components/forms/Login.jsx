import React from 'react'
import { useState ,useEffect} from 'react';
import { API_Path } from '../../apipath/Apipath';

export const Login = ({showwelcomeHandler}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();




  const loginHandler=async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch(`${API_Path}vender/login`, {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email,password})
      })
      const data = await response.json()
      if(response.ok){
        alert("loged in")
        setEmail("")
        setPassword("")
        
       console.log(data)
       
      
       localStorage.setItem("Logintoken",data.token)
       localStorage.setItem('venderId',data.venderId)
       localStorage.setItem('venderName',data.venderName)
      
       showwelcomeHandler()
       
      }else if (data.message==="invalid username or password"){alert("invalid username or password")}
      else if(data.message==="email not registerd"){alert('email not registerd')}
      else{alert(data.message)}
          const venderId = data.venderId
          
          const venderResponse = await fetch(`${API_Path}vender/single-vender/${venderId}`)
        
          const venderData = await venderResponse.json();
          if(venderResponse.ok){
            const venderFirmId = venderData.venderFirmId;
            localStorage.setItem('firmId', venderFirmId);
            const venderFirmName = venderData.vender.firm[0].firmName;
            localStorage.setItem('firmName', venderFirmName)
            window.location.reload()
          }
    } catch (error) { 
      console.error("the error is",error)
    }
    }
  
  
  return (
    <>
    <div className="loginSection">
         
        <form action="" onSubmit={loginHandler} className='authForms'>
        <h2>Vendor Login</h2>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" /><br />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" /> <br />
            <button type="submit">submit</button>
        </form>
    </div>
    </>
  )
}
export default Login;
