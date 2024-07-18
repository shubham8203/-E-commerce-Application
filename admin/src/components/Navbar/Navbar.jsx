import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.png'
import navProfile from '../../assets/nav-profile.png'
const Navbar = () => {
  return (
    <div class='navbar'>
        <div className='logo-container'>
        <img src={navlogo} alt="" className='nav-logo'/>
        <p>SHOP SMART</p>
        </div>
      
      <img src={navProfile} alt="" className='nav-profile' />

    </div>
  )
}

export default Navbar
