// server.js

import express from 'express';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import { login } from './controllers/logController.js';
import { User, Tutor } from './models/User.js';
import { corsMiddleware } from './middleware.js';  // CORS middleware import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(corsMiddleware);

// MongoDB Connection
const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.error('MONGO_URL is missing in .env file');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    try {
      await User.collection.dropIndex('username_1');
      console.log('username_1 index removed successfully');
    } catch (err) {
      console.log('username_1 index not found or already removed');
    }
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    setTimeout(connectDB, 5000);
  }
};
connectDB();

// Nodemailer Setup
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('EMAIL_USER or EMAIL_PASS missing in .env');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Contact Form Route
app.post('/send-contact-form', async (req, res) => {
  const {
    studentName,
    studentClass,
    phone,
    email,
    tutorPreference,
    timeSlot,
    subjects,
    address,
    heardFrom,
  } = req.body;

  if (
    !studentName ||
    !studentClass ||
    !phone ||
    !email ||
    !tutorPreference ||
    !timeSlot ||
    !subjects ||
    !address
  ) {
    return res.status(400).json({ message: 'Please fill out all required fields.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Contact Form Submission',
    text: `Name: ${studentName}
Class: ${studentClass}
Phone: ${phone}
Email: ${email}
Tutor Preference: ${tutorPreference}
Time Slot: ${timeSlot}
Subjects: ${subjects}
Address: ${address}
Heard From: ${heardFrom || 'Not specified'}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Email Sending Error:', error.message);
    res.status(500).json({ message: 'Failed to send email.', error: error.message });
  }
});

// Auth routes
app.use('/auth', authRoutes);
app.post('/login', login);

// Tutor Data Save Route
app.post('/api/tutors', async (req, res) => {
  try {
    const { name, subject, experience, email, phone } = req.body;

    if (!name || !subject || !experience || !email || !phone) {
      return res.status(400).json({ message: 'Please fill out all required fields.' });
    }

    const newTutor = new Tutor(req.body);
    await newTutor.save();
    res.status(201).json({ message: 'Tutor data saved successfully' });
  } catch (error) {
    console.error('Error saving tutor data:', error.message);
    res.status(500).json({ message: 'Failed to save tutor data.', error: error.message });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ message: 'An unexpected error occurred.', error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
