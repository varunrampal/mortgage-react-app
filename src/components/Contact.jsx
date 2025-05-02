import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs
        .sendForm('service_9wwh682', 'template_btoua8k', form.current, {
          publicKey: 'LjissUB9pujYt6oa7',
        })
        .then(
          () => {
            console.log('SUCCESS!');
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    };


  return (
    <>
     <div id="contact" style={{width:'100vw', height: '100vh', display:'flex'}}>
     <form class="formContainer" ref={form} onSubmit={sendEmail}>
     <div class="formElement">
     <label>Name</label>
     <input type="text" name="name" />
     </div>
     <div class="formElement">
     <label>Email</label>
     <input type="email" name="email" />
     </div>
     <div class="formElement">
     <label>Message</label>
     <textarea name="message" rows="8" cols="30" />  
     </div>
      
       <input type="submit" value="Send" className='formButton'/>
      </form>
     </div>

    </>
   
  )
}

export default Contact

