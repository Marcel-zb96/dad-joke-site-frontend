import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {

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

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [validation, setValidation] = useState(null);

  async function handleRegistration() {
    const payload = {
      name: name,
      email: email
    };
    const response = await sendRequest('/api/user', payload, 'POST')
    console.log(response);
    setValidation(response.success);
  }

  async function handleLogin() {
    const response = await fetchData(`/api/user/${name}/${email}`);
    console.log(response);
    setValidation(response.success);
    // move to HOME page

  }
  

  return (
    <>
      <h2>Login</h2>
      <h2>{validation}</h2>
      <form>
        <div>
          <label></label>
          <input type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
        </div>
        <div>
          <label ></label>
          <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        </div>
      </form>
      <div>
        <button onClick={handleLogin}><Link to='/'>Login</Link></button>
        <button onClick={handleRegistration}> Registration</button>
      </div>
    </>
  );

}

export default Login;