import React from 'react'
import { useState,useEffect } from 'react'
import { API_Path } from '../apipath/Apipath'

const AllProducts = () => {
    const [allproduct,setAllproduct]=useState([])

    const allProductHandle=async()=>{
       const firmId= localStorage.getItem('firmId');
       console.log(firmId)
       console.log()
       try {
        const response=await fetch(`${API_Path}product/${firmId}/product`);
        const newprodctdata=await response.json()
        setAllproduct(newprodctdata.products)
        console.log(newprodctdata.products)
        
       } catch (error) {
        console.error("this is an error",error)
       }

    }
    useEffect(()=>{
        allProductHandle()
        console.log('this is use effect')
    }, [])

    const deleteproducthandler= async(productId)=>{
        try {
            const response= await fetch (`${API_Path}product/${productId}`, {
                method:'DELETE'
            })
            if (response.ok){
                setAllproduct(allproduct.filter(product=>product._id !== productId))
                confirm("are you sure do you want to delete")
                alert("product deleted sucessfully")
            }
        } catch (error) {
           console.error("failed to delete",error)
           alert("failed to delete")

        }
    }
  return (
    <div>
        <div >
            
            {
           ! allproduct ?(<p>no products added</p>):(
                    <table className="product-table">
                        <thead> 
                            <tr>
                                <th>Product Name</th>
                                <th>Product price</th>
                                <th>Image</th>
                                
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allproduct.map((item)=>{
                                return(
                                    <>
                                    <tr key={item.id}>
                                        <td>{item.productName}</td>
                                        <td>{item.price}</td>
                                        <td> {item.image ? (
                                            <img src={`${API_Path}product/uploads/${item.image}`} alt={item.productName} 
                                            style={{ width: '150px', height:'100px'}} />):
                                            <span>No Image Available</span>}</td>
                                            
                                        
                                        <td><button onClick={()=>deleteproducthandler(item._id)} >Delete</button></td>
                                    </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>

            )}
            

        </div>

    </div>
  )
}

export default AllProducts