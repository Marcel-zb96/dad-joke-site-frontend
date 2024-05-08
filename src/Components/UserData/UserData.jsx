

const UserData = ({ user, toggleEdit, togglePWChange }) => {


  return <>
    <div className="profile-page-container">
      <div className='profile-head-container'>

        <div className='profile-page-title'> User profile</div>

        <div className="user-profile-button-container">
          <button className="user-profile-button" onClick={toggleEdit}>Edit</button>
          <button className="user-profile-button" onClick={togglePWChange} >Change password</button>
        </div>
      </div>
      <div className="user-info-container">
        <div className="user-info-label">First name: </div>
        <div className="user-info-content">{user.userInfo.firstName}</div>
      </div>

      <div className="user-info-container">
        <div className="user-info-label">Last name: </div>
        <div className="user-info-content">{user.userInfo.lastName}</div>
      </div>

      <div className="user-info-container">
        <div className="user-info-label">Username: </div>
        <div className="user-info-content">{user.userInfo.userName}</div>
      </div>

      <div className="user-info-container">
        <div className="user-info-label">Email: </div>
        <div className="user-info-content">{user.userInfo.email}</div>
      </div>

      <div className="user-info-container">
        <div className="user-info-label">Registered at: </div>
        <div className="user-info-content">{user.createdAt}</div>
      </div>

      <div className="user-profile-button-container">
        <button className="user-profile-button">Delete profile</button>
      </div>
    </div>
  </>
}

export default UserData;