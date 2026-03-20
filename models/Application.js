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
  },
  { timestamps: true }
);

export default mongoose.model('Application', applicationSchema);
