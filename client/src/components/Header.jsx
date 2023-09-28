import { Outlet, useLocation, Link } from 'react-router-dom';
import "./Header.css"

export default function Header() {
  const location = useLocation();
  console.log(location)

  const user = localStorage.getItem("user");

  function handleClick() {
    localStorage.clear()
  }

  return (
    <>
    <div className='header-box'>
      <button><Link to="/">Home</Link></button>
      <button><Link to="/">Random Joke</Link></button>
      {!user ? 
      <button><Link to="/login">Log In</Link></button> :
      <button onClick={handleClick}><Link to="/home">{user}</Link></button>}
    </div>
    <Outlet/>
    </>
  )
}