import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';
import {Joke as JokeModel} from "./db/jokes.model.js";
import User from './db/userData.js';

const { MONGO_URL, PORT = 3000 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

// Type endpoints after this line

async function createJokeList(){
    try {
        const jokes = await JokeModel.find({});
        console.log(jokes);
        return jokes
    } catch (error) {
        console.log(err);
    }
}


app.get('/api/jokes', async (req,res)=>{
    console.log(req);
    const jokeList = await createJokeList();
    res.send(jokeList).status(200)
})

//user endpoint
app.post('/api/user', async (req, res) => {

  const name = req.body.name;
  const email = req.body.email;
  const createdAt = Date.now();

  const user = new User({
    name,
    email,
    createdAt
  });
  try {
    await user.save();
    res.status(201).json({success: true});
  } catch (error) {
    console.error(error);
    res.json({success: false})
  }
});


// Type endpoints before this line

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