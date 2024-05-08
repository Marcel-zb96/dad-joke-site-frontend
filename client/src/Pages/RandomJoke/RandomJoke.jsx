import { useEffect, useState } from "react"
import './RandomJoke.css';
import Joke from "../../Components/Joke/Joke"
import Loader from "../../Components/Loader/Loader";

const fetchRandomJoke = async () => {
  const response = await fetch('/api/jokes/random', {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${sessionStorage.getItem('madJokeUser')}`
    }
  });
  return await response.json();
}

export default function RandomJoke() {
  const [randomJoke, setRandomJoke] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function fetchRandom() {
      const randomJoke = await fetchRandomJoke();
      setRandomJoke(randomJoke);
    }
    if (!ignore) {
      fetchRandom();
    }
    return () => ignore = true
  }, [])

  if (!randomJoke) return <Loader />

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