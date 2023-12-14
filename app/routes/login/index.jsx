import React from "react";
import { Input, Main } from "@components";
import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { logInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.js";


export const meta = () => {
    return [
      { title: "index" },
      { name: "description", content: "Redirecting to Campaigns" },
    ];
  };

  export async function loader({ request }) {

    //Check if user is signed in
    let userId = null;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        userId = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
    
    return json(userId);
  }

export default function Login() {
  const { userId } = useLoaderData();

  if (userId) {
    return <p>You are already logged in as user id {userId}</p>;
  }

  return (
    <Main>
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-3xl font-bold">Login</h1>
        <Form method="post" className="items-grow flex flex-col">
          <Input label="Email" name="email" placeholder="Email"></Input>
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
          ></Input>
          <div className="mt-4">
            <button type="submit" title="Login"></button>
          </div>
        </Form>
      </div>
    </Main>
    );
  }

  export async function action ({request}) {
    const form = await request.formData();
    const values = Object.fromEntries(form);
    const { email, password} =
      values;

    logInWithEmailAndPassword(auth, email, password);
}


  /*.then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });*/

  /*import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword} from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

    return (
      <div className="login">
      <div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
    );
  } */