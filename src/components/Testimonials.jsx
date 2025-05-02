import React from 'react'
import memImage_1 from '../assets/images/testimonial/member-01.jpg'
import memImage_2 from '../assets/images/testimonial/member-02.jpg'
import memImage_3 from '../assets/images/testimonial/member-03.jpg'
const Testimonials = () => {
  return (
    <section id="testimonial" class="customer-serv">
        <div class="container">
            <div class="row session-title">
                <h2>Happy Customers</h2>

            </div>

            <div class="row ro-clo">
                <div data-anijs="if: scroll, on: window, do: bounceInLeft animated, before: scrollReveal" class="col-12  col-md-6 col-lg-4">
                    <div class="shado-2 card-b">
                        <p>Awesome service. He met me off hours to accommodate me. He made transactions effortless and stress free. Highly recommend to anyone looking for mortgage with good rates. Overall excellent experience.</p>
                    </div>
                    <div class="cust-det row">
            
                        <div class="col-sm-5 col-5 an-mtc" style="padding-left:14px">
                            <b>Ishwar Sidhu</b>
                           
                        </div>
                        <div class="col-sm-4 col-4 star-par">
                            <ul class="stars">
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-12  col-md-6 col-lg-4">
                    <div class="shado-2 card-b">
                        <p>
                            Great service and very nice person who care about your money and where it goes. Overall was a very easy process and I highly recommend him for anyone who need mortgage .
                        </p>
                    </div>
                    <div class="cust-det row">
                    
                        <div class="col-sm-5 col-5 an-mtc" style="padding-left:14px">
                            <b>Binny Aderson</b>
                         
                        </div>
                        <div class="col-sm-4  col-4 star-par">
                            <ul class="stars">
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div data-anijs="if: scroll, on: window, do: bounceInRight animated, before: scrollReveal" class="col-12  col-md-6 col-lg-4">
                    <div class="shado-2 card-b">
                        <p>I decided to try him out as I was buying a new property. I have to say from start to finish Ishwinder was on top of it, he went above and beyond to get me the best rate in a short time frame.</p>
                    </div>
                    <div class="cust-det row">
                
                        <div class="col-sm-5 col-5 an-mtc" style="padding-left:14px">
                            <b>Gurpreet Kaur</b>
                      
                        </div>
                        <div class="col-sm-4 col-4 star-par">
                            <ul class="stars">
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>
  )
}

export default Testimonials