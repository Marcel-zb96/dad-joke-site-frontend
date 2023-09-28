import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import App from './App.jsx'
import JokesByType from './JokesByType';
import Header from './components/Header';
import User from './components/User';

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
        path: "/user",
        element: <User />
      },
      {
        path: "/home",
        element: <App />
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
        path: "/Dad Jokes",
        element: <JokesByType jokeType={'Dad Jokes'} />,
      },
      {
        path: "/knock-knock",
        element: <JokesByType jokeType={'knock-knock'} />,
      },
      {
        path: "/programming",
        element: <JokesByType jokeType={'programming'} />,
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




