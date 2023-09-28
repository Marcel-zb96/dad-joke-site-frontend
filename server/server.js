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

app.get('/api/jokes/:author', async (req, res) => {
  const author = req.params.author;
  try {
    const data = await JokeModel.find({ author: author });
    res.send(data);
  } catch (err) {
    res.status(555).send(console.error(err));
  }
});

app.delete('/api/jokes/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await JokeModel.findOneAndDelete({ _id: id });
    res.status(200).send('Delete successful');
  } catch (err) {
    res.status(333).send(console.error(err));
  }
});

app.post('/api/jokes/new', (req, res) => {
    const setup = req.body.setup;
    const punchline = req.body.punchline;
    const type = req.body.type;
    const author = req.body.author;
    const likes = 0;
    const created = Date.now();
    const newJoke = new JokeModel ({
      setup,
      punchline,
      type,
      author,
      likes,
      created
    });
    newJoke.save()
      .then((newJoke) => {res.status(200).send(newJoke)})
      .catch((err) => {res.status(444).send(err)})
});

app.get('/api/jokes', async (req, res) => {
  try {
    const type = req.query.type;
    const jokes = type === '' ? 
      await JokeModel.find() :
      await JokeModel.find({ type });
      res.send(jokes).status(200)
  } catch (error) {
    console.log(err);
  }
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
app.get('/api/types', async (req, res) => {
  try {
    const jokes = await JokeModel.find();
    const types = [...new Set(jokes.map((joke) => joke.type))];
    res.send(types).status(200);
  } catch (error) {
    console.log(error);
  }
});

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