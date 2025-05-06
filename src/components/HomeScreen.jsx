import React from 'react'
import gavinImage from '../assets/images/gavin.png'
import logoMainTransparent from '../assets/images/logo-main-transparent.png'
const HomeScreen = () => {
  return (
    <div class="home-screen container-fluid">
    <div class="home-cover">
    <div id="menu-jk" class="header">
               <div class="container">
                   <div class="row">
                       <div class="col-md-3 logo">
                           <img class="logo-wt" src={logoMainTransparent} alt=""/>
                           <img class="logo-gry" src={logoMainTransparent} alt=""/>

                           {/* <a data-toggle="collapse" data-target="#menu" href="#menu"><i class="fas d-block d-md-none small-menu fa-bars"></i></a> */}
                       </div>
                       <div id="menu" class="col-md-9 d-none d-md-block">
                           <ul>
                               <li><a href="#">Home</a></li>
                               <li><a href="#about_us">About Me</a></li>
                               <li><a href="#services">Services</a></li>
                               <li><a href="#contact">Contact Me</a></li>
                            
                           </ul>
                       </div>
                   </div>
               </div>
           </div>
           <div class="container">
               <div class="row home-detail">
                   <div class="col-md-5 animated bounceInLeft hom-img">
                       <img src={gavinImage} alt=""/>
                   </div>
                   <div class="col-md-7 animated bounceInRight homexp">
                       <h5>Hello I'm</h5>
                       <h2>Gaurav (Gavin) Sharma</h2>
                       <span>Your <a>Trusted Mortgage Broker</a> </span>
                       <p>I work with the most reputed banks to get you the best Mortgage rates.</p>
          
                   </div>
               </div>

           </div>

    </div>



    </div>
  )
}

export default HomeScreen