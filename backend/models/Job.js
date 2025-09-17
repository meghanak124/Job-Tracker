const mongoose = require('mongoose');

const jobSchema = mongoose.Schema(
  {
    company: { type: String, required: true },
    role: { type: String, required: true },
    link: { type: String },
    status: { 
      type: String, 
      enum: ['Applied', 'Interview', 'Offer', 'Rejected'], 
      default: 'Applied' 
    },
    dateApplied: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
