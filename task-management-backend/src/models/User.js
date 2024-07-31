import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String},
  password: { type: String },
  googleToken: { type: String },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
  });

  const User = mongoose.model('User', UserSchema);

  export default User;
