// models/Tutor.js
import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  experience: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
}, { timestamps: true });

const Tutor = mongoose.model('Tutor', tutorSchema);

export default Tutor;
