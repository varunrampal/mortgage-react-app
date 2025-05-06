import React, { useRef,useState } from 'react';
import emailjs from '@emailjs/browser';
import ReactJsAlert from "reactjs-alert";

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState(false);
    const [type, setType] = useState("success");
    const [title, setTitle] = useState("Thank you for your inquiry. I will get back to you as soon as possible.");
    const sendEmail = (e) => {
      e.preventDefault();
     
     
      emailjs
        .sendForm('service_9wwh682', 'template_btoua8k', form.current, {
          publicKey: 'LjissUB9pujYt6oa7',
        })
        .then(
          () => {
            console.log('SUCCESS!');

          setStatus(true);
          setType("success");
          setTitle("Thank you for your inquiry. I will get back to you as soon as possible.");
  
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    };


  return (
    <>
    <div class="container">

    <div class="session-title row">
                <h2>Contact Me</h2>
                <p>I can offer you several choices to help find you the mortgage that best matches your needs.</p>
                <div class="heading-line"></div>
            </div>
    </div>
     <div id="contact" style={{width:'100vw', height: '100vh', display:'flex'}}>
     <form class="formContainer" ref={form} onSubmit={sendEmail}>
     <div class="formElement">
     <label>Name</label>
     <input type="text" name="name" placeholder="Enter your full name"/>
     </div>
     <div class="formElement">
     <label>Email</label>
     <input type="email" name="email" placeholder="Enter your email address"/>
     </div>
     <div class="formElement">
     <label>Phone</label>
     <input type="tel" name="phone" placeholder="+2348123457"/>
     </div>
     <div class="formElement">
     <label>Message</label>
     <textarea name="message" rows="4" cols="35" />  
     </div>
      
       <input type="submit" value="Send" className='formButton'/>
      </form>
      <ReactJsAlert
        status={status}
        type={type}
        title={title}
        Close={() => setStatus(false)}
      />
     </div>

    </>
   
  )
}

export default Contact

