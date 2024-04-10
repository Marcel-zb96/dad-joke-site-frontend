import { Link } from "react-router-dom"
import Joke from "../../Components/Joke/Joke"
import './JokeFeed.css'
import { useEffect, useState } from "react"
import Loader from "../../Components/Loader/Loader"

const fetchTypes = async () => {
  const response = await fetch('/api/types');
  return await response.json();
}

const JokeFeed = ({ jokeType }) => {
  const [jokes, setJokes] = useState([])
  const [selectedSort, setSelectedSort] = useState("")
  const [types, setTypes] = useState(null);
  const [filter, setFilter] = useState(jokeType);


  useEffect(() => {
    const fetchJokes = async () => {
      const response = await fetch(`/api/jokes?type=${jokeType}&sort=${selectedSort}`);
      const data = await response.json();
      setJokes(data)
    }
    const getTypes = async () => {
      const allTypes = await fetchTypes();
      setTypes(allTypes);
    }
    fetchJokes()
    getTypes();
  }, [selectedSort, filter])

  if (!types) return <Loader />

  return (
    <div className="main-container">
      <div className="filter-container">
        <label>
          Filter:
          <select defaultValue={filter} onChange={e => setFilter(e.target.value)}>
            <option value=""></option>
            {types.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label>
          Sort by:
          <select defaultValue={selectedSort} onChange={e => setSelectedSort(e.target.value)}>
            <option value="likes">Like</option>
            <option value="dislikes">Dislike</option>
            <option value=""></option>
          </select>
        </label>
        <hr />
      </div>
      <div className="joke-feed">
        {jokes.map((joke) => <Joke key={joke._id} joke={joke} />)}
      </div>
    </div>
  )
}

export default JokeFeed;