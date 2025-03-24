import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    enum: ['HIRING', 'WORKING', null],
    default: null
  },
  about: {
    type: String,
    required: false
  },
  ratings: {
    type: Number,
    required: false,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  signups: {
    type: [Date],
    default: []
  },
  logins: {
    type: [Date],
    default: []
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);