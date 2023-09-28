import { useState } from "react";
import { useEffect } from "react";

function User({userName}) {
  console.log(userName);
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updateUser, setUpdateUser] = useState({success: ''});

  useEffect(() => {
    async function fetchData(userName) {
      try {
        const response = await fetch(`/api/user/${userName}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    }
  
    async function getUser(userName) {
      const user = await fetchData(userName);
      setName(user.name);
      setEmail(user.email);
    }

    getUser(userName);
  }, []);

  async function handleEdit() {
    setReadOnly(!readOnly);
    setHidden(!hidden);
  }

  async function handleSave() {
    setReadOnly(!readOnly);
    const payload = {
      targetName: userName,
      name: name,
      email: email
    };
    setHidden(!hidden);
    const response = await sendRequest('/api/user', payload, 'PATCH');
    console.log(response);
    setUpdateUser(response);
  }

  return (
    <>
      <h2>User data</h2>
      <h2>{updateUser.success}</h2>
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