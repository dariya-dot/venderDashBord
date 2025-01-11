import React, { useState } from 'react'
import { API_Path } from '../../apipath/Apipath'

export const Addfirm = () => {
  const[firmName,setFirmName]=useState("")
  const[area,setArea]=useState("")
  const [category,setCategory]=useState([])
  const [region,setRegion]=useState([])
  const [offer,setOffer]=useState("")
  const [file,setFile]=useState(null)

  const imageuplod=(event)=>{
    const selectedImage=event.target.files[0]
    setFile(selectedImage)

  }
  const setCategoryHandler=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter(item=>item!==value))
    }
    else{setCategory([...category,value])}
  }
  const setRegionHandler=(event)=>{
    const value=event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item !== value))
    }
    else{setRegion([...region,value])}
  }
   const addFirmHandler= async(e)=>{
      e.preventDefault();
      try {
        const token=localStorage.getItem("Logintoken")
        if(!token){
          console.error("user not authenticated from front end side token not avilable")
        }
        const formData=new FormData()
        formData.append('firmName',firmName);
        formData.append('area',area);
        formData.append('offer',offer);
        formData.append('image',file)

        category.forEach((value)=>{formData.append('category',value)})
        region.forEach((item)=>{formData.append('region',item)})

        const response= await fetch (`${API_Path}firm/add-firm`,{
          method:"POST",
          headers:{
            'token':`${token}`
          },
          body:formData
        })
        const data=await response.json()
        if(response.ok){
          console.log(data)
          alert('firm added ')
          setArea('')
          setCategory([])
          setOffer('')
          setRegion([])
          setFile(null)
          setFirmName('')
          window.location.reload();
        }else if(data.message==="You already have a firm."){alert("vender can have only one firm")
          setArea('')
          setCategory([])
          setOffer('')
          setRegion([])
          setFile(null)
          setFirmName('')}
        else{alert(data.message)}
        const firmId =data.firmId
       
        localStorage.setItem('firmId',firmId)
        localStorage.setItem('firmName',firmName)
        
      } catch (error) {
        console.error("error from front end - firm not adder",error)
      }
   }


  return (
    <>
    <div className="firmSection">
       
        <form action="" onSubmit={addFirmHandler} className='firmProductForms'>
        <h2> Add Firm </h2> 
            <label htmlFor=""> Firm name </label>
            <input type="text" name="firmName" id=""  value={firmName} onChange={(e)=>{setFirmName(e.target.value)}} /><br />
            <label htmlFor="">Area</label>
            <input type="text" id='' value={area} onChange={(e)=>{setArea(e.target.value)}} /><br />
        
              
              <div className="category">
                <label htmlFor="">Category:</label>
                <div className='inputlables'>
                <div className="checkboxcontainer">
                <label>Veg</label>
                <input type="checkbox" value="Veg" checked={category.includes('Veg')} onChange={setCategoryHandler} id="" />
                </div> 
               <div className="checkboxcontainer">
               <label>Non-Veg</label>
               <input type="checkbox" value="Non-veg" checked={category.includes('Non-veg')} onChange={setCategoryHandler} id="" />
               </div>
                </div>
              </div> 
                     <br />
               <div className="region">
                <label htmlFor="">Region:</label>
                <div className='inputlables'>
                  <div>
                  <div className="checkboxcontainer">
                <label>South-IND</label>
                <input type="checkbox" value="SouthIND" checked={region.includes('SouthIND')} onChange={setRegionHandler} id="" />
                </div>
                <div className="checkboxcontainer">
                <label>Nort-IND</label>
                <input type="checkbox" value= "NortIND" checked={region.includes('NortIND')} onChange={setRegionHandler} id="" />
                </div> 
                  </div>
                <div>
                <div className="checkboxcontainer">
                <label>Bakery</label>
                <input type="checkbox" value="Bakery" checked={region.includes('Bakery')} onChange={setRegionHandler} id="" />
                </div>  
               <div className="checkboxcontainer">
               <label>Chenies</label>
               <input type="checkbox" value="Chenies" checked={region.includes('Chenies')} onChange={setRegionHandler} id="" />
               </div>
                </div>
               
                </div>
              </div> 

            <label htmlFor="offer">Offer</label>
            <input type="text" name="" id="offer"  value={offer} onChange={(e)=>{setOffer(e.target.value)}}/><br />
            <label htmlFor="image">Firm image</label>
            <input type="file" name="" onChange={imageuplod} id="image" />
            <button type='submit'>Submit</button>
        </form>
    </div>
    </>
  )
}

export default Addfirm;
