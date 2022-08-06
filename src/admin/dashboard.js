import React, { useRef, useState } from "react";
import { useAuth } from "../firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(true);
  const { currentUser, logout, updatePassword_, updateEmail_ } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
    } catch {
      setError("Failed to log out");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail_(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword_(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const toggleUpdating = () => {
    setUpdating(!updating);
  };

  if (updating) {
    return (
      <div className="page">
        {error && alert(error)}
        <p>Email: {currentUser.email}</p>
        <p onClick={toggleUpdating} className="link">
          Update Profile
        </p>
        <br />
        <p onClick={handleLogout} className="link">
          Log Out
        </p>
        <br />
        <Link to="/admin/smileblog">Admin - SMILE Blog</Link>
        <br />
        <Link to="/admin/newsletters">Admin - Newsletters</Link>
        <br />
        <Link to="/admin/inthenews">Admin - In the News</Link>
        <br />
        <Link to="/admin/contact">Admin - Contact</Link>
        <br />
        <Link to="/admin/volunteer">Admin - Volunteer</Link>
        <br />
        <Link to="/admin/equiptmentloanerprogram">
          Admin - Equipment Loaner Program
        </Link>
        <br />
        <Link to="/admin/beachwheelchairlocations">
          Admin - Beach Wheelchair Locations
        </Link>
      </div>
    );
  } else {
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
            <input type="text" name="email" ref={passwordRef} required />
          </label>{" "}
          <br />
          <label>
            Password Confirmation:
            <input type="text" name="email" ref={passwordConfirmRef} required />
          </label>{" "}
          <br />
          <input type="submit" value="Update" disabled={loading} />
        </form>
        <button onClick={toggleUpdating}>Cancel</button>
      </>
    );
  }
}
