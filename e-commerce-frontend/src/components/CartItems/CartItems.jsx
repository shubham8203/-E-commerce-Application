import React, { useContext } from 'react'
import './CartItems.css'
import { shopcontext } from '../../context/ShopContext'
import remove_icon from '../assets/Ecommerce_Assets/Assets/Frontend_Assets/remove_icon.png'


const CartItems = () => {
    const {removeFromCart,all_product,cartItems,getTotalCartAmount}=useContext(shopcontext);
    
  return (
    
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
            </div> 
            {
                all_product.map((e,i)=>{
                    
                   if(cartItems[e.id]>0){
                    return (
                        <div key={i} >
                <div className="cartitems-format cartitems-format-main">
                    <img src={e.image} alt="" className='cartitem-product-icon' />
                    <p>{e.name}</p>
                    <p>${e.new_price}</p>
                    <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                    <p>${
                        (e.new_price)*(cartItems[e.id])
                  }</p>
                    <img src={remove_icon} alt="" onClick={()=>(removeFromCart(e.id))} className='remove-icon' />
                     <hr />
                    
                </div>
            </div>
                    
                 )
}})
}
            <hr />
            <div className="cartitems-down">
              <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                  <div className="cartitems-total-item">
                    <p>Sub Total</p>
                    <p>${getTotalCartAmount()}</p>
                  </div>
                  <hr />
                  <div className='cartitems-total-item'>
                     <p>Shipping Fee</p>
                     <p>Free</p>
                  </div>
                  <hr />
                  <div className='cartitems-total-item'>
                     <p>Total</p>
                     <p>${getTotalCartAmount()}</p>
                  </div>
                <button>PROCEED TO CHECKOUT</button>
                </div>
                
              </div>
            </div>
            
    </div>
  )
}

export default CartItems