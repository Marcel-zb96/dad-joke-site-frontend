import Loader from '../../Components/Loader/Loader';
import UserData from '../../Components/UserData/UserData';
import UserDataForm from '../../Components/UserData/UserDataForm';
import PwChangeForm from '../../Components/UserData/PwChangeForm';

import './Profile.css';

import { useState, useEffect } from "react";

const fetchUser = async () => {
  try {
    const response = await fetch('/api/user', {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('madJokeUser')}`
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

const putUserUpdate = async (userUpdates) => {
  try {
    const response = await fetch('/api/user', {
      method: 'PUT',
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('madJokeUser')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userUpdates
      })
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

const patchPassword = async (pwS) => {
  try {
    const response = await fetch('/api/user/pwchange', {
      method: 'PATCH',
      headers: {
        'authorization': `Bearer ${sessionStorage.getItem('madJokeUser')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pwS
      })
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

const Profile = () => {

  const [user, setUser] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [isPwChange, setIsPwChange] = useState(false);

  useEffect(() => {
    let ignore = false;
    const getUser = async () => {
      const user = await fetchUser();
      if (user.success) {
        setUser(user.parsedUser);
        setIsLoad(false);
      }
    }
    if (!ignore) {
      getUser();
    }
    return () => ignore = true;
  }, []);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  }

  const togglePWChange = () => {
    setIsPwChange(!isPwChange);
  }

  const handleSave = async (userUpdates) => {
    setIsLoad(true);
    const response = await putUserUpdate(userUpdates);
    if (response.success) {
      sessionStorage.setItem("madJokeUser", response.newToken);
      setUser(response.parsedUser)
      setIsEdit(false);
      setIsLoad(false);
    }
  }

  const handlePwChange = async (pwS) => {
    setIsLoad(true);
    const response = await patchPassword(pwS);
    if (response.success) {
      setIsPwChange(false);
      setIsLoad(false);
    }
  }


  if (isLoad) return <Loader />;
  if (isEdit) return <UserDataForm user={user} onSave={handleSave} />;
  if (isPwChange) return <PwChangeForm onSave={handlePwChange} />;
  return <UserData user={user} toggleEdit={toggleEdit} togglePWChange={togglePWChange} />;
}

export default Profile;