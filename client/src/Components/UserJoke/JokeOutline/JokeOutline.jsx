import './JokeOutline.css';

const JokeOutline = ({joke, onEdit, onDelete}) => {


  return <>
    <div className="user-joke-container">
      <div className='user-joke-type-container'>
        <div className='user-joke-type'>
          {joke.type}
        </div>
      </div>
      <div className='user-joke-text-container'>
        <div className='user-joke-part-container'>
          <div className="user-joke-label">Setup: </div>
          <div className='user-joke-text'>{joke.setup}</div>
        </div>
        <div className='user-joke-part-container'>
          <div className="user-joke-label">Punchline: </div>
          <div className='user-joke-text'>{joke.punchline}</div>
        </div>
      </div>
      <div className="user-joke-button-container">
        <button className="user-joke-button" onClick={() => onEdit()} >
          Edit
        </button>
        <button className="user-joke-button" onClick={onDelete} >
          Delete
        </button>
      </div>
    </div >
  </>
}

export default JokeOutline;