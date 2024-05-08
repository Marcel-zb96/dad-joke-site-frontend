import { useState, useEffect } from 'react';

import './MyJokes.css';

import UserJoke from '../../Components/UserJoke/UserJoke.jsx';
import NewJokeForm from '../../Components/NewJokeForm/NewJokeForm.jsx';
import Loader from '../../Components/Loader/Loader.jsx';

const fetchJokesByAuthor = async () => {
  const response = await fetch('/api/user/jokes/', {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${sessionStorage.getItem('madJokeUser')}`
    }
  });
  return await response.json();
}

const fetchDeleteJoke = async (id) => {
  const response = await fetch(`/api/jokes/${id}`, {
    method: 'DELETE',
    headers: {
      'authorization': `Bearer ${sessionStorage.getItem('madJokeUser')}`
    }
  })
  return await response.json();
}

const postNewJoke = async (newJoke) => {
  try {
    const response = await fetch(`/api/jokes/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${sessionStorage.getItem('madJokeUser')}`
      },
      body: JSON.stringify({
        ...newJoke
      })
    })
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

const fetchPutJoke = async (updatedJoke) => {
  try {
    const response = await fetch(`/api/jokes/${updatedJoke._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${sessionStorage.getItem('madJokeUser')}`
      },
      body: JSON.stringify({
        ...updatedJoke
      })
    })
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

const MyJokes = () => {

  const [jokeList, setJokeList] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    let ignore = false;
    const getUserJokes = async () => {
      const userJokes = await fetchJokesByAuthor();
      if (userJokes.success) {
        setJokeList(userJokes.jokes);
        setIsLoad(false);
      } else {
        console.log(userJokes.error);
      }
    }
    if (!ignore) {
      getUserJokes();
    }
    return () => ignore = true;
  }, []);


  const handleAdd = async (newJoke = null) => {
    if (newJoke) {
      const postedJoke = await postNewJoke(newJoke);
      if (postedJoke.success) {
        setJokeList(() => [postedJoke.newJoke, ...jokeList])
      }
    }
    setIsAdd(!isAdd);
  }

  const handleDelete = async (id) => {
    const response = await fetchDeleteJoke(id);
    if (response.success) {
      const newJokeList = jokeList.filter((joke) => joke._id !== id);
      setJokeList(newJokeList);
    } else if (!response.success) {
      console.log(response.message);
      console.log(response.error);
    }
  }

  const handleUpdate = async (updatedJoke) => {
    const response = await fetchPutJoke(updatedJoke);
    if (response.success) {
      const newJokeList = jokeList.map((joke) => joke._id === updatedJoke._id ? response.updatedJoke : joke);
      setJokeList(newJokeList);
    } else if (!response.success) {
      console.log(response.message);
      console.log(response.error);
    }
  }

  if (isLoad) return <Loader />

  return <div className='user-joke-feed-container'>
    <div className='user-joke-head-container'>
      <div className='user-joke-type-container'>
        <div className='user-joke-type'>
          Type
        </div>
      </div>
      <div className='user-joke-label-container'>
        <div className="user-joke-label">Setup / Punchline </div>
      </div>
      <div className='user-joke-button-container'>
        <button className='user-joke-add-button' onClick={() => handleAdd()}>{isAdd ? "NOPE" : "ADD"}</button>
      </div>
    </div>
    {isAdd ? <NewJokeForm onSave={handleAdd} /> : <></>}
    <div className='user-joke-feed'>
      {jokeList.map(joke => <UserJoke key={joke._id} joke={joke} onDelete={handleDelete} onUpdate={handleUpdate}/>)}
    </div>
  </div>
}

export default MyJokes;
