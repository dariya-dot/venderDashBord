import React, { useState } from 'react'
import { API_Path } from '../../apipath/Apipath';

const Addproduct = ({showProductHandler}) => {
  const [productName,setProductName]=useState('');
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState([]);
  const [bestseller,setBestseller]=useState(false);
  const [description,setDescription]=useState('');
  const [file,setFile]=useState(null);

  const imageHandler=(event)=>{
    const uploadedimage=event.target.files[0]
    setFile(uploadedimage)
  }
  const setCategoryHandler=(e)=>{
    const value=e.target.value;
    if(category.includes(value)){
      setCategory(category.filter(item=>item!==value));
    }else{
      setCategory([...category,value]);
    }
  }
  const bestSellerHandler=(e)=>{
    const value=e.target.value==='true'
    setBestseller(value)
  }
  const addproductHandler=async(event)=>{
    event.preventDefault();
    try {
      const token=localStorage.getItem('Logintoken')
      const firmId=localStorage.getItem('firmId')
      
      if(!token || !firmId){
        console.error('user not logged in')
      }
      const formData=new FormData();
      formData.append('productName',productName);
      formData.append('price',price);
      formData.append('description',description)
      formData.append('image',file)

      category.forEach((value)=>{
        formData.append('category',value)
      })

    
        const response=await fetch(`${API_Path}product/add-product/${firmId}`,{
        method:'POST',
        body:formData
      })
        const data= await response.json()
        if(response.ok){
          console.log(data)
          setBestseller(false)
          setCategory([])
          setDescription('')
          setProductName('')
          setPrice('')
          setFile(null)
          alert('product added')
          event.target.reset()
        
        }
    } catch (error) {
      console.error(error)
      alert('failed')
      
    }

  }
  return (
    <>
    <div className="productSection">
       
        <form action=""  onSubmit={addproductHandler} className='firmProductForms'>
        <h2>ADD  Product</h2> 
            <label htmlFor="productname"> Product name </label>
            <input type="text" value={productName}  onChange={(e)=>{setProductName(e.target.value)}} id="firmname" /><br />
            <label htmlFor="price">Price</label>
            <input type="number" value={price} onChange={(e)=>{setPrice(e.target.value)}} id='price'/><br />

            <div className="category">
                <label htmlFor="">Category:</label>
                <div className='inputlables'>
                <div className="checkboxcontainer">
                <label>Veg</label>
                <input type="checkbox"  value="Veg" checked={category.includes('Veg')} onChange={setCategoryHandler} id="" />
                </div> 
               <div className="checkboxcontainer">
               <label>Non-Veg</label>
               <input type="checkbox" value="Non-Veg" checked={category.includes('Non-Veg')} onChange={setCategoryHandler} id="" />
               </div>
                </div>
              </div> 

                <br />
              <div className="category">
                <label htmlFor="">Bestseller:</label>
                <div className='inputlables'>
                <div className="checkboxcontainer">
                <label>Yes</label>
                <input type="radio" value="true"  checked={bestseller===true} onChange={bestSellerHandler} id="" />
                </div> 
               <div className="checkboxcontainer">
               <label>No</label>
               <input type="radio" value="false" checked={bestseller===false} onChange={bestSellerHandler} id="" />
               </div>
                </div>
              </div> 

            <label htmlFor="description">Description</label>
            <input type="text" name="" value={description} onChange={(e)=>{setDescription(e.target.value)}} id="description" /><br />
            <label htmlFor="image">Product image</label>
            <input type="file" name="" onChange={imageHandler} id="image" /><br />
            <button type='submit'>Submit</button>
        </form>
    </div>
    </>

  )
}

export default Addproduct