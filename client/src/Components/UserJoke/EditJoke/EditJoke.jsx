import NewJokeForm from '../../NewJokeForm/NewJokeForm';
import './EditJoke.css';

const EditJoke = ({joke, toggleEdit, onSave}) => {

  const handleSave = (jokeUpdate = null) => {
    if (jokeUpdate) {
      const updatedJoke = {
        ...joke,
        ...jokeUpdate
      }
      onSave(updatedJoke);
    }
    toggleEdit();
  }

  return <>
    <NewJokeForm onSave={handleSave} joke={joke} />
  </>
}

export default EditJoke;