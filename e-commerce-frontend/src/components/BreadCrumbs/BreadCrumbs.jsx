import React from 'react'
import './BreadCrumbs.css'
import arrow_icon from '../assets/Ecommerce_Assets/Assets/Frontend_Assets/arrow.png'


const BreadCrumbs = (props) => {
    const {Product}=props;
  return (
    <div className='breadcrumbs'>
         SHOP <img src={arrow_icon} alt="" height={15} width={20} />{Product.category} <img src={arrow_icon} alt="" width={20} height={15}/>{Product.name}

    </div>
  )
}

export default BreadCrumbs