import { useState, useEffect } from 'react';
import '../ownJokes.css';

function OwnJokes(props) {
  const [isCreatingJoke, setIsCreatingJoke] = useState(false);
  const [jokeList, setJokeList] = useState([]);
  const [newSetup, setNewSetup] = useState('');
  const [newPunchline, setNewPunchline] = useState('');
  const [newType, setNewType] = useState('');
  const author = props.author;

  useEffect(() => {
    async function fetchJokesByAuthor(author) {
      const response = await fetch(`/api/jokes/${author}`);
      const data = await response.json();
      setJokeList(data);
    }
    fetchJokesByAuthor(author);
  }, [])

  function changeCreateStatus() {
    setIsCreatingJoke(!isCreatingJoke);
  }

  function displayJoke(jokeObject) {
    return <div key={jokeObject.id} className='jokeBox'>
      <p>Setup: {jokeObject.setup}</p>
      {jokeObject.punchline.length > 0 && <p>Punchline: {jokeObject.punchline}</p>}
    </div>
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const newJoke = {
      setup: newSetup,
      punchline: newPunchline,
      type: newType,
      author: author,
      likes: 0,
      created: Date.now
    }
    const response = await fetch('/api/jokes/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJoke)
    });
    return response.json()
  }

  return (
    <>
      {isCreatingJoke ?
        <form onSubmit={handleSubmit} className='newJokeForm'>
          <label>Setup: </label>
          <input onChange={ event => setNewSetup(event.target.value)} className='newJokeInput'></input>
          <label>Punchline: </label>
          <input onChange={ event => setNewPunchline(event.target.value)} className='newJokeInput'></input>
          <label>Category: </label>
          <select className='dropdown'>
            <option selected disabled>Please choose one</option>
            <option value='Dad Jokes'>Dad Jokes</option>
            <option value='general'>General</option>
            <option value='programming'>Programming</option>
            <option value='knock-knock'>Knock-Knock</option>
          </select>
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
