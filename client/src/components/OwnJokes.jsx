import { useState, useEffect } from 'react';
import '../ownJokes.css';

function OwnJokes(props) {
  const [isCreatingJoke, setIsCreatingJoke] = useState(false);
  const testJoke = props.testJoke;
  console.log(testJoke);

  function changeCreateStatus() {
    setIsCreatingJoke(!isCreatingJoke);
  }

  function displayJoke(jokeObject) {
    return <>
      <p>Setup: {jokeObject.setup}</p>
      <p>Punchline: {jokeObject.punchline}</p>
    </>
  }

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
        <>
          <button onClick={changeCreateStatus}>ADD</button>
          {displayJoke(testJoke)}
        </>
      }
    </>
  )
}

export default OwnJokes;
