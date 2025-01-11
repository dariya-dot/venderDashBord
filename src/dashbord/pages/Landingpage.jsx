import React  from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import { Resister } from '../components/forms/Resister'
import { Addfirm } from '../components/forms/Addfirm'
import Addproduct from '../components/forms/Addproduct'
import { useState,useEffect } from 'react'
import Welcome from '../components/forms/Welcome'
import AllProducts from '../components/AllProducts'

const Landingpage = () => {
  
  const [showLogin,setShowLogin]=useState(false)
  const [resister,setResister]=useState(false)
  const [firm,setFirm]=useState(false)
  const [product,setProduct]=useState(false)
  const [showWelcom ,setShowWelcom]=useState(false)
  const [showallproduct,setShowallproduct]=useState(false)
  const [showLogout,setShowLogout]=useState(false)
  const [addFirmTitle,setAddFirmTitle]=useState(true)
  
  useEffect(()=>{
    const firmName=localStorage.getItem('firmName')
    if(firmName){
      setAddFirmTitle(false)
      setShowLogout(true)
    }
  },[])
 
  
    useEffect(()=>{
      const Logintoken=localStorage.getItem('Logintoken');
      if(Logintoken){
        setShowLogout(true)
        showwelcomeHandler()
      }
      
      
    },[])

    useEffect(()=>{
      const Logintoken=localStorage.getItem('Logintoken');
      const firmId=localStorage.getItem('firmId');
      if(!firmId  && Logintoken){
        setShowLogout(true)
        setShowLogin(false)
      }
    })

    const logoutHandler=()=>{
      confirm("Are you sure want to logout?")

      localStorage.removeItem('Logintoken')
      localStorage.removeItem('firmId')
      localStorage.removeItem('venderId')
      localStorage.removeItem('firmName')
      localStorage.removeItem('venderName')
      window.location.reload();
      setShowLogout(false)
     
    }
  const showallproducthandler=()=>{
    setShowLogin(false)
    setResister(false)
    setFirm(false)
    setProduct(false)
    setShowWelcom(false)
    setShowallproduct(true)
  }
   
  const showLoginHandler=()=>{
    setShowLogin(true)
    setResister(false)
    setFirm(false)
    setProduct(false)
    setShowWelcom(false)
    setShowallproduct(false)
   
  }
  const showResisterHandler=()=>{
    setResister(true)
    setShowLogin(false)
    setFirm(false)
    setProduct(false)
    setShowWelcom(false)
    setShowallproduct(false)
  }
  const showFirmHandler=()=>{
    setFirm(true)
    setShowLogin(false)
    setResister(false)
    setProduct(false)
    setShowWelcom(false)
    setShowallproduct(false)
  }
  const showProductHandler=()=>{
    setProduct(true)
    setShowLogin(false)
    setResister(false)
    setFirm(false)
    setShowWelcom(false)
    setShowallproduct(false)
  }
  const showwelcomeHandler=()=>{
    setProduct(false)
    setShowLogin(false)
    setResister(false)
    setFirm(false)
    setShowWelcom(true)
    setShowallproduct(false)
  }
  return (
    <>
    <section className='landingsection'>
        <NavBar showLoginHandler={showLoginHandler} showResisterHandler={showResisterHandler} showLogout={showLogout} 
        logoutHandler={logoutHandler} />
        <div className="collectionSection"  >
        <SideBar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showallproducthandler={showallproducthandler} 
        addFirmTitle={addFirmTitle} />
         {showLogin && <Login showwelcomeHandler={showwelcomeHandler}/>}
        {/* {showLogin && < Login/>} */}
        {resister && <Resister showLoginHandler={showLoginHandler}/> }
        {firm && showLogout &&<Addfirm/> }
        {product && showLogout &&<Addproduct /> }
        {showWelcom && <Welcome/> }
        {showallproduct  && showLogout && <AllProducts/>}
        </div>
        
    </section>
    </>
  )
}

export default Landingpage