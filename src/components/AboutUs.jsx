import React from 'react'
import gavinImage from '../assets/images/gavin.png'
const AboutUs = () => {
  return (
    <div id="about_us" class="about-us container-fluid">
        <div class="container">
            <div class="session-title row">
                <h2>About Me</h2>
                <p>I can offer you several choices to help find you the mortgage that best matches your needs. I strives to provide each of my clients with a great experience in order to build strong, lasting relationships. Mortgage financing doesn't have to be difficult, let me walk you through the process and be your guide to building wealth</p>
                <div class="heading-line"></div>
            </div>
            <div class="about-row row">
                <div class="image-col col-md-4">
                    <img src={gavinImage} alt=""/>
                   
                </div>
                <div class="detail-col col-md-8">
                    <h2>Gaurav (Gavin) Sharma</h2>
                    <h6>Mortgage Broker</h6>
                    <p>I understand that a mortgage can be complex and challenging to understand. With a decade of experience in the industry, I will provide you with the knowledge and resources to make an informed decision on one of your biggest purchases. Whether you are in the market for buying your first home, second home, an investment property, looking to consolidate debt, or want to tap into your home's equity, I will ensure that you secure the right mortgage to meet your needs. </p>
                    <div class="row">
                        <div class="col-md-6 col-12">
                            <div class="info-list">
                                <ul>
                                    <li><span>Company:</span>yms</li>
                                    <li><span>Reg#:</span>601764</li>
                                    <li><span>Association:</span>Proud member of Verico</li>
                                    <li><span>Phone:</span>604-217-2992</li>
                                    <li><span>Email:</span>gavin.sharma@ymscanada.ca</li>
                                    <li><span>City:</span>2961 Townline Rd, Abbotsford</li>
                                    
                                </ul>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AboutUs