const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cpassword: {
    type: String,
    required: true
  },
  periodDate: {
    type: Date,
    required: true 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
