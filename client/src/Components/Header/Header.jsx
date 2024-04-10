import { Outlet, Link } from 'react-router-dom';
import { useUserStorage } from '../../util/util';
import "./Header.css"
import { useState } from 'react';

const Header = () => {
  
  const [user, setUser] = useUserStorage();
  const [isOnRandom, setIsOnRandom] = useState(false);
  
  const handleLogOut = () => {
    setUser(null);
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
      {!user ?
        <div className='user-button-container'>
          <Link to="/login" className='user-button'>Log In</Link>
        </div>
        : <div className='user-button-container'>
          <Link className='user-button' to="/ownJokes">My jokes</Link>
          <Link className='user-button' to="/profile">Profile</Link>
          <Link className='user-button' to="/home" onClick={handleLogOut}>Log Out</Link>
        </div>
      }
    </div >
    <Outlet />
  </>
}

export default Header;