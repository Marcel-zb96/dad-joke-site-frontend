import mongoose from 'mongoose';

const { Schema } = mongoose;

const JokeSchema = new Schema({
  setup: String,
  punchline: String,
  type: String,
  author: String,
  likes: Number,
  dislikes: Number,
  created: {
    type: Date,
    default: Date.now,
  },
});

const Joke = mongoose.model("Joke", JokeSchema);

export {Joke};