import { useEffect, useState } from "react"
import './RandomJoke.css';
import Joke from "../../Components/Joke/Joke"
import Loader from "../../Components/Loader/Loader";

export default function RandomJoke() {
  const [randomJoke, setRandomJoke] = useState(null);

  useEffect(() => {
    async function fetchRandom() {
      const response = await fetch('/api/random');
      const randomJoke = await response.json();
      setRandomJoke(randomJoke);
    }
    fetchRandom();
  }, [])


  return (
    <>
      {
        randomJoke ?
          <div className="feed-container">
            <Joke joke={randomJoke} />
          </div> :
          <Loader />
      }
    </>
  )
}