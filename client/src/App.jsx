import { useEffect, useState } from 'react'
import './App.css'


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

  return (
    <>
      <div>
        
      </div>
    </>
  )
}

export default App
