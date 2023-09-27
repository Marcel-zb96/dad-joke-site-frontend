import { useState, useEffect } from 'react';
import '../ownJokes.css';

function OwnJokes(props) {
  const [isCreatingJoke, setIsCreatingJoke] = useState(false);
  const [jokeList, setJokeList] = useState([]);
  const author = props.author;

  function changeCreateStatus() {
    setIsCreatingJoke(!isCreatingJoke);
  }

  function displayJoke(jokeObject) {
    return <div className='jokeBox'>
      <p>Setup: {jokeObject.setup}</p>
      {jokeObject.punchline.length > 0 && <p>Punchline: {jokeObject.punchline}</p>}
    </div>
  }

  useEffect(() => {
    async function fetchJokesByAuthor(author) {
      const response = await fetch(`/api/jokes/${author}`);
      const data = await response.json();
      setJokeList(data);
    }
    fetchJokesByAuthor(author);
  }, [])

  return (
    <>
      {isCreatingJoke ?
        <form className='newJokeForm'>
          <label>Setup: </label>
          <input className='newJokeInput'></input>
          <label>Punchline: </label>
          <input className='newJokeInput'></input>
          <button>Submit</button>
          <button onClick={changeCreateStatus}>Back</button>
        </form>
        :
        jokeList.length > 0 ?
          <>
            <button onClick={changeCreateStatus}>ADD</button>
            {jokeList.map((joke) => displayJoke(joke))}
          </>
          :
          <p>Loading...</p>
      }
    </>
  )
}

export default OwnJokes;
