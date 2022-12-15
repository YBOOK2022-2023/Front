import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./views/Home";
import Friends from "./views/Friends";
import NewPost from "./views/NewPost";
import Chat from "./views/Chat";
import Settings from "./views/Settings";
import { AccountBox } from "./views/login";
import Signup from "./views/Signup";
import CognitoLogin from "./views/CognitoLogin";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
      children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "friends",
        element: <Friends />,
      },
      {
        path: "new-post",
        element: <NewPost />,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },{
    path: "/login",
    element: <AccountBox />,
  },{
    path: "/cognitoRegister",
    element: <Signup />,
  },{
    path:"/cognitoLogin",
    element: <CognitoLogin/>,
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
