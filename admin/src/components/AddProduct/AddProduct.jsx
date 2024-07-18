import React, { useState } from 'react'
import './AddProduct.css'
import upload_icon from '../../assets/upload_icon.jpg'

const AddProduct = () => {
    const [image,setimage]=useState(false);
    const [productdetails,setproductdetails]=useState({name:"",
        image:"",
        category:"men",
        old_price:"",
        new_price:"",
    });


    const changeHandler=(e)=>{
     
setproductdetails({...productdetails,[e.target.name]:e.target.value})
    }
    const imagehandler=(e)=>{
      setimage(e.target.files[0]);
      
}
    const addProduct=async ()=>
    {
let responseData;
let product=productdetails;
let formData=new FormData();
formData.append('product',image);
await fetch('http://localhost:4000/upload',{
    method:'POST',
    headers:{
        Accept:'application/json',
        
    },
    body:formData,

}).then((res)=>(res.json())
).then((data)=>{

responseData=data;

})

if(responseData.success){
    product.image=responseData.image_url;
    await fetch('http://localhost:4000/addproduct',{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
        },
        body:JSON.stringify(product),
    }).then((res)=>(
    res.json()
    ))
    .then((data)=>(
data.success?alert("Product Added"):alert("Failed")
    ))
}
else alert(responseData.error);
window.location.replace('/addproduct');
    }
   
  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productdetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type here...'/>

      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productdetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productdetails.new_price} onChange={changeHandler}type="text" name="new_price" placeholder='Type here' />
        </div>

      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productdetails.category} onChange={changeHandler} name="category" id="" className='addproduct-selector'>
<option value="men">Men</option>
<option value="women">Women</option>
<option value="kid">Kids</option>
        </select>

      </div>
      <div className='addProduct-itemfield'>
           <label htmlFor="file-input" className='addproduct-thumbnail-img' >
            <img src={image?URL.createObjectURL(image):upload_icon} alt="" />
           </label>
           <input value={productdetails.image} onChange={imagehandler} type="file"  name="image" id="file-input" hidden />
      </div>
      <button onClick={addProduct}  className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct