import { useState } from 'react';
import './UserData.css';

const UserDataForm = ({ user, onSave }) => {

  const [firstName, setFirstName] = useState(user.userInfo.firstName);
  const [lastName, setLastName] = useState(user.userInfo.lastName);
  const [userName, setUserName] = useState(user.userInfo.userName);
  const [email, setEmail] = useState(user.userInfo.email);


  const handleSubmit = (e) => {
    e.preventDefault();
    const userUpdates = {
      firstName,
      lastName,
      userName,
      email
    }
    onSave(userUpdates)
  }

  return <>
    <form className="profile-page-container" onSubmit={handleSubmit}>

      <div className='profile-head-container'>
        <div className='profile-page-title'> Edit profile</div>
        <div className="user-profile-button-container">
          <button className="user-profile-button" type='submit'>Save</button>
        </div>
      </div>

      <div className="user-info-container">
        <div className="user-info-label">First name: </div>
        <input type="text" className="user-info-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>

      <div className="user-info-container">
        <div className="user-info-label">Last name: </div>
        <input className="user-info-input" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
      </div>

      <div className="user-info-container">
        <div className="user-info-label">Username: </div>
        <input className="user-info-input" value={userName} onChange={(e) => setUserName(e.target.value)}/>
      </div>

      <div className="user-info-container">
        <div className="user-info-label">Email: </div>
        <input className="user-info-input" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div className="user-info-container">
        <div className="user-info-label">Registered at: </div>
        <div className="user-info-input">{user.createdAt}</div>
      </div>
    </form>
  </>
}

export default UserDataForm;