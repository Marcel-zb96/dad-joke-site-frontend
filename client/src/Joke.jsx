import { useState } from "react"

export default function Joke({ joke }) {

    const [punchVisible, setPunchVisible] = useState(false)

    return (
        <>
            <div className="oneJoke">
                <h2>{joke.setup}</h2>
                {punchVisible ? <h3 style={{ color: 'red' }}>{joke.punchline}</h3> : <h3>Funny content</h3>}
                <button onClick={() => setPunchVisible(!punchVisible)}>{punchVisible ? 'Bezárás' : 'Nevetésért katt'}</button>
                <button style={{ color: 'green' }}>Like</button>
                <button style={{ color: 'red' }}>Dislike</button>
            </div>
        </>
    )
}

