import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Box, Button } from "@mui/material";
import { ColoredTextField } from "../components/mui";
import "./contact.css";
import { Footer } from "../components/footer";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([false, false, false, false]);
  const [success, setSuccess] = useState(false);

  function SubmitContactForm() {
    setError([false, false, false, false]);

    // validtate name
    var twoWordNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var threeWordNameRegex = /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/;
    if (!twoWordNameRegex.test(name) && !threeWordNameRegex.test(name)) {
      setError((state) => [true, state[1], state[2], state[3]]);
    }

    // validtate email
    var emailRegex =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setError((state) => [state[0], true, state[2], state[3]]);
    }

    // validtate phone
    if (phone !== "") {
      var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (!phoneRegex.test(phone)) {
        setError((state) => [state[0], state[1], true, state[3]]);
      }
    }

    // validate message
    if (message === "") {
      setError((state) => [state[0], state[1], state[2], true]);
    }

    const upload = async () => {
      await addDoc(collection(db, "contact"), {
        name: name,
        email: email,
        phone: phone,
        message: message,
        time: new Date(),
        status: "new",
      });
    };

    setError((state) => {
      if (!state[0] && !state[1] && !state[2] && !state[3]) {
        upload();
        setSuccess(true);
      }
      return state;
    });
  }

  if (!success) {
    return (
      <div className="page">
        <h1>Contact</h1>
        <br />
        <p>Contact us Directly:</p>
        <p>info@smilemass.org</p>
        <p>66 Dudley Road Sudbury, MA 01776</p>
        <br />
        <Box component="form" noValidate autoComplete="off">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="name">
              <ColoredTextField
                label="Full Name"
                variant="outlined"
                size="small"
                value={name}
                error={error[0]}
                helperText={error[0] ? "Please enter your full name (first & last name)" : ""}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </div>
            <div className="email">
              <ColoredTextField
                label="Email"
                variant="outlined"
                size="small"
                value={email}
                error={error[1]}
                helperText={error[1] ? "Please enter a valid email address" : ""}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </div>
            <div className="phone">
              <ColoredTextField
                label="Phone"
                variant="outlined"
                size="small"
                value={phone}
                error={error[2]}
                helperText={error[2] ? "Please enter a valid phone number" : ""}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />
            </div>
          </div>
          <div className="message">
            <ColoredTextField
              label="Your Request/Questions/Comments"
              variant="outlined"
              size="small"
              minRows={5}
              value={message}
              error={error[3]}
              helperText={error[3] ? "Please enter a request/question/comment" : ""}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              fullWidth
              required
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="outlined"
              onClick={SubmitContactForm}
              style={{ color: "#547c94", borderColor: "#547c94" }}
            >
              Submit
            </Button>
          </div>
        </Box>
        
      </div>
    );
  } else {
    return (
      <div className="page">
        <h1>Contact</h1>
        <br />
        <p>Contact us Directly:</p>
        <p>info@smilemass.org</p>
        <p>66 Dudley Road Sudbury, MA 01776</p>
        <br />
        <p>Thank you for your interest in Smile Mass.</p>
        <p>We will be in touch with you shortly.</p>
        
      </div>
    );
  }
}
