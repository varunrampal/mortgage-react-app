import React from 'react'
import WhatsappIcon from '../assets/images/whatsapp.png'

function Whatsapp() {
  return (
    <div style={{zIndex: "6", left:"initial", bottom:"25px", position:"fixed", right:"15px"}}>
       <a href="https://api.whatsapp.com/send?phone=6042172992&text=Hello%20Gavin,%20I%20am%20interested%20in%20your%20services" target="_blank" rel="noopener noreferrer">
        
        <img src={WhatsappIcon} alt="Whatsapp"/>
        </a>
        </div>
  )
}

export default Whatsapp