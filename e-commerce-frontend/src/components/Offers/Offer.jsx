import React from 'react'
import './Offer.css'
import exclusive_image from '../assets/Ecommerce_Assets/Assets/Frontend_Assets/exclusive_image.png'

const Offer = () => {
  return (
    <div className='Offer'>

    <div className="Offer-left">
        <h1>Exclusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <button type="button">Check Now</button>
    </div>
    <div className="Offer-right">
        <img src={exclusive_image} alt="" />
    </div>
    </div>
  )
}

export default Offer