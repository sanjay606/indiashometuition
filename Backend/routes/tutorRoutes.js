// routes/tutorRoutes.js
import express from 'express';
import Tutor from '../models/Tutor.js';

const router = express.Router();

// POST route to add a new tutor
router.post('/', async (req, res) => {
  try {
    const { name, subject, experience, email, phone } = req.body;

    // Validate input
    if (!name || !subject || !experience || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new tutor
    const newTutor = new Tutor({ name, subject, experience, email, phone });
    await newTutor.save();

    res.status(201).json({ message: 'Tutor added successfully' });
  } catch (error) {
    console.error('Error adding tutor:', error.message);
    res.status(500).json({ message: 'Failed to add tutor' });
  }
});

export default router;
