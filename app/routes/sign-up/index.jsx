import React from "react";
import { signUp } from "../../../firebase";
import { Form, useActionData } from "@remix-run/react";
import Input from "../../components/Input";
import Main from "../../components/Main";
import { json } from "@remix-run/node";
import Button from "../../components/Button";
import { createUserSession } from "../../../session.server";

export const meta = () => {
    return [
      { title: "Sign-up" },
      { name: "description", content: "Let's get you signed up to use the platform!" },
    ];
  };

export default function SignUp() {
  const actionData = useActionData();

    return (
      <Main>
        <div className="mx-auto max-w-lg">
        <h1 className="text-center text-3xl font-bold">Sign Up</h1>
        <p>Note: Signing up currently does not log you in due to session and Firebase not working together as intended at the moment</p>
        <Form method="post" className="items-grow grid grid-cols-1 gap-2">
            <Input
              label="Username"
              name="username"
              placeholder="Username"
              defaultValue={actionData?.values?.username}
              errorMessage={actionData?.errors?.username?.message}
            />
            <Input
              label="Email"
              name="email"
              placeholder="Email"
              defaultValue={actionData?.values?.email}
              errorMessage={actionData?.errors?.email?.message}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              defaultValue={actionData?.values?.password}
              errorMessage={actionData?.errors?.password?.message}
            />
            <Input
              label="Repeat password"
              name="repeatPassword"
              type="password"
              placeholder="Repeat password"
              defaultValue={actionData?.values?.repeatPassword}
              errorMessage={actionData?.errors?.repeatPassword?.message}
            />
          <Button type="submit" title="Sign up" />
        </Form>
        </div>
      </Main>
    );
  }


  export async function action ({request}) {
    const form = await request.formData();
    const values = Object.fromEntries(form);
    const { email, password, repeatPassword } =
      values;

    if (repeatPassword !== password) {
      const errors = { repeatPassword: { message: "Passwords must match" } };
      return json({ errors, values }, { status: 400 });
    }
    if (password.length < 6) {
      const errors = {
        password: { message: "Passwords must be at least 6 characters long." },
      };
      return json({ errors, values }, { status: 400 });
    }
    
    try {
      const { user } = await signUp(email, password);
      const token = await user.getIdToken();

      return createUserSession(token, "/characters")

    } catch (error) {
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.email === 1
      ) {
        return json(
          {
            errors: {
              email: {
                message: "Email already exists. Have you tried logging in?",
              },
            },
            values,
          },
          { status: 400 }
        );
      }
      return json({ errors: error.errors, values }, { status: 400 });
    }
    }
  /*
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
} from "./firebase";

  export default function SignUp() {
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading]);

    return (
      <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
    );
  } */