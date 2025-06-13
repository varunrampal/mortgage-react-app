// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: '*', // Allow all origins for development; restrict in production
  methods: ['GET', 'POST'], // Allow only GET and POST methods
 
};

// Twilio credentials (use environment variables in production)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const twilioTOPhone = process.env.TWILIO_TO_PHONE_NUMBER;


const client = twilio(accountSid, authToken);
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
   
  const { phone, message } = req.body;

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