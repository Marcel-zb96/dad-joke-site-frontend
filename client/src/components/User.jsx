import { useState } from "react";
import { Link } from "react-router-dom";

function User() {

  const userData = {name: 'Huxley', email: 'huxley@gmail.com'};
  async function sendRequest(url, payload, method) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const [readOnly, setReadOnly] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [updateUser, setUpdateUser] = useState(null);

  function handleEdit() {
    setReadOnly(!readOnly);
    setHidden(!hidden);
  }

  async function handleSave() {
    setReadOnly(!readOnly);
    const payload = {
      name: name,
      email: email
    };
    setHidden(!hidden);
    const response = await sendRequest('/api/user', payload, 'POST')
    console.log(response);
    setUpdateUser('Success');
  }

  return (
    <>
      <Link to='/'><button>HOME</button></Link>
      <h2>User data</h2>
      <h2>{updateUser}</h2>
      <form >
        <div>
        <label>name: </label>
        <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} readOnly={readOnly} />
        </div>
        <div>
          <label>email: </label>
          <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} readOnly={readOnly} />
        </div>
      </form>
      <div>
        <button onClick={handleEdit} hidden={!hidden}>Edit</button>
        <button onClick={handleSave} hidden={hidden}>Save</button>
      </div>
    </>
  );
}

export default User;