import {useState, React} from 'react'

const SendSms = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [message, setMessage] = useState('');
  const [to, setTo] = useState('');
  const [status, setStatus] = useState('');

  const sendSMS = async () => {
    try {
      const response = await axios.post('http://localhost:500/send-sms', { message, to });
      setStatus('Message sent! SID: ' + response.data.sid);
        console.log('error.response', response.data.sid);
    } catch (error) {
      setStatus('Failed to send message: ' + error.response?.data?.error);
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
        placeholder="Recipient phone (+1234567890)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <textarea
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
    </>
  );
}

export default SendSms