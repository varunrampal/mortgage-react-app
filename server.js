// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = 5000;

// Twilio credentials (use environment variables in production)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const twilioTOPhone = process.env.TWILIO_TO_PHONE_NUMBER;


const client = twilio(accountSid, authToken);
app.use(cors());
app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
   
  const { phone, message } = req.body;
  console.log("Received SMS:", { phone, message });
  console.log("Twilio Phone:", twilioPhone);
  console.log("Account SID:", accountSid);
  console.log("Auth Token:", authToken);
  try {
    await client.messages.create({
      body: message+' ( From: '+phone+' )',
      from: twilioPhone,
      to: twilioTOPhone
    });
    res.status(200).send('Message sent');
  } catch (error) {
    
    res.status(500).send('Error sending message');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});