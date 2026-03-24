<<<<<<< HEAD
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fullName: { 
    type: String, 
    required: [true, 'Full name is required'],
    trim: true
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: [function() { return !this.googleId; }, 'Password is required']
  },
  googleId: { 
    type: String, 
    sparse: true 
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
=======
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
    },
    status: {
      type: String,
      enum: ['Applied', 'Interviewing', 'Offered', 'Rejected'],
      default: 'Applied',
    },
    dateApplied: {
      type: Date,
      required: [true, 'Date applied is required'],
    },
    followUpDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Application', applicationSchema);
>>>>>>> d15571ef74bed8cbe61c36f2b25c762a40596faa
