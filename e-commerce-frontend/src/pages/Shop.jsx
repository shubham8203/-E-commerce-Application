import React from 'react'
import Hero from '../components/Hero/hero'
import Popular_items from '../components/Popular-Items/Popular-items'
import Offer from '../components/Offers/Offer'
import NewCollections from '../components/NewCollections/NewCollections'
import News_letter from '../components/NewsLetter/News_letter'



const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular_items/>
      <Offer/>
      <NewCollections/>
      <News_letter/>
     
      </div>
  )
}

export default Shop