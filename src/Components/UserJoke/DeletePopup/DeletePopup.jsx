import './DeletePopup.css'


const DeletePopup = ({joke, toggleDelete, onDelete}) => {

  return <>
    <div className='user-joke-delete-container'>
      <div className='joke-delete-message-container'>
        <div className='joke-delete-message'>
          Sure to delete the fun part?
        </div>
        <div className='user-joke-button-container'>
          <button className='user-joke-button' onClick={toggleDelete}>Cancel</button>
          <button className='user-joke-button' onClick={() => onDelete(joke._id)}>Destroy</button>
        </div>
      </div>
    </div>
  </>
}

export default DeletePopup;