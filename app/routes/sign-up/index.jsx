import React from "react";
import { auth, registerWithEmailAndPassword } from "../../../firebase";
import { Form, useActionData } from "@remix-run/react";
import { Input, Main } from "@components";
import { json, redirect } from "@remix-run/node";

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
        <Form method="post">
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
          <button type="submit">Sign up</button>
        </Form>
      </Main>
    );
  }


  export async function action ({request}) {
    const form = await request.formData();
    const values = Object.fromEntries(form);
    const { username, email, password, repeatPassword } =
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
      registerWithEmailAndPassword(auth, username, email, password);

      return redirect("/characters", {
      });
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