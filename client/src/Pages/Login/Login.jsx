import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserStorage } from "../../util/util";

function Login() {

  const [user, setUser] = useUserStorage();

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
    setValidation(response.success);
  }

  async function handleLogin() {
    const response = await fetchData(`/api/user/${name}/${email}`);
    setUser(name)
    setValidation(response.success);
  }
  

  return (
    <>
      <h2>Login</h2>
      <h2>{validation}</h2>
      <form>
        <div>
          <label>Username: </label>
          <input type="text" value={name} onChange={(e) => {setName(e.target.value)}}/>
        </div>
        <div>
          <label>Password: </label>
          <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
        </div>
      </form>
      <div>
        <button onClick={handleLogin}><Link to='/home'>Login</Link></button>
        <Link to={'/register'}>Sign up</Link>
      </div>
    </>
  );
}

export default Login;