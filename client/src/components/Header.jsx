import { Outlet, useLocation, Link } from 'react-router-dom';
import "./Header.css"

export default function Header() {
  const location = useLocation();
  console.log(location)

  const user = localStorage.getItem("user");

  function handleLogOut() {
    localStorage.clear()
  }

  return (
    <>
    <div className='header-box'>
      <button className='home-button'><Link to="/home">Home</Link></button>
      <button className='random-joke-button'><Link to="/random">Random Joke</Link></button>
      {!user ? 
      <button className='login-button'><Link to="/home">Log In</Link></button> :
      <div className='user-buttons'>
      <button className='myjokes-button'><Link to="/ownJokes">My okes</Link></button>
      <button className='profile'><Link to="/ownJokes">Profile</Link></button>
      <button className='logout-button' onClick={handleLogOut}><Link to="/home">Log Out</Link></button>
      </div>
      }
    </div>
    <Outlet/>
    </>
  )
}