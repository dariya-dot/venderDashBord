import React from 'react'

const SideBar = ({showFirmHandler,showProductHandler,showallproducthandler,addFirmTitle}) => {
  return (
    <div className="sidebasrSection">
        <ul>
          {addFirmTitle?<li onClick={showFirmHandler}>Add Firm</li>:""}
            
            <li onClick={showProductHandler}>Add Product</li>
            <li onClick={showallproducthandler}>All Products</li>
            <li>user Details</li>
        </ul>
    </div>
  )
}

export default SideBar