import React, { useContext } from 'react'
import {shopcontext} from '../context/ShopContext'
import dropdown_icon from '../components/assets/Ecommerce_Assets/Assets/Frontend_Assets/dropdown_icon.png'
import Item from '../components/items/Item';
import './CSS/ShopCategory.css'

 const ShopCategory = (props) => {
   const {all_product}=useContext(shopcontext);
  return (
    <div className='shopcategory'>
      <img src={props.banner} alt="" className='banner' />
      <div className='shopcategory-indexSort'>
            <p>
              <span>Showing 1-12</span> out of 36 products

            </p>
            <div className="shopcategory-sort">
              Sort by <img src={dropdown_icon} alt="" />
            </div>
      </div>
      <div className="shopcategory-products">
         {
          all_product.map((item,i)=>{
            if(item.category===props.category){

 return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} ></Item>
            }
          })
         }

      </div>
      <div className="button">
        <button type="button">
          Load more
        </button>
      </div>
    </div>
  )
}

export default ShopCategory