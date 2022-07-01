import React, { useState } from "react";
import { useAuth } from "../firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Viewprofile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  let navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      {error && alert(error)}
      <p>Email: {currentUser.email}</p>
      <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
        Update Profile
      </Link>
      <br />
      <button onClick={handleLogout}>Log Out</button>
    </>
  );
}
