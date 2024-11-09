const nodemailer = require('nodemailer');

// Create a transporter for SendGrid
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net', // Use SendGrid's SMTP server
  port: 587, // Port number for TLS/STARTTLS
  secure: false, // Set to `true` if you are using port 465
  auth: {
    user: 'apikey', // SendGrid requires 'apikey' as the user
    pass: process.env.SENDGRID_API_KEY, // Use the SendGrid API key from your .env file
  },
});

module.exports = transporter;
