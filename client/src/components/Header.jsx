import { Outlet, useLocation, Link } from 'react-router-dom';
import "./Header.css"

export default function Header() {
  const location = useLocation();

  const user = localStorage.getItem("user");

  function handleLogOut() {
    localStorage.clear()
  }

  return (
    <>
      <div className='header-box'>
        <Link className='home-button' to="/home"><button className='home-button' >Home</button></Link>
        <Link className='random-joke-button' to="/random"><button className='random-joke-button'>Random Joke</button></Link>
        {!user
          ? <Link to="/login" className='login-button'><button className='login-button'>Log In</button></Link>
          : (
            <div className='user-buttons'>
              <Link className='myjokes-button' to="/ownJokes"><button className='myjokes-button'>My jokes</button></Link>
              <Link className='profile' to="/profile"><button className='profile'>Profile</button></Link>
              <Link className='logout-button' to="/home"><button className='logout-button' onClick={handleLogOut}>Log Out</button></Link>
            </div>
          )
        }
      </div >
      <Outlet />
    </>
  )
}