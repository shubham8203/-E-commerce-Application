import React from 'react'
import './News_letter.css'


const News_letter = () => {
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers on your E-mail</h1>
        <p>Subscribe to our NewsLetter and stay updated</p>
        <div className='form'>
            <form action="">
            <input type="email" name="email" id="" placeholder='example@gmail.com'/>
            <button type="submit">Subscribe</button>
            </form>
          

        </div>
    </div>
  )
}

export default News_letter