import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Box, Button, TextField } from "@mui/material";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([false, false, false, false]);
  const [nameErrorText, setnameErrorText] = useState("");
  const [emailErrorText, setemailErrorText] = useState("");
  const [phoneErrorText, setphoneErrorText] = useState("");
  const [messageErrorText, setmessageErrorText] = useState("");
  const [success, setSuccess] = useState(false);

  function SubmitContactForm() {
    setError([false, false, false, false]);
    setnameErrorText("");
    setemailErrorText("");
    setphoneErrorText("");
    setmessageErrorText("");

    // validtate name
    var twoWordNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var threeWordNameRegex = /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/;
    if (!twoWordNameRegex.test(name) && !threeWordNameRegex.test(name)) {
      setError((state) => [true, state[1], state[2], state[3]]);
      setnameErrorText("Please enter your full name (first & last name)");
    }

    // validtate email
    var emailRegex =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setError((state) => [state[0], true, state[2], state[3]]);
      setemailErrorText("Please enter a valid email address");
    }

    // validtate phone
    if (phone !== "") {
      var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (!phoneRegex.test(phone)) {
        setError((state) => [state[0], state[1], true, state[3]]);
        setphoneErrorText("Please enter a valid phone number");
      }
    }

    // validate message
    if (message === "") {
      setError((state) => [state[0], state[1], state[2], true]);
      setmessageErrorText("Please enter a request/question/comment");
    }

    const upload = async () => {
      await addDoc(collection(db, "contact"), {
        name: name,
        email: email,
        phone: phone,
        message: message,
        time: new Date()
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
            <div style={{ width: "250px", margin: "10px", marginLeft: "0px" }}>
              <TextField
                label="Full Name"
                variant="outlined"
                size="small"
                value={name}
                error={error[0]}
                helperText={nameErrorText}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </div>
            <div style={{ width: "250px", margin: "10px" }}>
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                value={email}
                error={error[1]}
                helperText={emailErrorText}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </div>
            <div style={{ width: "250px", margin: "10px" }}>
              <TextField
                label="Phone"
                variant="outlined"
                size="small"
                value={phone}
                error={error[2]}
                helperText={phoneErrorText}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
              />
            </div>
          </div>
          <div style={{ width: "790px", margin: "10px", marginLeft: "0px" }}>
            <TextField
              label="Your Request/Questions/Comments"
              variant="outlined"
              size="small"
              minRows={5}
              value={message}
              error={error[3]}
              helperText={messageErrorText}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              fullWidth
              required
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button variant="outlined" onClick={SubmitContactForm}>
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
