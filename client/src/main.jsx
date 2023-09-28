import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import App from './App.jsx'
import JokesByType from './JokesByType';
import User from './components/User';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/general",
    element: <JokesByType jokeType={'general'}/>,
  },
  {
    path: "/all",
    element: <JokesByType jokeType={''}/>,
  },
  {
    path: "/dadjokes",
    element: <JokesByType jokeType={'Dad Jokes'}/>,
  },
  {
    path: "/knockknock",
    element: <JokesByType jokeType={'knock-knock'}/>,
  },
  {
    path: "/programming",
    element: <JokesByType jokeType={'programming'}/>,
  },
  {
    path: "/user",
    element: <User />,
  }
]
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);




