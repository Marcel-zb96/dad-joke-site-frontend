import { useEffect, useState } from "react"
import './Joke.css'
import { Link } from "react-router-dom";

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

const Joke = ({ joke }) => {

	const [likesNum, setLikesNum] = useState(joke.likes);
	const [liked, setLiked] = useState(joke.likedByUser);


	const handleLike = async () => {
		const id = joke._id;
		let likes = likesNum;
		if (liked) {
			setLikesNum((prev) => prev - 1);
			likes--;
		} else {
			setLikesNum((prev) => prev + 1);
			likes++;
		}
		
		setLiked(!liked)
		const response = await fetchByMethod(`/api/jokes/${id}`, 'PATCH', { likes })
		if (response.ok) {
			console.log("Thank you for the like");
		}
	}

	return (
		<>
			<div className="joke-container">
			<div className="jokeAuthor">{joke.author === "unknown" ? ` Author: Anonymus` : `Author: ${joke.author}`}</div>
				<h2>{joke.setup}</h2>
				{sessionStorage.getItem("madJokeUser")
					? <div className="punchline" >{joke.punchline}</div>
					: <>
						<div className="blured-punchline">{joke.punchline}</div>
						<div className="login-request">
							<Link to="/login">Log in to see punchline</Link>
						</div>
					</>
				}
				<div className="like-button-container">
					<button className={liked ? "like-button-on" : "like-button-off"} onClick={() => handleLike()}>Like: {likesNum}</button>
				</div>
			</div>
		</>
	)
}

export default Joke;