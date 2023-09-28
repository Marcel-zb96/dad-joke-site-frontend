import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  createdAt: {type: Date, default: Date.now}
});

const User = mongoose.model('User', userSchema);

export default User;

