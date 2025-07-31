const express = require('express');
const router = express.Router();
const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const verifySid = process.env.TWILIO_VERIFY_SID;

router.post('/send', async (req, res) => {
  const { phone } = req.body;
  try {
    await client.verify.v2
      .services(verifySid)
      .verifications.create({ to: `+91${phone}`, channel: 'sms' });

    res.json({ success: true, message: 'OTP sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

router.post('/verify', async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const verification_check = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: `+91${phone}`, code: otp });

    if (verification_check.status === 'approved') {
      res.json({ success: true, message: 'OTP verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'OTP verification failed' });
  }
});

module.exports = router;
