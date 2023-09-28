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


app.patch('/api/jokes/:id', async (req, res, next) => {
    try {
        const joke = await JokeModel.findById(req.params.id);
        joke.likes = req.body.likes;
        console.log(joke);
        await joke.save();
        res.send(joke).status(200)
    } catch (error) {
        next(error);
    }
})




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