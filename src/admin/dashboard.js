import { useRef, useState, useEffect } from "react";
import { useAuth } from "../firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { db, auth } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ColoredTextField } from "../components/mui";
import {
  Button,
  IconButton,
  Alert,
  Collapse,
  FormControlLabel,
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./dashboard.css";

export default function Dashboard() {
  const { currentUser, logout, updatePassword_, updateEmail_ } = useAuth();
  const [imageUpload, setImageUpload] = useState({ name: "No file chosen" });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [readmystory, setReadmystory] = useState(null);
  const [visable, setVisable] = useState(null);

  const [originalEmail, setOriginalEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountError, setAccountError] = useState([false, ""]);
  const [reLogin, setReLogin] = useState(false);
  const [success, setSuccess] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const getinfo = async () => {
      const data = await getDoc(doc(db, "ourteam", currentUser.uid));
      setName(data.data().name);
      setOriginalEmail(auth.currentUser.email);
      setEmail(auth.currentUser.email);
      setPhone(data.data().phone);
      setRole(data.data().role);
      setBio(data.data().bio);
      setReadmystory(data.data().readmystory);
      setVisable(data.data().visable);
    };
    getinfo();
  }, []);

  async function handleLogout() {
    await logout();
  }

  function updateProfile() {}

  function updateAccount() {
    setAccountError([false, ""]);

    var emailRegex =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setAccountError((state) => [true, state[1]]);
    }
    if (0 < password.length && password.length < 7) {
      setAccountError((state) => [state[0], "Password must be 6 characters"]);
    }
    if (password !== confirmPassword) {
      setAccountError((state) => [state[0], "Passwords do not match"]);
    }

    setAccountError((state) => {
      if (!state[0] && state[1] === "") {
        const promises = [];
        if (email !== originalEmail) {
          promises.push(updateEmail_(email));
        }
        if (password !== "") {
          promises.push(updatePassword_(password));
        }

        Promise.all(promises).catch((error) => {
          if (error.code === "auth/requires-recent-login") {
            setReLogin(true);
          } else {
            console.log(error);
          }
          return state;
        });

        setPassword("");
        setConfirmPassword("");
        setSuccess(true);
      }
      return state;
    });
  }

  console.log(readmystory, visable);

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
          <div style={{ marginBottom: "20px" }}>
            <FormControlLabel
              control={
                <Switch
                  style={{ color: "#547c94" }}
                  value={readmystory}
                  onChange={(e) => setReadmystory(e.target.checked)}
                />
              }
              label="Do you have a Read My Story page?"
              labelPlacement="start"
              style={{ margin: "0", color: "rgba(0, 0, 0, 0.6)" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <FormControlLabel
              control={
                <Switch
                  style={{ color: "#547c94" }}
                  value={visable}
                  onChange={(e) => setVisable(e.target.checked)}
                />
              }
              label="Publicly visable?"
              labelPlacement="start"
              style={{ margin: "0", color: "rgba(0, 0, 0, 0.6)" }}
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
          <Collapse in={reLogin}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setReLogin(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="error"
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            >
              Unsucessful: please logout and login again
            </Alert>
          </Collapse>
          <Collapse in={success}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setSuccess(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="success"
              variant="outlined"
              sx={{ marginBottom: "20px" }}
            >
              Sucessfully updated
            </Alert>
          </Collapse>
          <div className="dashboardprofileinput">
            <ColoredTextField
              label="Email"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={accountError[0]}
              helperText={
                accountError[0]
                  ? "Please enter a valid email"
                  : "Note this is displayed publicly"
              }
              fullWidth
              required
              autocomplete="new-password"
            />
          </div>
          <div className="dashboardprofileinput">
            <ColoredTextField
              label="Password"
              variant="outlined"
              size="small"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={accountError[1] !== ""}
              helperText={accountError[1]}
              required
              fullWidth
              autocomplete="new-password"
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
              autocomplete="new-password"
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
        <Link to="/admin/newsletter">Admin - Newsletter</Link>
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
