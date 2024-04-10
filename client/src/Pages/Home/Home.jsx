import { useEffect, useState } from 'react';
import './Home.css';
import Loader from '../../Components/Loader/Loader';
import { Link } from 'react-router-dom';

const fetchTypes = async () => {
  const response = await fetch('/api/types');
  return await response.json();
}

const App = () => {

  const [types, setTypes] = useState(null);

  useEffect(() => {
    const getTypes = async () => {
      const allTypes = await fetchTypes();
      setTypes(allTypes);
    }
    getTypes();
  }, [])

  if (types) {
    return <div className='main-container'>
      <div className='component-title'>This is where the fun begins:</div>
      <div className='type-container'>
        <Link key={'all'} to={`/${encodeURIComponent('all')}`}>
          <div className='type-box'>{'All'}</div>
        </Link>
        {types.map((type) => {
          return (
            <Link key={type} to={`/${encodeURIComponent(type)}`}>
              <div className='type-box'>{type}</div>
            </Link>
          )
        })}
      </div>
    </div>
  }

  return <Loader />;
}

export default App
