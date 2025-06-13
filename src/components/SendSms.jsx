import { useState, React } from 'react'
import axios from 'axios';
import ReactJsAlert from "reactjs-alert";
const SendSms = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState("information");
  const [title, setTitle] = useState("Thank you for your inquiry. I will get back to you as soon as possible.");

  const sendSMS = async () => {
    try {
      if (!phone || !message) {
        setType("error");
        setTitle("Please enter both phone number and message.");
        setStatus(true);
        return;
      }
      const response = await axios.post('http://localhost:5000/send-message', { message, phone });
      setStatus('Message sent! SID: ' + response.data.sid);
      setPhone('');
      setMessage('');
      setStatus(true);
      setIsOpen(false);
      setType("information");
      setTitle("Thanks! Received your SMS. I will get back to you as soon as possible.");
    } catch (error) {
      setStatus('Failed to send message: ' + error.response?.data?.error);
   
      console.log('error.response', error);
      console.log('error.response', error.response);
    }
  };


  return (
    <>
      <div className={`chat-box ${isOpen ? "open" : ""}`}>
        <div className="chat-header">

          <button onClick={() => setIsOpen(false)}>×</button>
        </div>
        <div className="chat-body">
          <input
            type="text"
            className='form-control'
            placeholder="Eneter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <textarea
           className='form-control'
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: '100%', height: '100px', marginBottom: '10px' }}
          />
          <button onClick={sendSMS} style={{ width: '100%' }}>
            Send SMS
          </button>
        </div>
      </div>

      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>
         <ReactJsAlert
          status={status}
          type={type}
          title={title}
          Close={() => setStatus(false)}
        />
    </>
  );
}

export default SendSms