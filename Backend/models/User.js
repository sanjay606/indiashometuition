import mongoose from "mongoose";

export const options = {
  discriminatorKey: "role",
  timestamps: true,
};

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    isPhoneVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
  },
  options
);

// Base User model
const User = mongoose.models.User || mongoose.model("User", userSchema);

// Tutor schema extending User
const tutorSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  experience: { type: Number, required: true },
  hourlyRate: { type: Number, required: true },
  availability: { type: String, required: true },
});

// Student schema extending User
const studentSchema = new mongoose.Schema({
  gradeLevel: { type: String, required: true },
  preferredSubjects: { type: [String], required: true },
  guardianContact: { type: String, required: true },
});

// Create or reuse models for each role
const Tutor = mongoose.models.Tutor || User.discriminator("Tutor", tutorSchema);
const Student = mongoose.models.Student || User.discriminator("Student", studentSchema);

export { User, Tutor, Student };
