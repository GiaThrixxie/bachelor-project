import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import Header from "./components/Header";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";

import styles from "./tailwind.css";

/*export const meta = () => ({
  charset: "utf-8",
  title: "Tabletop",
  viewport: "width=device-width,initial-scale=1",
  robots: "none",
});*/

export const meta = () => {
  return [
  {charset: "utf-8"},
  {title: "Tabletop"},
  {viewport: "width=device-width,initial-scale=1"},
  {robots: "none"},
]};

export const links = () => [{ rel: "stylesheet", href: styles }];

export async function loader() {
  let userID;
  let avatar;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      userID = user.uid;
      avatar = user.photoURL;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return json({
    user: userID || null,
    avatar: avatar,
  });
}

export default function App() {
  const { user, avatar} = useLoaderData();
  const signedIn = Boolean(user);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-50 p-0 text-slate-800">
        <Header
          links={[
            { title: "Characters", url: "/characters/" },
            { title: "Campaigns", url: "/campaigns/" },
            !signedIn && { title: "Login", url: "/login/" },
            !signedIn && { title: "Sign up", url: "/sign-up/" },
          ].filter(Boolean)}
          avatar={avatar}
          signedIn={signedIn}
        />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}