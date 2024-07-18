import React, { useEffect, useState } from 'react'
import './NewCollections.css'


import Item from '../items/Item'

const NewCollections = () => {
  const [new_collections,setnew_collections]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:4000/newcollections').then((res)=>(res.json())).then((data)=>(setnew_collections(data)))
  },[])
  return (
     
        <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {
new_collections.map((item,i)=>{
return <Item key={i} id={item.id} image={item.image} name={item.name} old_price={item.old_price} new_price={item.new_price}  />
})
            }
        </div>
    </div>
    
  )
}

export default NewCollections