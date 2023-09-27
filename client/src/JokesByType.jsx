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
        console.log(data);
        setJokes(data)
        if (response.status === 200) {
          console.log("List is here");
        }
      }
      fetchJokes()
    }, [])
  
    console.log(jokes);


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