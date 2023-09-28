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

async function createJokeList() {
    try {
        const jokes = await JokeModel.find({});
        console.log(jokes);
        return jokes
    } catch (error) {
        console.log(err);
    }
}

async function createJokeListByType(jokeType) {
    try {
        const jokes = await JokeModel.find({ type: jokeType });
        console.log(jokes);
        return jokes
    } catch (error) {
        console.log(err);
    }
}

app.get('/api/jokes/:type', async (req, res) => {
    console.log(req.params.type);
    const jokeType = req.params.type
    const jokeList = await createJokeListByType(jokeType);
    res.send(jokeList).status(200)
})


app.get('/api/jokes', async (req, res) => {
    console.log(req);
    const jokeList = await createJokeList();
    res.send(jokeList).status(200)
})

//user endpoint

app.get('/api/user/:name/:email', async (req, res) => {
  const name = req.params.name;
  const email = req.params.email;
  console.log(name, email);
  try {
    const user = await User.findOne({name: name, email: email});
    console.log(user);
    if (user) {
      res.json({success: 'You are logged in'});
    }
  } catch (error) {
    console.error(error);
    res.json({success: 'User not extist, please register'});
  }
});

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
    res.status(201).json({success: 'User created'});
  } catch (error) {
    console.error(error);
    res.json({success: 'Email or username already exists'})
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