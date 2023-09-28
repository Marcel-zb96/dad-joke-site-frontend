import { Link } from "react-router-dom"
import Joke from "./Joke"
import { useEffect, useState } from "react"

export default function JokesByType({jokeType}) {

const [jokes, setJokes] = useState([])
// let jokeType = 'Dad Jokes'

    useEffect(() => {
      const fetchJokes = async () => {
        const response = await fetch(`/api/jokes/${jokeType}`);
        const data = await response.json();
        setJokes(data)
      }
      fetchJokes()
    }, [])
  
    return (
        <>
            <nav>
                    <button><Link to="/">Home</Link></button>
                    <button><Link to="/user">Profile</Link></button>
                    <button>Sort jokes</button>      
            </nav>
            <ul>
                {jokes.map((joke)=> <Joke joke={joke}/>)}
            </ul>
        </>
    )
}