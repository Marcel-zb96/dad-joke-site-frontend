import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';
import {Joke as JokeModel} from "./jokes.model.js";

const { MONGO_URL, PORT = 3000 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

// Type endpoints after this line





// Type endpoints before this line

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 3000");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});