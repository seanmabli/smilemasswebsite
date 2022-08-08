import { useState } from "react";
import { useAuth } from "../firebase/auth";
import { ColoredTextField } from "../components/mui";
import {
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Collapse,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("login");
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  async function Login() {
    try {
      setLoading(true);
      setError(false);
      await login(email, password);
      navigate("/admin/dashboard");
    } catch {
      setError(true);
    }
    setLoading(false);
  }

  async function ResetPassword() {
    try {
      setError(false);
      setMessage(false);
      setLoading(true);
      await resetPassword(email);
      setMessage(true);
    } catch {
      setError(true);
    }

    setLoading(false);
  }

  const loginpage = () => setPage("login");
  const forgotpasswordpage = () => setPage("forgotpassword");

  if (page === "login") {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              maxWidth: "500px",
            }}
          >
            <Collapse in={error}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setError(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                severity="error"
                variant="outlined"
              >
                Invalid email or password
              </Alert>
            </Collapse>
            <br />
            <ColoredTextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              size="small"
              required
              fullWidth
            />
            <br />
            <ColoredTextField
              label="Password"
              variant="outlined"
              size="small"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
              fullWidth
            />
            <br />
            <Button
              variant="outlined"
              onClick={Login}
              style={{ color: "#547c94", borderColor: "#547c94" }}
              disabled={loading}
              fullWidth
            >
              Login
            </Button>
            <br className="minorbreak" />
            <p
              className="link"
              style={{ fontSize: "14px", cursor: "pointer" }}
              onClick={forgotpasswordpage}
            >
              Forgot Password
            </p>
          </div>
        </div>
      </>
    );
  } else if (page === "forgotpassword") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "500px",
          }}
        >
          <Collapse in={error}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="error"
              variant="outlined"
            >
              Failed to reset password
            </Alert>
          </Collapse>
          <Collapse in={message}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="success"
              variant="outlined"
            >
              Check your inbox for further instructions
            </Alert>
          </Collapse>
          <br />
          <ColoredTextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            size="small"
            required
            fullWidth
          />
          <br />
          <Button
            variant="outlined"
            onClick={ResetPassword}
            style={{ color: "#547c94", borderColor: "#547c94" }}
            disabled={loading}
            fullWidth
          >
            Reset Password
          </Button>
          <br className="minorbreak" />
          <p
            className="link"
            style={{ fontSize: "14px", cursor: "pointer" }}
            onClick={loginpage}
          >
            Login
          </p>
        </div>
      </div>
    );
  }
}
