import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';
import { Joke as JokeModel } from "./db/jokes.model.js";

const { MONGO_URL, PORT = 3000 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get('/api/jokes', async (req, res) => {
  const type = req.query.type;
  try {
    const jokes = param === 'all' ?
      await JokeModel.find() :
      await JokeModel({ type });
    res.send(jokes).status(200)
  } catch (error) {
    console.log(err);
  }
})

app.get('/api/types', async (req, res) => {
  try {
    const jokes = await JokeModel.find();
    const types = [...new Set(jokes.map((joke) => joke.type))];
    res.send(types).status(200);
  } catch (error) {
    console.log(error);
  }
})

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 3000");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});