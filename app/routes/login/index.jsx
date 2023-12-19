import React from "react";
import Input from "../../components/Input.jsx";
import Main from "../../components/Main.jsx";
import Button from "../../components/Button.jsx";
import { Form } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { signIn } from "../../../firebase.js";
import { createUserSession, getUserSession } from "../../../session.server.js";


export const meta = () => {
    return [
      { title: "index" },
      { name: "description", content: "Redirecting to Campaigns" },
    ];
  };
  export async function loader({request}) {
    const sessionUser = await getUserSession(request);
    if (sessionUser) {
      return redirect("/characters");
    }
    else return null;
  };
  

export default function Login() {

  return (
    <Main>
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-3xl font-bold">Login</h1>
        <p>Note: Logging in currently does nothing due to session and Firebase not working together as intended at the moment</p>
        <Form method="post" className="items-grow grid grid-cols-1 gap-2">
          <Input label="Email" name="email" placeholder="Email"></Input>
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
          ></Input>
          <div className="mt-4">
            <Button type="submit" title="Login"></Button>
          </div>
        </Form>
      </div>
    </Main>
    );
  }

  export async function action ({request}) {
    const form = await request.formData();
    const values = Object.fromEntries(form);
    const { email, password } =
      values;
    
    const {user} = await signIn(email, password);
    const token = await user.getIdToken();
    console.log(email, password);
    return createUserSession(token, "/characters");
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