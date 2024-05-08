import { useState } from 'react';
import './UserJoke.css';
import DeletePopup from './DeletePopup/DeletePopup';
import JokeOutline from './JokeOutline/JokeOutline';
import EditJoke from './EditJoke/EditJoke';

const UserJoke = ({ joke, onDelete, onUpdate }) => {

  const [isDelete, setIsDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const toggleDelete = () => {
    setIsDelete(!isDelete);
  }

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  }

  if (isDelete) return <DeletePopup joke={joke} toggleDelete={toggleDelete} onDelete={onDelete} />;
  if (isEdit) return <EditJoke joke={joke} toggleEdit={toggleEdit} onSave={onUpdate}/>;
  return <JokeOutline joke={joke} onDelete={toggleDelete} onEdit={toggleEdit} />

}

export default UserJoke;