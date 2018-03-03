import React from 'react'
import Tilt from 'react-tilt'
import cyberpunk from './cyberpunk.gif'
import './Logo.css'

const Logo = () => {
  return (
    <div className='ma7 mt0'>
      <Tilt className="Tilt" options={{ max : 3 }} >
        <div className="Tilt-inner2"><img src={cyberpunk} alt='cyber'/></div>
      </Tilt>
    </div>
  )
}

export default Logo;
