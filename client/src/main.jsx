import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import User from "./components/User.jsx";
import App from './App.jsx';
import OwnJokes from './components/OwnJokes.jsx';
import JokesByType from './JokesByType';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/ownJokes",
    element: <OwnJokes author={'unknown'} />,
  },
  {
    path: "/general",
    element: <JokesByType jokeType={'general'} />,
  },
  {
    path: "/all",
    element: <JokesByType jokeType={''} />,
  },
  {
    path: "/dadjokes",
    element: <JokesByType jokeType={'Dad Jokes'} />,
  },
  {
    path: "/knockknock",
    element: <JokesByType jokeType={'knock-knock'} />,
  },
  {
    path: "/programming",
    element: <JokesByType jokeType={'programming'} />,
  }
]
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);




