
export default function Joke({Joke}){

    return(
        <div>
            <div>{Joke.setup}</div>
            <h3>{Joke.punchline}</h3>
        </div>
    )
}