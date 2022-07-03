import React, { useRef, useState } from "react";
import { useAuth } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("login");
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState("");

  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/account");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  async function handleSubmitForgotPassword(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  const passwordConfirmRef = useRef();
  const { signup } = useAuth();

  async function handleSubmitSignup(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  const loginpage = () => {
    setPage("login");
  };
  const forgotpasswordpage = () => {
    setPage("forgotpassword");
  };
  const signuppage = () => {
    setPage("signup");
  };

  if (page === "login") {
    return (
      <>
        {error && alert(error)}
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="text" name="email" ref={emailRef} required />
          </label>{" "}
          <br />
          <label>
            Password:
            <input type="text" name="password" ref={passwordRef} required />
          </label>{" "}
          <br />
          <input type="submit" value="Log In" disabled={loading} />
        </form>
        <button onClick={forgotpasswordpage}>Forgot Password</button>
        <br />
        <button onClick={signuppage}>Sign Up</button>
      </>
    );
  } else if (page === "forgotpassword") {
    return (
      <>
        {error && alert(error)}
        {message && alert(message)}
        <form onSubmit={handleSubmitForgotPassword}>
          <label>
            Email:
            <input type="text" name="email" ref={emailRef} required />
          </label>{" "}
          <br />
          <input type="submit" value="Reset Password" disabled={loading} />
        </form>
        <button onClick={loginpage}>Login</button>
        <br />
        <button onClick={signuppage}>Sign Up</button>
      </>
    );
  } else if (page === "signup") {
    return (
      <>
        {error && alert(error)}
        <form onSubmit={handleSubmitSignup}>
          <label>
            Email:
            <input type="text" name="email" ref={emailRef} required />
          </label>{" "}
          <br />
          <label>
            Password:
            <input type="text" name="password" ref={passwordRef} required />
          </label>{" "}
          <br />
          <label>
            Password Confirmation:
            <input
              type="text"
              name="password"
              ref={passwordConfirmRef}
              required
            />
          </label>{" "}
          <br />
          <input type="submit" value="Sign Up" disabled={loading} />
        </form>
        <button onClick={loginpage}>Login</button>
      </>
    );
  }
}
