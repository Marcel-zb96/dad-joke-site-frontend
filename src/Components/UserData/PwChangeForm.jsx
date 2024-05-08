import { useState } from "react";

const PwChangeForm = ({ onSave }) => {

  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwConfirm, setNewPwConfirm] = useState('');
  const [validation, setValidation] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pwS = {
      oldPw,
      newPw
    }
    if (confirmPw()) {
      setValidation(null)
      onSave(pwS);
    } else {
      setValidation('Passwords do not match');
    }
  }

  const confirmPw = () => {
    return newPw === newPwConfirm;
  }

  return <>
    <form className="profile-page-container" onSubmit={handleSubmit}>

      <div className='profile-head-container'>
        <div className='profile-page-title'>Change Password</div>

      </div>
      {validation ? <div className="input-feedback">{validation}</div> : <></>}
      <div className="user-info-container">
        <div className="user-info-label">Old password: </div>
        <input type="password" className="user-info-input" value={oldPw} onChange={(e) => setOldPw(e.target.value)} />
      </div>

      <div className="user-info-container">
        <div className="user-info-label">New password: </div>
        <input type="password" className="user-info-input" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
      </div>

      <div className="user-info-container">
        <div className="user-info-label">Confirm new password:  </div>
        <input type="password" className="user-info-input" value={newPwConfirm} onChange={(e) => setNewPwConfirm(e.target.value)} />
      </div>

      <div className="user-profile-button-container">
        <button className="user-profile-button" type='submit'>SAVE</button>
      </div>
    </form>
  </>
}

export default PwChangeForm;