import { Link } from "react-router-dom"
import Joke from "./Joke"
import { useEffect, useState } from "react"

export default function JokesByType({ jokeType }) {

  const [jokes, setJokes] = useState([])
  const [sortByLike, setSortByLike] = useState(false)


  useEffect(() => {
    const fetchJokes = async () => {
      const response = await fetch(`/api/jokes?type=${jokeType}&sort=${sortByLike ? "asc" : "desc"}`);
      const data = await response.json();
      setJokes(data)
    }
    fetchJokes()
  }, [sortByLike])

  return (
    <>
      <button onClick={() => setSortByLike(!sortByLike)}>Sort By Likes</button>
      <ul>
        {jokes.map((joke) => <Joke key={joke._id} joke={joke} />)}
      </ul>
    </>
  )
}