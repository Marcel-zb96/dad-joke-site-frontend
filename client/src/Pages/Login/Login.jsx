import { useNavigate } from "react-router-dom";
import { useState } from "react";

import './Login.css';

async function fetchLogin(userName, password) {
  try {
    const response = await fetch(`/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
        password
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function Login() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState(null);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetchLogin(userName, password);
    setValidation(response.message);

    if (response.success) {
      sessionStorage.setItem("madJokeUser", response.token);
      navigate('/home')
    } else {
      setUserName('');
      setPassword('');
    }
  }


  return (
    <div className="login-container">
      <div className="login-title">Login</div>
      {validation === null ? <></> : <div className="input-feedback">{validation}</div>}
      <form className="login-form" onSubmit={handleLogin}>
        <div className="sign-input-box">
          <label className="sign-label">Username: </label>
          <input type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
        </div>
        <div className="sign-input-box">
          <label className="sign-label">Password: </label>
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <div className="login-button-container">
          <button type="submit" className="sign-button">Log in</button>
          <button type="button" className="sign-button" onClick={() => navigate('/register')}>Sign up</button>
        </div>

      </form>
    </div>
  );
}

export default Login;