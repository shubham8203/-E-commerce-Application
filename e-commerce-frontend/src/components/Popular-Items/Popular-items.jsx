import React, { useContext, useState,useEffect } from 'react'
import './popular-items.css'

import Item from '../items/Item'
import { shopcontext } from '../../context/ShopContext'

const Popular_items = () => {
   const [popular,setpopular]=useState([]);

   useEffect(()=>{
      fetch('http://localhost:4000/popular').then((res)=>(res.json())).then((data)=>(setpopular(data)));
   },[])

  return (
    <div className='container'>
<div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular_items">
      {
        popular.map((item,i)=>{
               return <Item key={i} id={item.id} image={item.image} name={item.name} old_price={item.old_price} new_price={item.new_price}  />
})
       }
      </div>
       
    </div>
    </div>
    
  )
}

export default Popular_items