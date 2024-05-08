import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

import '../NewJokeForm/NewJokeForm.css';

const fetchTypes = async () => {
  const response = await fetch('/api/jokes/types', {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${sessionStorage.getItem('madJokeUser')}`
    }
  })
  return await response.json();
}


const NewJokeForm = ({ onSave, joke = null }) => {

  const [types, setTypes] = useState(null);
  const [selectedType, setSelectedType] = useState(joke?.type ?? '');
  const [newSetup, setNewSetup] = useState(joke?.setup ?? '');
  const [newPunchline, setNewPunchline] = useState(joke?.punchline ?? '');

  useEffect(() => {
    let ignore = false;
    const getTypes = async () => {
      const types = await fetchTypes();
      setTypes(types);
    }
    if (!ignore) {
      getTypes();
    }
    return () => ignore = true;
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newJoke = {
      setup: newSetup,
      punchline: newPunchline,
      type: selectedType
    }
    onSave(newJoke);
  }

  if (!types) {
    return <Loader />
  }

  return <>
    <div className="new-joke-form-container">
      <form className="new-joke-form" onSubmit={handleSubmit}>

        <div className="type-input-box">
          <label className="type-label">Type: </label>
          <select required className="new-joke-type-select" value={selectedType} onChange={(e) => { setSelectedType(e.target.value) }} >
            <option value=""></option>
            {types.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>

        <div className='user-joke-text-container'>
          <div className='user-joke-part-container'>
            <label className="user-joke-label">Setup: </label>
            <input type="text" value={newSetup} className="new-joke-input" onChange={(e) => setNewSetup(e.target.value)} />
          </div>

          <div className='user-joke-part-container'>
            <label className="user-joke-label">Punchline: </label>
            <input value={newPunchline} type="text" className="new-joke-input" onChange={(e) => setNewPunchline(e.target.value)} />
          </div>
        </div>

        <div className="joke-save-button-container">
          <button className="joke-save-button" type="button" onClick={() => onSave()}>CANCEL</button>
          <button className="joke-save-button" type="submit">SAVE</button>
        </div>
      </form>
    </div >
  </>
}

export default NewJokeForm