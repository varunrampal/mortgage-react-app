import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import twilio from 'twilio';

config();
const app = express();
app.use(cors());
app.use(json());

//const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const client = twilio('AC40b85200b6de014f35d6aa3863de81e2', '1eb9935a128aef1a9dc8e1afbb451d26');

app.post('/send-sms', async (req, res) => {
  const { message, to } = req.body;

  try {
    const msg = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });
    res.status(200).json({ success: true, sid: msg.sid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(5000, () => {
  console.log('SMS server running on port 5000');
});