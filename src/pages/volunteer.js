import { Link } from "react-router-dom";
import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Box, Button, Autocomplete } from "@mui/material";
import { ColoredTextFeild } from "../components/mui";
import usePlacesAutocomplete from "@atomap/use-places-autocomplete";
import "./volunteer.css";

export default function Volunteer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [events, setEvents] = useState("");
  const [availability, setAvailability] = useState("");
  const [error, setError] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [errorText, setErrorText] = useState(["", "", "", "", "", "", ""]);
  const [success, setSuccess] = useState(false);

  const { predictions } = usePlacesAutocomplete(address);

  function SubmitContactForm() {
    setError([false, false, false, false, false, false, false]);
    setErrorText(["", "", "", "", "", "", ""]);

    // validtate name
    var twoWordNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var threeWordNameRegex = /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/;
    if (!twoWordNameRegex.test(name) && !threeWordNameRegex.test(name)) {
      setError((state) => [
        true,
        state[1],
        state[2],
        state[3],
        state[4],
        state[5],
        state[6],
      ]);
      setErrorText((state) => [
        "Please enter your full name (first & last name)",
        state[1],
        state[2],
        state[3],
        state[4],
        state[5],
        state[6],
      ]);
    }

    // validtate email
    var emailRegex =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setError((state) => [
        state[0],
        true,
        state[2],
        state[3],
        state[4],
        state[5],
        state[6],
      ]);
      setErrorText((state) => [
        state[0],
        "Please enter a valid email address",
        state[2],
        state[3],
        state[4],
        state[5],
        state[6],
      ]);
    }

    // validtate phone
    var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(phone)) {
      setError((state) => [
        state[0],
        state[1],
        true,
        state[3],
        state[4],
        state[5],
        state[6],
      ]);
      setErrorText((state) => [
        state[0],
        state[1],
        "Please enter a valid phone number",
        state[3],
        state[4],
        state[5],
        state[6],
      ]);
    }

    // validtate birthday
    if (birthday !== "") {
      var birthdayRegex =
        /^(0[1-9]|1[012]|[1-9])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
      if (!birthdayRegex.test(birthday)) {
        setError((state) => [
          state[0],
          state[1],
          state[2],
          true,
          state[4],
          state[5],
          state[6],
        ]);
        setErrorText((state) => [
          state[0],
          state[1],
          state[2],
          "Please enter a valid birthday (mm/dd/yyyy)",
          state[4],
          state[5],
          state[6],
        ]);
      }
    }

    const upload = async () => {
      await addDoc(collection(db, "volunteer"), {
        name: name,
        email: email,
        phone: phone,
        birthday: birthday,
        address: address,
        events: events,
        availability: availability,
        time: new Date(),
      });
    };

    setError((state) => {
      if (
        !state[0] &&
        !state[1] &&
        !state[2] &&
        !state[3] &&
        !state[4] &&
        !state[5] &&
        !state[6]
      ) {
        upload();
        setSuccess(true);
      }
      return state;
    });
  }

  if (!success) {
    return (
      <div className="page">
        <h1>Volunteer</h1>
        <p>
          We are always looking for great volunteers. Here you can find some
          projects and upcoming events where we are looking for volunteer help:
        </p>
        <br />
        <p>
          <span style={{ fontWeight: "bold" }}>
            Deliver Beach Wheelchairs & Other Adapted Equipment to Vacationing
            Families:{" "}
          </span>
          Either by running for us in various events or choose any race you
          desire while supporting SMILE Mass.
        </p>
        <br />
        <p>
          <span style={{ fontWeight: "bold" }}>Join our running team: </span>
          Help a family enjoy a memorable New England vacation or day out
          together by delivering a beach wheelchair or other adaptive equipment.{" "}
          <Link to="/runningteam" className="link">
            Click here
          </Link>{" "}
          to see details about our running team
        </p>
        <br />
        <p style={{ fontWeight: "bold" }}>Host an event for SMILE Mass: </p>
        <p>
          Over the years, various groups of people have hosted events that
          benefit SMILE Mass. We have seen so much fun and exciting events
          hosted by our sponsors, donors and of course our clients that have
          been able to benefit from the many programs that are being offered by
          SMILE Mass.
        </p>
        <br className="minorbreak" />
        <p>
          Is your child at the bar/bat mitzvah age? Perhaps dedicating your
          bar/bat mitzvah to SMILE Mass is a good idea. Other options include
          hosting a lemonade stand or bake sale, donating/dedicating your
          birthday to SMILE Mass, having an ugly Christmas sweater party for
          SMILE Mass, or hosting a sports event.
        </p>
        <br className="minorbreak" />
        <p>
          The sky is the limit. If you can dream, it you can do it. We, at SMILE
          Mass, will support you in any way possible. Just reach out to us to
          let us know how we can help. Ultimately your success is our success!
        </p>
        <br />
        <p style={{ fontWeight: "bold" }}>
          Be a Part of the SMILE Mass Family and Volunteer!
        </p>
        <br />
        <Box component="form" noValidate autoComplete="off">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="name">
              <ColoredTextFeild
                label="Full Name"
                variant="outlined"
                size="small"
                value={name}
                error={error[0]}
                helperText={errorText[0]}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />
            </div>
            <div className="email">
              <ColoredTextFeild
                label="Email"
                variant="outlined"
                size="small"
                value={email}
                error={error[1]}
                helperText={errorText[1]}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </div>
            <div className="phone">
              <ColoredTextFeild
                label="Phone"
                variant="outlined"
                size="small"
                value={phone}
                error={error[2]}
                helperText={errorText[2]}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth
                required
              />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="birthday">
              <ColoredTextFeild
                label="Birthday"
                variant="outlined"
                size="small"
                value={birthday}
                error={error[3]}
                helperText={errorText[3]}
                onChange={(e) => setBirthday(e.target.value)}
                fullWidth
              />
            </div>
            <div className="address">
              <Autocomplete
                disablePortal
                options={predictions.map(({ description }) => description)}
                fullWidth
                renderInput={(params) => (
                  <ColoredTextFeild
                    {...params}
                    label="Address"
                    variant="outlined"
                    size="small"
                    value={address}
                    error={error[4]}
                    helperText={errorText[4]}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="events">
            <ColoredTextFeild
              label="Which Event Are You Interested In Volunteering for?"
              variant="outlined"
              size="small"
              minRows={5}
              value={events}
              error={error[5]}
              helperText={errorText[5]}
              onChange={(e) => setEvents(e.target.value)}
              multiline
              fullWidth
            />
          </div>
          <div className="availability">
            <ColoredTextFeild
              label="When are you availability to volunteer (please be specific as to the day/time you are able to help)?"
              variant="outlined"
              size="small"
              minRows={5}
              value={availability}
              error={error[6]}
              helperText={errorText[6]}
              onChange={(e) => setAvailability(e.target.value)}
              multiline
              fullWidth
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
        <h1>Volunteer</h1>
        <p>
          We are always looking for great volunteers. Here you can find some
          projects and upcoming events where we are looking for volunteer help:
        </p>
        <br />
        <p>
          <span style={{ fontWeight: "bold" }}>
            Deliver Beach Wheelchairs & Other Adapted Equipment to Vacationing
            Families:{" "}
          </span>
          Either by running for us in various events or choose any race you
          desire while supporting SMILE Mass.
        </p>
        <br />
        <p>
          <span style={{ fontWeight: "bold" }}>Join our running team: </span>
          Help a family enjoy a memorable New England vacation or day out
          together by delivering a beach wheelchair or other adaptive equipment.{" "}
          <Link to="/runningteam" className="link">
            Click here
          </Link>{" "}
          to see details about our running team
        </p>
        <br />
        <p style={{ fontWeight: "bold" }}>Host an event for SMILE Mass: </p>
        <p>
          Over the years, various groups of people have hosted events that
          benefit SMILE Mass. We have seen so much fun and exciting events
          hosted by our sponsors, donors and of course our clients that have
          been able to benefit from the many programs that are being offered by
          SMILE Mass.
        </p>
        <br className="minorbreak" />
        <p>
          Is your child at the bar/bat mitzvah age? Perhaps dedicating your
          bar/bat mitzvah to SMILE Mass is a good idea. Other options include
          hosting a lemonade stand or bake sale, donating/dedicating your
          birthday to SMILE Mass, having an ugly Christmas sweater party for
          SMILE Mass, or hosting a sports event.
        </p>
        <br className="minorbreak" />
        <p>
          The sky is the limit. If you can dream, it you can do it. We, at SMILE
          Mass, will support you in any way possible. Just reach out to us to
          let us know how we can help. Ultimately your success is our success!
        </p>
        <br />
        <p style={{ fontWeight: "bold" }}>
          Be a Part of the SMILE Mass Family and Volunteer!
        </p>
        <br />
        <p>Thank you for your interest in volunteering with SMILE Mass.</p>
        <p>We will be in touch with you shortly.</p>
      </div>
    );
  }
}
