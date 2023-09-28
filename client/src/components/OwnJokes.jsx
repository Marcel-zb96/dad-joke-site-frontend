import { useState, useEffect } from 'react';
import '../ownJokes.css';

function OwnJokes(props) {
  const [isCreatingJoke, setIsCreatingJoke] = useState(false);
  const [jokeList, setJokeList] = useState([]);
  const [newSetup, setNewSetup] = useState('');
  const [newPunchline, setNewPunchline] = useState('');
  const [newType, setNewType] = useState('General');
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
    return <div id={jokeObject._id} key={jokeObject._id} className='jokeBox'>
      <h3>Setup: {jokeObject.setup}</h3>
      {jokeObject.punchline.length > 0 && <h3>Punchline: {jokeObject.punchline}</h3>}
      <button className='button' onClick={handleDelete}>DELETE</button>
    </div>
  }

  async function handleDelete(event) {
    const id = event.target.parentElement.id;
    await fetch(`/api/jokes/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const newJoke = {
      setup: newSetup,
      punchline: newPunchline,
      type: newType,
      author: author,
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
          <input onChange={event => setNewSetup(event.target.value)} className='newJokeInput'></input>
          <label>Punchline: </label>
          <input onChange={event => setNewPunchline(event.target.value)} className='newJokeInput'></input>
          <label>Category: </label>
          <select className='dropdown' onChange={event => setNewType(event.target.value)}>
            <option value='general'>General</option>
            <option value='Dad Jokes'>Dad Jokes</option>
            <option value='programming'>Programming</option>
            <option value='knock-knock'>Knock-Knock</option>
          </select>
          <button className='button'>SAVE</button>
          <button className='button' onClick={changeCreateStatus}>Back</button>
        </form>
        :
        jokeList.length > 0 ?
          <>
            <button className='button' onClick={changeCreateStatus}>ADD</button>
            {jokeList.map((joke) => displayJoke(joke))}
          </>
          :
          <p>Loading...</p>
      }
    </>
  )
}

export default OwnJokes;
