import { useRef, useState, useEffect } from "react";
import { useAuth } from "../firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ColoredTextField } from "../components/mui";
import { Button } from "@mui/material";
import "./dashboard.css";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout, updatePassword_, updateEmail_ } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [readmystory, setReadmystory] = useState(null);
  const [visable, setVisable] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const getinfo = async () => {
      const data = await getDoc(doc(db, "ourteam", currentUser.uid));
      setName(data.data().name);
      setEmail(data.data().email);
      setPhone(data.data().phone);
      setRole(data.data().role);
      setBio(data.data().bio);
      setReadmystory(data.data().readmystory);
      setVisable(data.data().visable);
    };
    getinfo();
  }, []);

  async function handleLogout() {
    setError("");

    try {
      await logout();
    } catch {
      setError("Failed to log out");
    }
  }

  /*
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
*/

  function updateProfile() {}

  function updateAccount() {
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setError("");

    if (password !== "") {
      promises.push(updatePassword_(password));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        console.log("failed to update account");
      });
  }

  return (
    <div className="page" style={{ display: "flex" }}>
      <div style={{ marginRight: "20px" }}>
        <div className="dashboardprofile">
          <p className="dashboardprofileinput">Public Profile</p>
          <div className="dashboardprofileinput">
            <ColoredTextField
              label="Name"
              variant="outlined"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div className="dashboardprofileinput">
            <ColoredTextField
              label="Role"
              variant="outlined"
              size="small"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div className="dashboardprofileinput">
            <ColoredTextField
              label="Bio"
              variant="outlined"
              size="small"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              fullWidth
              required
              className="dashboardprofileinput"
              multiline
              minRows={3}
            />
          </div>
          <div className="dashboardprofileinput">
            <ColoredTextField
              label="Email"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              className="dashboardprofileinput"
            />
          </div>
          <div className="dashboardprofileinput">
            <ColoredTextField
              label="Phone"
              variant="outlined"
              size="small"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              required
              className="dashboardprofileinput"
            />
          </div>
          <div className="dashboardprofileinput">
            <Button
              variant="outlined"
              onClick={updateProfile}
              style={{ color: "#547c94", borderColor: "#547c94" }}
            >
              Update Profile
            </Button>
          </div>
          <p className="dashboardprofileinput">Account</p>
          <div className="dashboardprofileinput">
            <ColoredTextField
              label="Password"
              variant="outlined"
              size="small"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
          </div>
          <div className="dashboardprofileinput">
            <ColoredTextField
              label="Confirm Password"
              variant="outlined"
              size="small"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              fullWidth
            />
          </div>
          <div className="dashboardprofileinput">
            <Button
              variant="outlined"
              onClick={updateAccount}
              style={{ color: "#547c94", borderColor: "#547c94" }}
            >
              Update Account
            </Button>
          </div>
        </div>
        <p onClick={handleLogout} className="link">
          Log Out
        </p>
      </div>
      <div>
        <p>Forms:</p>
        <br />
        <Link to="/admin/beachwheelchairlocations">
          Admin - Beach Wheelchair Locations
        </Link>
        <br />
        <Link to="/admin/contact">Admin - Contact</Link>
        <br />
        <Link to="/admin/clubsmilemass">Admin - Club SMILE Mass</Link>
        <br />
        <Link to="/admin/equiptmentloanerprogram">
          Admin - Equipment Loaner Program
        </Link>
        <br />
        <Link to="/admin/volunteer">Admin - Volunteer</Link>
        <br />
        <p>Other:</p>
        <br />
        <Link to="/admin/events">Admin - Events</Link>
        <br />
        <Link to="/admin/faq">Admin - FAQ</Link>
        <br />
        <Link to="/admin/smileblog">Admin - SMILE Blog</Link>
        <br />
        <Link to="/admin/newsletters">Admin - Newsletters</Link>
        <br />
        <Link to="/admin/inthenews">Admin - In the News</Link>
        <br />
        <Link to="/admin/sponsors">Admin - Sponsors</Link>
        <br />
        <Link to="/admin/testimonials">Admin - Testimonials</Link>
      </div>
    </div>
  );
}
