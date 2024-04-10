import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './Pages/Home/Home.jsx'
import OwnJokes from './Pages/MyJoke/OwnJokes.jsx';
import JokeFeed from './Pages/JokeFeed/JokeFeed.jsx';
import Header from './Components/Header/Header.jsx';
import Login from './Pages/Login/Login.jsx';
import User from './Pages/Profile/User.jsx';
import RandomJoke from './Pages/RandomJoke/RandomJoke.jsx';
import JokeEditor from './Pages/JokeEditor/JokeEditor.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/ownJokes",
        element: <OwnJokes author={localStorage.getItem('user')} />
      },
      {
        path: "/editjoke/:jokeId",
        element: <JokeEditor />,
      },
      {
        path: "/home",
        element: <App />
      },
      {
        path: "/general",
        element: <JokeFeed jokeType={'general'} />,
      },
      {
        path: "/all",
        element: <JokeFeed jokeType={''} />,
      },
      {
        path: "/Dad Jokes",
        element: <JokeFeed jokeType={'Dad Jokes'} />,
      },
      {
        path: "/knock-knock",
        element: <JokeFeed jokeType={'knock-knock'} />,
      },
      {
        path: "/programming",
        element: <JokeFeed jokeType={'programming'} />,
      }, 
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/random",
        element: <RandomJoke />
      },
      {
        path: "/profile",
        element: <User userName={localStorage.getItem('user')}/>
      }
    ]
  }]
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);




