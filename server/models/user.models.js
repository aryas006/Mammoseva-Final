const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

userSchema.pre('save', async function(next){
  if(this.isModified('password')){
      this.password = await bcrypt.hash(this.password,12)
  }
  next()
})

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
