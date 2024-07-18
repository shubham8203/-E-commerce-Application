import React, { useContext } from 'react'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs'
import { shopcontext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';

const Product = () => {
  const {all_product}=useContext(shopcontext);
  const {productId}=useParams();
  const Product=all_product.find((item)=>{
       return item.id=== Number(productId);
  })

  return (
    <div>
      <BreadCrumbs Product={Product}/>
      <ProductDisplay Product={Product}/>
    </div>
  )
}

export default Product