import { Outlet, Link } from 'react-router-dom';
import "./Header.css"
import { useState } from 'react';
import {useNavigate} from "react-router-dom";

const Header = () => {
  
  const [isOnRandom, setIsOnRandom] = useState(false);
  const navigate = useNavigate();
  
  const handleLogOut = () => {
    sessionStorage.removeItem("madJokeUser");
    navigate('/home')
  }

  const handleRandom = () => {
  }

  return <>
    <div className='header-box'>
      <div className='title-container'>
        <div className='page-title'>Mad Jokes</div>
        <div className='title-button-container'>
          <Link className='title-button' to="/home">Home</Link>
          <Link className='title-button' to="/random">Random Joke</Link>
        </div>
      </div>
      {!sessionStorage.getItem("madJokeUser") ?
        <div className='user-button-container'>
          <Link to="/login" className='user-button'>Log In</Link>
          <Link to="/register" className='user-button'>Sign Up</Link>
        </div>
        : <div className='user-button-container'>
          <Link className='user-button' to="/myjokes">My jokes</Link>
          <Link className='user-button' to="/profile">Profile</Link>
          <Link className='user-button' to="/home" onClick={handleLogOut}>Log Out</Link>
        </div>
      }
    </div >
    <Outlet />
  </>
}

export default Header;