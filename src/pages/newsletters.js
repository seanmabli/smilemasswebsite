import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Box, Button, Autocomplete } from "@mui/material";
import { ColoredTextField } from "../components/mui";
import usePlacesAutocomplete from "@atomap/use-places-autocomplete";
import { Footer } from "../components/footer";

export default function Newsletters() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState([false, false, false, false]);
  const [success, setSuccess] = useState(false);

  const addressPredictions = usePlacesAutocomplete(address).predictions;

  function SubmitNewsletterForm() {
    setError([false, false, false, false]);

    // validate name
    var twoWordNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var threeWordNameRegex = /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/;
    if (!twoWordNameRegex.test(name) && !threeWordNameRegex.test(name)) {
      setError((state) => [true, state[1], state[2], state[3]]);
    }

    // validate email
    var emailRegex =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setError((state) => [state[0], true, state[2], state[3]]);
    }

    // validate phone
    var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(phone)) {
      setError((state) => [state[0], state[1], true, state[3]]);
    }

    // validate address
    if (address === "") {
      setError((state) => [state[0], state[1], state[2], true]);
    }

    const upload = async () => {
      await addDoc(collection(db, "newsletter"), {
        name: name,
        email: email,
        phone: phone,
        address: address,
        status: "new",
        time: new Date(),
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

  return (
    <div className="page">
      <h1>Newsletters</h1>
      <br />
      <h2>Sign Up</h2>
      <br />
      <div style={success ? { display: "none" } : {}}>
        <Box component="form" noValidate autoComplete="off">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="name">
              <ColoredTextField
                label="Full Name"
                variant="outlined"
                size="small"
                value={name}
                error={error[0]}
                helperText={
                  error[0]
                    ? "Please enter your full name (first & last name)"
                    : ""
                }
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
                helperText={
                  error[1] ? "Please enter a valid email address" : ""
                }
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
                required
              />
            </div>
          </div>
          <div className="address">
            <Autocomplete
              disablePortal
              options={addressPredictions.map(({ description }) => description)}
              clearOnBlur={false}
              onChange={(event, value) => setAddress(value)}
              fullWidth
              renderInput={(params) => (
                <ColoredTextField
                  {...params}
                  label="Address"
                  variant="outlined"
                  size="small"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  error={error[3]}
                  helperText={error[3] ? "Please enter a address" : ""}
                  required
                />
              )}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="outlined"
              onClick={SubmitNewsletterForm}
              style={{ color: "#547c94", borderColor: "#547c94" }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
      <br />
      <h2>Recent Newsletters</h2>
      <br />
      <Footer />
    </div>
  );
}
