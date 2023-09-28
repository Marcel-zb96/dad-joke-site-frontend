import { useEffect, useState } from "react"
import Joke from "./Joke"

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
        <Joke joke={randomJoke} /> :
        <div>Loading...</div> 
      }
    </>
  )
}