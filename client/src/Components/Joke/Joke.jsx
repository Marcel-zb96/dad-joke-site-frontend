import { useState } from "react"
import './Joke.css'
import { Link } from "react-router-dom";

export default function Joke({ joke }) {

    const [likesNum, setLikesNum] = useState(joke.likes);
    const [disLikeNum, setDisLikeNum] = useState(joke.dislikes);
    const [disableLike, setDisableLike] = useState(false)
    const [disLikeBtn, setDisLikeBtn] = useState(false)

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
        setDisableLike(!disableLike)
        setLikesNum((prev) => prev + 1)
        const id = joke._id;
        const likes = likesNum + 1
        const dislikes = disLikeNum
        const response = await fetchByMethod(`/api/jokes/${id}`, 'PATCH', { likes, dislikes })
        if (response.ok) {
            console.log("Thank you for the like");
        }
    }

    const handleDislike = async () => {
        setDisLikeNum((previous) => previous + 1)
        setDisLikeBtn(!disLikeBtn)
        const id = joke._id;
        const dislikes = disLikeNum + 1
        const likes = likesNum
        const response = await fetchByMethod(`/api/jokes/${id}`, 'PATCH', { dislikes, likes })
        if (response.ok) {
            console.log("Thank you for the dislike");
        }
    }

    return (
        <>
            <div className="joke-container">
                <h2>{joke.setup}</h2>
                {localStorage.getItem("user")
                    ? <div className="punchline" >{joke.punchline}</div>
                    : <>
                        <div className="blured-punchline">Really funny punchline</div>
                        <div className="login-request">
                            <Link to="/login">Log in to see content</Link>
                        </div>
                    </>}
                <div className="like-button-container">
                    <button className="like-button" onClick={() =>
                        handleLike()} style={{ color: "green", display: "flex" }} disabled={disableLike} >
                        Like: {likesNum}</button>
                    <button className="like-button" disabled={disLikeBtn} onClick={() =>
                        handleDislike()}
                        style={{ color: "red", display: "flex" }}>
                        Dislike: {disLikeNum}</button>
                </div>
                <div className="jokeAuthor">{joke.author === "unknown" ? ` Author: Anonymus` : `Author: ${joke.author}`}</div>
            </div>
        </>
    )
}

