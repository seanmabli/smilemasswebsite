import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  Box,
  Button,
  Autocomplete,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Checkbox,
} from "@mui/material";
import {
  ColoredTextField,
  EquipmentLoanerProgramCard,
} from "../components/mui";
import usePlacesAutocomplete from "@atomap/use-places-autocomplete";
import "./equiptmentloanerprogram.css";
import { Footer } from "../components/footer";

export default function EquipmentLoanerProgram() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [used, setUsed] = useState(false);
  const [questions, setQuestions] = useState([]);

  const [error, setError] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [success, setSuccess] = useState(false);

  const [equiptment, setEquiptment] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = equiptment.indexOf(value);
    const newEquiptment = [...equiptment];

    if (currentIndex === -1) {
      newEquiptment.push(value);
    } else {
      newEquiptment.splice(currentIndex, 1);
    }

    setEquiptment(newEquiptment);
  };

  const addressPredictions = usePlacesAutocomplete(address).predictions;
  const deliveryPredictions =
    usePlacesAutocomplete(deliveryAddress).predictions;

  function SubmitEquiptmentLoanerForm() {
    setError([false, false, false, false, false, false, false]);

    // validate name
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
    }

    // validate email
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
    }

    // validate phone
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
    }

    // validate address
    if (address === "") {
      setError((state) => [
        state[0],
        state[1],
        state[2],
        true,
        state[4],
        state[5],
        state[6],
      ]);
    }

    // validate pickup
    var dateRegex =
      /^(0[1-9]|1[012]|[1-9])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
    if (!dateRegex.test(pickup)) {
      setError((state) => [
        state[0],
        state[1],
        state[2],
        state[3],
        true,
        state[5],
        state[6],
      ]);
    }

    // validate dropoff
    if (!dateRegex.test(dropoff)) {
      setError((state) => [
        state[0],
        state[1],
        state[2],
        state[3],
        state[4],
        true,
        state[6],
      ]);
    }

    // validate birthday
    if (birthday !== "") {
      var birthdayRegex =
        /^(0[1-9]|1[012]|[1-9])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/;
      if (!birthdayRegex.test(birthday)) {
        setError((state) => [
          state[0],
          state[1],
          state[2],
          state[3],
          state[4],
          state[5],
          true,
        ]);
      }
    }

    const upload = async () => {
      await addDoc(collection(db, "equiptmentloaner"), {
        name: name,
        email: email,
        phone: phone,
        address: address,
        pickup: pickup,
        dropoff: dropoff,
        delivery: delivery,
        deliveryAddress: deliveryAddress,
        birthday: birthday,
        used: used,
        questions: questions,
        equiptment: equiptment,
        status: "new",
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

  return (
    <div className="page">
      <h1>Equipment Loaner Program</h1>
      <br />
      <p>
        We want everyone to be able to enjoy time experiencing the outdoors. If
        you/your family member is in need of a stroller, lift, beach wheelchair,
        etc, please fill out the form below to request equipment and we will get
        the process started.
      </p>
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
          <div className="largecontainer">
            <EquipmentLoanerProgramCard className="equiptment">
              <List
                sx={{
                  width: "100%",
                  padding: "0px",
                }}
                subheader={
                  <ListSubheader
                    sx={{ lineHeight: "20px", paddingTop: "10px", paddingBottom: "10px" }}
                  >
                    What type of equipment are you interested in?
                  </ListSubheader>
                }
              >
                {[
                  "Beach Wheelchair",
                  "Blue Freedom running stroller (max 200lbs)",
                  "High Performance Hoyt running stroller (max 200lbs)",
                  "Hoyer Lift",
                  "Portable 1 step mini ramp",
                  "Portable 3 step ramp",
                  "Rifton bath chair",
                ].map((value) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem
                      key={value}
                      disablePadding
                      style={{ borderRadius: "5px" }}
                    >
                      <ListItemButton
                        role={undefined}
                        onClick={handleToggle(value)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={equiptment.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                            style={
                              equiptment.indexOf(value) !== -1
                                ? { color: "#547c94" }
                                : {}
                            }
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </EquipmentLoanerProgramCard>
            <div className="pickup">
              <ColoredTextField
                label="Requested Pickup Date"
                variant="outlined"
                size="small"
                value={pickup}
                error={error[4]}
                helperText={
                  error[4] ? "Please enter a valid date (mm/dd/yyyy)" : ""
                }
                onChange={(e) => setPickup(e.target.value)}
                fullWidth
                required
              />
            </div>
            <div className="dropoff">
              <ColoredTextField
                label="Return Date"
                variant="outlined"
                size="small"
                value={dropoff}
                error={error[5]}
                helperText={
                  error[5] ? "Please enter a valid date (mm/dd/yyyy)" : ""
                }
                onChange={(e) => setDropoff(e.target.value)}
                fullWidth
                required
              />
            </div>
            <div className="delivery">
              <FormControlLabel
                control={
                  <Switch
                    style={{ color: "#547c94" }}
                    value={delivery}
                    onChange={(e) => setDelivery(e.target.checked)}
                  />
                }
                label="Do you need delivery? (additional fee may apply)"
                labelPlacement="start"
                style={{ margin: "0", color: "rgba(0, 0, 0, 0.6)" }}
              />
            </div>
            <div className="deliveryaddress">
              <Autocomplete
                disablePortal
                options={deliveryPredictions.map(
                  ({ description }) => description
                )}
                clearOnBlur={false}
                onChange={(event, value) => setAddress(value)}
                fullWidth
                renderInput={(params) => (
                  <ColoredTextField
                    {...params}
                    label="Delivery Address (if different from home address)"
                    variant="outlined"
                    size="small"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                )}
              />
            </div>
            <ColoredTextField
              label="Birthday"
              variant="outlined"
              size="small"
              value={birthday}
              error={error[6]}
              helperText={
                error[6] ? "Please enter a valid birthday (mm/dd/yyyy)" : ""
              }
              onChange={(e) => setBirthday(e.target.value)}
              fullWidth
            />
            <div className="questions">
              <ColoredTextField
                label="Questions / Comments"
                variant="outlined"
                size="small"
                rows={4}
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                multiline
                fullWidth
              />
            </div>
            <div className="used">
              <FormControlLabel
                control={
                  <Switch
                    style={{ color: "#547c94" }}
                    value={used}
                    onChange={(e) => setUsed(e.target.checked)}
                  />
                }
                label="Have you used this program before?"
                labelPlacement="start"
                style={{ margin: "0", color: "rgba(0, 0, 0, 0.6)" }}
              />
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="outlined"
              onClick={SubmitEquiptmentLoanerForm}
              style={{ color: "#547c94", borderColor: "#547c94" }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
      <div style={success ? { display: "block" } : { display: "none" }}>
        <p>You equiptment loaner request has been submited.</p>
        <p>We will be in touch with you shortly.</p>
      </div>
      
    </div>
  );
}
