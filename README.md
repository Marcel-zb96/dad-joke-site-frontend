<p align="center">
    <h1 align="center">DAD-JOKE-SITE-FRONTEND</h1>
</p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<p align="center">
		<em>Developed by Marcell Biró</em>
</p>
<hr>

##  Quick Links

> - [ Overview](#-overview)
> - [ Features](#-features)
> - [ Repository Structure](#-repository-structure)
> - [ Modules](#-modules)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [ Running dad-joke-site-frontend](#-running-dad-joke-site-frontend)

---

##  Overview

This project was created for learning purposes. This project provides frontend for the mad joke site project.

---

##  Features

    - Home page / post categories.
    - Random post page.
    - Signing: user sign up and logging in, using `bcrypt` for encrytion and `jasonwebtoken` for authentication.
    - Posting: users can create new posts, edit and delete them.
    - Like system: users can like posts that is saved in the joke database.

---

##  Repository Structure

```sh
└── dad-joke-site-frontend/
    ├── src
    │   ├── Components
    │   │   ├── Header
    │   │   │   ├── Header.css
    │   │   │   └── Header.jsx
    │   │   ├── Joke
    │   │   │   ├── Joke.css
    │   │   │   └── Joke.jsx
    │   │   ├── Loader
    │   │   │   ├── Loader.css
    │   │   │   └── Loader.jsx
    │   │   ├── NewJokeForm
    │   │   │   ├── NewJokeForm.css
    │   │   │   └── NewJokeForm.jsx
    │   │   ├── UserData
    │   │   │   ├── PwChangeForm.jsx
    │   │   │   ├── UserData.css
    │   │   │   ├── UserData.jsx
    │   │   │   └── UserDataForm.jsx
    │   │   └── UserJoke
    │   │       ├── DeletePopup
    │   │       │   ├── DeletePopup.css
    │   │       │   └── DeletePopup.jsx
    │   │       ├── EditJoke
    │   │       │   ├── EditJoke.css
    │   │       │   └── EditJoke.jsx
    │   │       ├── JokeOutline
    │   │       │   ├── JokeOutline.css
    │   │       │   └── JokeOutline.jsx
    │   │       ├── UserJoke.css
    │   │       └── UserJoke.jsx
    │   ├── Pages
    │   │   ├── Home
    │   │   │   ├── Home.css
    │   │   │   └── Home.jsx
    │   │   ├── JokeFeed
    │   │   │   ├── JokeFeed.css
    │   │   │   └── JokeFeed.jsx
    │   │   ├── Login
    │   │   │   ├── Login.css
    │   │   │   └── Login.jsx
    │   │   ├── MyJokes
    │   │   │   ├── MyJokes.css
    │   │   │   └── MyJokes.jsx
    │   │   ├── Profile
    │   │   │   ├── Profile.css
    │   │   │   └── Profile.jsx
    │   │   ├── RandomJoke
    │   │   │   ├── RandomJoke.css
    │   │   │   └── RandomJoke.jsx
    │   │   └── Register
    │   │       ├── Register.css
    │   │       └── Register.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── README.md
    ├── package-lock.json
    ├── package.json
    └── vite.config.js
```

---

##  Modules

<details closed><summary>src</summary>

| File                                                                                         | Summary                                   |
| ---                                                                                          | ---                                       |
| [main.jsx](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/main.jsx)   | React router providing frontend routing `src/main.jsx`  |

</details>

<details closed><summary>Components</summary>

| File                                                                                                                            | Summary                                                                |
| ---                                                                                                                             | ---                                                                    |
| [Header](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Components/Header) | Header component`src/Components/Header` |
| [NewJokeForm](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Components/NewJokeForm/) | New joke form component `src/Components/NewJokeForm` |
| [UserData](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Components/UserData)         | Components connected to user data including user data, user data form and password change form `src/Components/UserData`     |
| [Joke](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Components/Joke) | Component for displaying a single joke `src/Components/Joke` |
| [Loader](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Components/Loader) | Loader component`src/Components/Loader` |
| [MyJokes](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Pages/MyJokes) | Component for displaying the joke posted by the signed in user `src/Pages/MyJokes` |
| [UserJoke](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Components/UserJoke) | Component controlling jokes on the `myJokes` page `src/Components/UserJoke` |
| [JokeOutline](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Components/UserJoke/JokeOutline) | Component for displaying a single joke in a compact way on the `myJokes` page `src/Components/UserJoke/JokeOutline` |
| [DeletePopup](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Components/UserJoke/DeletePopup) | Component for a popup message for confirming joke deletion on the `myJokes` page `src/Components/UserJoke/DeletePopup` |
| [EditJoke](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Components/UserJoke/EditJoke) | Component for joke editing form`src/Components/UserJoke/EditJoke` |
</details>

<details closed><summary>Pages</summary>

| File                                                                                                              | Summary                                                     |
| ---                                                                                                               | ---                                                         |
| [Home](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Pages/Home) | Home page for the web page displaying the post categories `src/Pages/Home` |
| [JokeFeed](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Pages/JokeFeed) | Page for displaying all posts or all posts in a specific category `src/Pages/JokeFeed` |
| [Profile](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Pages/Profile) | Page for displaying user profile information `src/Pages/Profile` |
| [Register](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Pages/Register) | Page for sign up form `src/Pages/Register` |
| [Login](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Pages/Login) | Page for sign in form `src/Pages/Login/` |
| [RandomJoke](https://github.com/Marcel-zb96/dad-joke-site-frontend/blob/master/src/Pages/RandomJoke) | Page for displaying a single randomly selected post from the database`src/Pages/RandomJoke` |
</details>

---

##  Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **NodeJs**: [Guide for installing NodeJS](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

###  Installation

1. Clone the dad-joke-site-frontend repository:

```sh
git clone git@github.com:Marcel-zb96/dad-joke-site-frontend.git
```

2. Change to the project directory:

```sh
cd dad-joke-site-frontend
```

3. Install the dependencies:

```sh
npm install
```

###  Running dad-joke-site-frontend

Use the following command to run dad-joke-site-frontend:

```sh
npm run dev
```
