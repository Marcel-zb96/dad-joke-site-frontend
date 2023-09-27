import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';


function App() {

  const [types, setTypes] = useState(null);

  useEffect(() => {
    async function fetchTypes() {
      const response = await fetch('/api/types');
      const data = await response.json();
      setTypes(data);
    }
    fetchTypes();
  }, [])

  if (types) {
    return (
      <>
        <div className='types'>
          {types.map((type) => {
            return (
              <Link key={type} to={`/${encodeURIComponent(type)}`}><div className='type-box'>{type}</div></Link>
            )
          })}
          <Link key={'all'} to={`/${encodeURIComponent('all')}`}><div className='type-box'>{'All'}</div></Link>
        </div>
      </>
    )
  }

  return <div>Loading...</div>
}

export default App
