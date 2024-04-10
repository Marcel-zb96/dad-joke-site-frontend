import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./editJoke.css";

const JokeEditor = () => {
  const { jokeId } = useParams();
  const [jokeObject, setJokeObject] = useState(null);
  const [newSetup, setNewSetup] = useState("");
  const [newPunchline, setNewPunchline] = useState("");
  const [newType, setNewType] = useState("general");

  const fetchJokeById = async () => {
    const response = await fetch(`/api/jokeById/${jokeId}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    fetchJokeById()
      .then((res) => {
        setJokeObject(res);
        setNewSetup(res.setup);
        setNewPunchline(res.punchline);
        setNewType(res.type);
      })
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/api/jokes/${jokeId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        setup: newSetup,
        punchline: newPunchline,
        type: newType,
        author: jokeObject.author,
        likes: parseInt(0),
        dislikes: parseInt(0),
      })
    });
  };

  return (
    <>
      {
        !jokeObject
          ?
          <h2>Loading...</h2>
          :
          <>
            <form onSubmit={handleSubmit} className="editForm">
              <label htmlFor="setupInput">Enter joke setup: </label>
              <input
              className="inputField"
                id="setupInput"
                name="setupInput"
                value={newSetup}
                onChange={(event) => { setNewSetup(event.target.value) }}
              ></input>
              <label htmlFor="punchlineInput">Enter the punchline: </label>
              <input
              className="inputField"
                id="punchlineInput"
                name="punchlineInput"
                value={newPunchline}
                onChange={(event) => { setNewPunchline(event.target.value) }}
              ></input>
              <label htmlFor="typeChoice">Choose joke type: </label>
              <select
              className="inputField"
                id="typeChoice"
                name="typeChoice"
                value={newType}
                onChange={(event) => { setNewType(event.target.value) }}
              >
                <option value="general">General</option>
                <option value="Dad Jokes">Dad Jokes</option>
                <option value="programming">Programming</option>
                <option value="knock-knock">Knock-Knock</option>
              </select>
              <button className="button">SAVE</button>
            </form>
          </>
      }
    </>
  )

}

export default JokeEditor;