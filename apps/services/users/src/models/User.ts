import mongoose, { Schema } from "mongoose"

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: ['Password is required'],
  },
  username: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: '__v'
})

const Users = mongoose.models.User || mongoose.model('User', UserSchema);

export default Users