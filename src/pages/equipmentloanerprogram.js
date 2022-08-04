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
  Checkbox,
} from "@mui/material";
import {
  ColoredTextFeild,
  EquipmentLoanerProgramCard,
} from "../components/mui";
import usePlacesAutocomplete from "@atomap/use-places-autocomplete";
import "./equiptmentloanerprogram.css";

export default function EquipmentLoanerProgram() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [dateofbirth, setDateofbirth] = useState("");
  const [used, setUsed] = useState(false);
  const [questions, setQuestions] = useState([]);

  const [error, setError] = useState([false, false, false]);
  const [success, setSuccess] = useState(false);

  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const addressPredictions = usePlacesAutocomplete(address).predictions;

  console.log(checked);

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
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="name">
          <ColoredTextFeild
            label="Full Name"
            variant="outlined"
            size="small"
            value={name}
            error={error[0]}
            helperText={
              error[0] ? "Please enter your full name (first & last name)" : ""
            }
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
            helperText={error[1] ? "Please enter a valid email address" : ""}
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
          fullWidth
          renderInput={(params) => (
            <ColoredTextFeild
              {...params}
              label="Address"
              variant="outlined"
              size="small"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          )}
        />
      </div>
      <div className="largecontainer">
        <EquipmentLoanerProgramCard>
          <List
            sx={{
              width: "100%",
              padding: "0px",
            }}
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
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </EquipmentLoanerProgramCard>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="pickup">
            <ColoredTextFeild
              label="Requested Pickup Date"
              variant="outlined"
              size="small"
              value={pickup}
              error={error[3]}
              helperText={
                error[3] ? "Please enter a valid date (mm/dd/yyyy)" : ""
              }
              onChange={(e) => setPickup(e.target.value)}
              fullWidth
            />
          </div>
          <div className="dropoff">
            <ColoredTextFeild
              label="Return Date"
              variant="outlined"
              size="small"
              value={dropoff}
              error={error[4]}
              helperText={
                error[4] ? "Please enter a valid date (mm/dd/yyyy)" : ""
              }
              onChange={(e) => setDropoff(e.target.value)}
              fullWidth
            />
          </div>
        </div>
        <div className="break" />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
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
        </div>
      </div>
    </div>
  );
}
