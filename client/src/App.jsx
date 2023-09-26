import { useEffect, useState } from 'react'
import './App.css'


function App() {

  const [jokes, setJokes] = useState([])

  useEffect(() => {
    const fetchJokes = async () => {
      const response = await fetch('/api/jokes');
      const data = await response.json();
      console.log(data);
      setJokes(data)
      if (response.status === 200) {
        console.log("List is here");
      }
    }
    fetchJokes()
  }, [])

 console.log(jokes);


  return (
    <div>
      Main page
    </div>
  )
}

export default App
