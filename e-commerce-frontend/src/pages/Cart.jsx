import React from 'react'
import './CSS/Cart.css'
import CartItems from '../components/CartItems/CartItems'


const cart = () => {
  return (
    <div className='cart'>
      <CartItems/>

    </div>
  )
}

export default cart