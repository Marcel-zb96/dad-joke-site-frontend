import Joke from "../../Components/Joke/Joke"
import './JokeFeed.css'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader"

const fetchTypes = async () => {
  const response = await fetch('/api/jokes/types', {
    method: 'GET',
    headers: { 'authorization': `Bearer ${sessionStorage.getItem('madJokeUser')}` }
  });
  return await response.json();
}

const fetchJokes = async (jokeType) => {
  const response = await fetch(`/api/jokes?type=${jokeType}`, {
    method: 'GET',
    headers: { 'authorization': `Bearer ${sessionStorage.getItem('madJokeUser')}` }
  });
  return await response.json();
}

const JokeFeed = ({ jokeType }) => {
  const [jokes, setJokes] = useState(null)
  const [types, setTypes] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const getJokesAndTypes = async () => {
      const data = await fetchJokes(jokeType);
      const allTypes = await fetchTypes();
      setTypes(allTypes);
      setJokes(data);
    }
    if (!ignore) {
      getJokesAndTypes();
    }
    return () => ignore = true;
  }, [jokeType])

  const handleTypeChange = (e) => {
    setTypes(null);
    navigate(`/${encodeURIComponent(e.target.value)}`);
  };

  if (!types || !jokes) return <Loader />

  return (
    <div className="main-container">
      <div className="filter-container">
        <div className="joketype-title"># {jokeType}</div>
        <hr />
      </div>
      <div className="joke-feed">
        {jokes.map((joke) => <Joke key={joke._id} joke={joke} />)}
      </div>
    </div>
  )
}

export default JokeFeed;