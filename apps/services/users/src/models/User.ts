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
  }
}, {
  timestamps: true
})

const Users = mongoose.model('User', UserSchema)

export default Users