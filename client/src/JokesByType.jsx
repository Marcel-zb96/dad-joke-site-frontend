
export default function JokesByType({jokes}){

    return(
        <div>
          {jokes.map((joke)=> <Joke joke={joke}/>)}
        </div>
    )
}