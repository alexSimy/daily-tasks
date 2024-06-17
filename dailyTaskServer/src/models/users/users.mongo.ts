import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const users = mongoose.model('User', usersSchema);

export default users;
