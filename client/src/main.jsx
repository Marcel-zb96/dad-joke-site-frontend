import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import User from "./components/User.jsx";
import App from './App.jsx';
import OwnJokes from './components/OwnJokes.jsx';


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
    element: <OwnJokes testJoke={{
      "setup": "Dad, can you put my shoes on?",
      "punchline": "I don't think they'll fit me.",
      "type": "general",
      "author": "unknown",
      "likes": 0
    }} />,
  }
]
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);




