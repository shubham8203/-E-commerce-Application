import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import './navbar.css'
import logo from '../assets/image.png'
import cart from '../assets/cart.webp'
import { Link } from 'react-router-dom'
import { shopcontext } from '../../context/ShopContext'
const Navbar = () => {

   const [menu,setmenu]=useState("Men");
  const {getTotalItems}=useContext(shopcontext);
  const [state,setstate]=useState("Login");
   
  const changestate=()=>{
    if(localStorage.getItem('token')){
      setstate('Logout');
    }
    else setstate('Login');
  }
  const logout=()=>{
    localStorage.removeItem('token');
    changestate();
    window.location.replace('/');

  }

  useEffect(()=>{
changestate();
  },[])

  return (
   <div className='navbar'>
    <div className='navbar-logo'>
    <img src={logo} alt="logo" height={50} width={50} />
    <p>Shop  Smart</p>
    </div>
    <ul >
        <li onClick={()=>{setmenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link> {menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setmenu("men")}}><Link style={{textDecoration:'none'}} to='/mens'>Men </Link>{menu==="men"?<hr/>:<></>}</li>
        <li onClick={()=>{setmenu("women")}}><Link style={{textDecoration:'none'}} to='/womens'>Women</Link> {menu==="women"?<hr/>:<></>}</li>
        <li onClick={()=>{setmenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids'>Kids</Link> {menu==="kids"?<hr/>:<></>}</li>
    </ul>
    <div className='login-cart'>
    {(state==='Login')?<Link to='/login'> 
    <button type="button">
      {
        state
      }
    </button>
    </Link>:<button onClick={()=>(
logout()
    )}>{
      state
}</button>
     }
    <Link to='/cart'>
    <img src={cart} alt="" height={25} width={50} />
    </Link>
    
   
    <div className="cart-count">{getTotalItems()}</div>
    </div>
    
    
   </div>
  )
}

export default Navbar