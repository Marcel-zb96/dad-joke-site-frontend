import 'dotenv/config';
import express from "express";
import mongoose from 'mongoose';
import { Joke as JokeModel } from "./db/jokes.model.js";
import User from './db/userData.js';

const { MONGO_URL, PORT = 3000 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get('/api/jokes/:author', async (req, res) => {
  console.log(req.params.author)
  const author = req.params.author;
  try {
    const data = await JokeModel.find({ author: author });
    res.send(data);
  } catch (err) {
    res.status(555).send(console.error(err));
  }
});

app.patch('/api/jokes/:id', async (req, res, next) => {
  try {
      const joke = await JokeModel.findById(req.params.id);
      joke.likes = req.body.likes;
      joke.dislikes = req.body.dislikes;
      console.log(joke);
      await joke.save();
      res.send(joke).status(200)
  } catch (error) {
      next(error);
  }
})


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
  const newJoke = new JokeModel({
    setup,
    punchline,
    type,
    author,
    likes,
    created
  });
  newJoke.save()
    .then((newJoke) => { res.status(200).send(newJoke) })
    .catch((err) => { res.status(444).send(err) })
});

app.get('/api/jokes', async (req, res) => {
  try {
    const type = req.query.type;
    const sort = req.query.sort;
    const jokes = type === '' ?
      await JokeModel.find() :
      await JokeModel.find({ type }).sort({likes:sort});
    res.send(jokes).status(200)
  } catch (error) {
    console.log(err);
  }
})

//user endpoint
app.get('/api/user/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const user = await User.findOne({name: name});
    res.send(user);
  } catch (error) {
    console.error(error);
    res.send('error');
  }
});

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

app.patch('/api/user', async (req, res) => {
  const targetName = req.body.targetName;
  const name = req.body.name;
  const email = req.body.email;
  try {
    const targetUser = await User.findOne({name: targetName});
    targetUser.name = name;
    targetUser.email = email;
    targetUser.save();
    res.status(201).json({success: 'User data has been changed!'});
  } catch (error) {
    console.error(error);
    res.json({success: 'Process failed!'})
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

app.get('/api/random', async (req, res, next) => {
  try {
    const randomJoke = await JokeModel.aggregate().sample(1)
    console.log(randomJoke)
    res.json(randomJoke[0]);
  } catch (error) {
    next(error);
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