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
import { getUserSession } from "../session.server";

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

export async function loader({ request }) {
  let userId;
  let avatar;

  const sessionUser = await getUserSession(request);
  if (!sessionUser) {
    //return redirect("/characters");
    
  } else {
    userId = sessionUser.uid;
    avatar = sessionUser.photoURL;
  }

  return json({
    user: userId || null,
    avatar: avatar || "/img/placeholder_avatar.png",
  });
}

export default function App() {
  const { user, avatar } = useLoaderData();
  const signedIn = Boolean(user);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-grey-darker p-0 text-white max-h-screen max-w-screen w-screen h-screen">
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