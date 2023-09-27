import { Outlet, useLocation, Link } from 'react-router-dom';
import "./Header.css"

export default function Header() {
  const location = useLocation();
  console.log(location)

  const user = localStorage.getItem("user")

  return (
    <>
    <div className='header-box'>
      <button><Link to="/">Home</Link></button>
      <button><Link to="/">Random Joke</Link></button>
      {!user ? 
      <button><Link to="/">Log In</Link></button> :
      
      <button><Link to="/">Log Out</Link></button>}
      
    </div>
    <Outlet/>
    </>
  )
}