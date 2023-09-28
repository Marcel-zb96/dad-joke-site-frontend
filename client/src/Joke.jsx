import { useState } from "react"
import './OneJoke.css'

export default function Joke({ joke }) {

    const [punchVisible, setPunchVisible] = useState(false)
    const [likesNum, setLikesNum] = useState(joke.likes);
    const [disLikeNum, setDisLikeNum] = useState(0);


    async function fetchByMethod(url, methodName, data) {
        const response = await fetch(url, {
            method: methodName,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return response
    }



    const handleLike = async () => {
        setLikesNum((prev)=>prev+1)
        const id = joke._id;
        const likes = likesNum+1
        const response = await fetchByMethod(`/api/jokes/${id}`, 'PATCH', { likes })
        if (response.ok) {
            console.log("Thank you for the like");
        }
    }

    return (
        <>
            <div className="oneJoke">
                <h2>{joke.setup}</h2>
                {punchVisible ? <h3 style={{ color: 'red' }}>{joke.punchline}</h3> : <h3>Funny content</h3>}
                <button onClick={() => setPunchVisible(!punchVisible)}>{punchVisible ? 'Bezárás' : 'Nevetésért katt'}</button>
                <button onClick={() => handleLike()} style={{ color: 'green' }}>Like</button>
                <button onClick={() => setDisLikeNum((previous) => previous + 1)} style={{ color: 'red' }}>Dislike</button>
                <div>
                    <div style={{ color: "green", display: "flex" }}>Likes:{likesNum === 0 ? 0 : likesNum}</div>
                    <div style={{ color: "red", display: "flex" }}>Dislikes:{disLikeNum === 0 ? 0 : disLikeNum}</div>
                </div>
            </div>
        </>
    )
}

