import React, { useState,useEffect } from 'react'
import './ListProduct.css'
import remove_icon from '../../assets/remove_icon.png'
const ListProduct = () => {
const [all_product,setall_product]=useState([]);
    const info=async ()=>{
    await fetch('http://localhost:4000/allproducts').then((res)=>(res.json())).then((data)=>{
        setall_product(data);
        console.log(data);
    })
    }
    const deleteitem=async (id)=>{





         await fetch('http://localhost:4000/removeproduct',{
            method:'POST',
            headers:{
         Accept:'application/json',
         'Content-Type':'application/json',
            },
          body:JSON.stringify({id:id}),
         }).then((res)=>(res.json())).then((data)=>{data.success?alert(`${data.name} deleted`):alert("failed")})
         await info();
    }

    useEffect(()=>{
        info();
    },[])

  return (
    <div className='list-product'>
          <h1>All Products List</h1>
          <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Category</p>
            <p>Old Price</p>
            <p>New price</p>
            <p>Remove</p>
          </div>
          <div className='allproducts'>
            <hr />
            {
                all_product.map((item,i)=>{
return <div key={i} className="format-main">
<img src={item.image} alt="" />
<p>{item.name}</p>
<p>{item.category}</p>
<p>{item.old_price}</p>
<p>{item.new_price}</p>
<img src={remove_icon} onClick={()=>(deleteitem(item.id))} alt="" className='remove-icon' />
</div>

                })
            }
          </div>

    </div>
  )
}

export default ListProduct