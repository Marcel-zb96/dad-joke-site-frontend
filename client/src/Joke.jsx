import { useState } from "react"
import './OneJoke.css'
import User from "./components/User";
import { Link } from "react-router-dom";

export default function Joke({ joke }) {

    const [likesNum, setLikesNum] = useState(joke.likes);
    const [disLikeNum, setDisLikeNum] = useState(0);
    const [disableLike,setDisableLike] = useState(false)
    const [disLikeBtn,setDisLikeBtn] = useState(false)

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
        const response = await fetchByMethod(`/api/jokes/${id}`, 'PATCH', { likes,dislikes })
        if (response.ok) {
            console.log("Thank you for the like");
        }
    }

    const handleDelete = async () =>{
        setDisLikeNum((previous) => previous + 1)
        setDisLikeBtn(!disLikeBtn)
        const id = joke._id;
        const dislikes = disLikeNum + 1
        const likes = likesNum
        const response = await fetchByMethod(`/api/jokes/${id}`, 'PATCH', { dislikes,likes })
        if (response.ok) {
            console.log("Thank you for the dislike");
        }
    }

    return (
        <>
            <div className="oneJoke">
                <h2>{joke.setup}</h2>
                {localStorage.getItem("user")
                    ? <h3 style={{ color: 'red' }}>{joke.punchline}</h3>
                    : <>
                        <h3 className="blured-pline">Really funny punchline</h3>
                        <div className="login-request">
                            <Link to="/login">Log in to see content</Link>
                        </div>
                    </>}
                <button className="likeBtn" onClick={() =>
                    handleLike()} style={{ color: "green", display: "flex"}} disabled={disableLike} >
                    Like: {likesNum}</button>
                <button className="disLikeBtn" disabled={disLikeBtn} onClick={() =>
                    handleDelete()}
                    style={{ color: "red", display: "flex" }}>
                    Dislike: {disLikeNum}</button>
                <p className="jokeAuthor">{joke.author === "unknown" ? ` Author: Anonymus` : `Author: ${joke.author}`}</p>
            </div>
        </>
    )
}

