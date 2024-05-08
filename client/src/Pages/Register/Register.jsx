import './Register.css';

import { useState } from "react"
import { useNavigate } from "react-router-dom";

const fetchRegister = async (userName, password, email, firstName, lastName) => {
  try {
    const response = await fetch(`/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName,
        password,
        email,
        firstName,
        lastName
      })
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

const Register = () => {

  const [validation, setValidation] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigate = useNavigate();

  const pwConfirm = () => {
    return password === passwordConfirm;
  }

  const sendRegister = async () => {
    const response = await fetchRegister(userName, password, email, firstName, lastName);
    setValidation(response.message);
    if (response.success) {
      navigate('/login')
    } else {
      setUserName('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setEmail('');
      console.log(response.message)
    }
  }

  const handleRegister = (e) => {
    e.preventDefault();
    if (!pwConfirm) {
      setValidation("Passwords do not match");
    } else {
      setValidation(null);
      sendRegister()
    }
  }

  return <>
    <div className="login-container">
      <div className="login-title">Register</div>
      {
        validation === null
          ? <></>
          : <div className="input-feedback">{validation}</div>
      }
      <form className="login-form" onSubmit={handleRegister}>

        <div className="sign-input-box">
          <label className="sign-label">First name: </label>
          <input required type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
        </div>

        <div className="sign-input-box">
          <label className="sign-label">Last name: </label>
          <input required type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
        </div>

        <div className="sign-input-box">
          <label className="sign-label">Username: </label>
          <input required type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
        </div>

        <div className="sign-input-box">
          <label className="sign-label">Email: </label>
          <input required type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        </div>

        <div className="sign-input-box">
          <label className="sign-label">Password: </label>
          <input required type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>

        <div className="sign-input-box">
          <label className="sign-label">Password confirmation: </label>
          <input required type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
        </div>

        <div className="login-button-container">
          <button type="submit" className="sign-button">Sign up</button>
        </div>

      </form>
    </div>
  </>
}

export default Register;