import { useState } from "react";
import {
  ColoredTextField,
  EquipmentLoanerProgramCard,
} from "../components/mui";
import { Footer } from "../components/footer";
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
import premium from "../images/clubsmilemass/premium.jpeg";
import plus from "../images/clubsmilemass/plus.jpg";
import base from "../images/clubsmilemass/base.jpg";
import usePlacesAutocomplete from "@atomap/use-places-autocomplete";
import "./clubsmilemass.css";

export default function ClubSMILEMass() {
  const [childName, setChildName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [parentName, setParentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [staffing, setStaffing] = useState(false);
  const [ambulate, setAmbulate] = useState(false);
  const [wheelchair, setWheelchair] = useState(false);
  const [seizure, setSeizure] = useState(false);
  const [medicine, setMedicine] = useState(false);
  const [equiptment, setEquiptment] = useState([]);
  const [error, setError] = useState([false, false, false, false]);
  const [success, setSuccess] = useState(false);

  const { predictions } = usePlacesAutocomplete(address);

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

  return (
    <div className="page">
      <h1>Club SMILE Mass</h1>
      <br />
      <p>
        Club SMILE Mass is our newest and fastest growing program. Created for
        adults and children with disabilities, this program is designed for
        socialization and movement.
      </p>
      <br />
      <p>
        Our members want to have fun, be part of a community, and take care of
        their health. With this program, members will enjoy fun classes led by
        our outstanding team. They will continue to see and hear familiar faces
        and voices, they will make friends, and they will move their bodies. We
        all know movement is essential for physical and mental health –
        improving mood and brain function.
      </p>
      <br />
      <p>
        We also ensure we meet each member at their current level, while working
        with them to grow stronger and more confident. We’ve seen incredible
        progress from our members!
      </p>
      <br />
      <div className="clubsmilemassgrid">
        <img
          className="clubsmilemasspremiumimage"
          src={premium}
          alt="Club SMILE Premium"
        />
        <img
          className="clubsmilemassplusimage"
          src={plus}
          alt="Club SMILE Plus"
        />
        <img
          className="clubsmilemassbaseimage"
          src={base}
          alt="Club SMILE Base"
        />
        <div className="clubsmilemassplusimage"></div>
        <div className="clubsmilemassbaseimage"></div>
        <div className="clubsmilemasspremium">
          <h2>Club SMILE Premium - $350</h2>
          <p>Self Directed Program</p>
          <ul className="dashed">
            <li>Personalized self directed program schedule</li>
            <li>Full access to Life Time fitness 7 days/week</li>
            <li>
              In-person weekly 1-on-1 or small group swim/gym classes with
              specially trained instructors*
            </li>
            <li>
              Access to all Zoom classes
              <ul className="dashed">
                <li>Music​</li>
                <li>Storytime</li>
                <li>Group Fitness</li>
                <li>BINGO</li>
                <li>Book Club</li>
              </ul>
            </li>
            <li>
              Adapted bike provided with evaluation &amp; some gym equipment
            </li>
            <li>
              Organized social outings (additional fee may apply)
              <ul className="dashed">
                <li>Biking</li>
                <li>Hiking</li>
                <li>Kayaking</li>
                <li>Dance Party</li>
              </ul>
            </li>
            <li>Coming soon - Weekend sports</li>
          </ul>
        </div>
        <div className="clubsmilemassplus">
          <h2>Club SMILE Plus - $250</h2>
          <p>After School Program</p>
          <ul className="dashed">
            <li>Full access to Life Time fitness 7 days/week</li>
            <li>1 gym class/week &amp; 1 swim class/week*</li>
            <li>
              Access to all Zoom classes
              <ul className="dashed">
                <li>Music ​</li>
                <li>Storytime</li>
                <li>Group Fitness</li>
                <li>BINGO</li>
                <li>Book Club</li>
              </ul>
            </li>
            <li>Adapted equipment for home</li>
            <li>Adapted bike provided with evaluation</li>
            <li>
              Organized social outings (additional fee may apply) may include:
              <ul className="dashed">
                <li>Biking</li>
                <li>Hiking</li>
                <li>Kayaking</li>
                <li>Dance Party</li>
              </ul>
            </li>
            <li>*Swim &amp; in-person gym classes are by appointment only</li>
          </ul>
        </div>
        <div className="clubsmilemassbase">
          <h2>Club SMILE Base - $100</h2>
          <p>After School Program</p>
          <ul className="dashed">
            <li>
              Access to all Zoom classes
              <ul className="dashed">
                <li>Music​ - 3x/week</li>
                <li>Storytime - 3x/week</li>
                <li>Group Fitness</li>
                <li>BINGO</li>
                <li>Book Club</li>
              </ul>
            </li>
            <li>Adapted equipment for home</li>
            <li>Adapted bike provided with evaluation</li>
            <li>Social outings (additional fee may apply)</li>
          </ul>
        </div>
      </div>
      <br />
      <p>
        Bike evaluations are done on all 3 tiers of the program. Bikes will be
        provided to be used at home or in the community. Bikes & gym equipment
        are available as long as clients are part of the program. As the client
        grows, we are able to grow with them in their skill level and bike
        sizing.
      </p>
      <br />
      <h2>Fill out the form below for more information about our programs!</h2>
      <br />
      <Box component="form" noValidate autoComplete="off">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="formone formleft">
            <ColoredTextField
              label="Full Name"
              variant="outlined"
              size="small"
              value={childName}
              error={error[0]}
              helperText={
                error[0] ? "Please enter a full name (first & last name)" : ""
              }
              onChange={(e) => setChildName(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div className="formone formcenter">
            <ColoredTextField
              label="Birthday"
              variant="outlined"
              size="small"
              value={birthday}
              error={error[1]}
              helperText={
                error[1] ? "Please enter a valid birthday (mm/dd/yyyy)" : ""
              }
              onChange={(e) => setBirthday(e.target.value)}
              fullWidth
              required
            />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="formone formleft">
            <ColoredTextField
              label="Parent/Guardian Full Name"
              variant="outlined"
              size="small"
              value={parentName}
              error={error[2]}
              helperText={
                error[2] ? "Please enter a full name (first & last name)" : ""
              }
              onChange={(e) => setParentName(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div className="formone formcenter">
            <ColoredTextField
              label="Parent/Guardian Email"
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
          <div className="formone formright">
            <ColoredTextField
              label="Parent/Guardian Phone"
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
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="formthree formfull">
            <Autocomplete
              disablePortal
              options={predictions.map(({ description }) => description)}
              fullWidth
              clearOnBlur={false}
              onChange={(event, value) => setAddress(value)}
              renderInput={(params) => (
                <ColoredTextField
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
        </div>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="formone formleft">
            <ColoredTextField
              label="Emergency Contact Full Name"
              variant="outlined"
              size="small"
              value={emergencyName}
              error={error[3]}
              helperText={
                error[3] ? "Please enter a full name (first & last name)" : ""
              }
              onChange={(e) => setEmergencyName(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div className="formone formcenter">
            <ColoredTextField
              label="Emergency Contact Phone"
              variant="outlined"
              size="small"
              value={emergencyPhone}
              error={error[1]}
              helperText={error[1] ? "Please enter a valid phone number" : ""}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              fullWidth
              required
            />
          </div>
        </div>
        <div className="formthree formfull">
          <ColoredTextField
            label="Diagnosis"
            variant="outlined"
            size="small"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            fullWidth
            multiline
            minRows={4}
          />
        </div>
        <EquipmentLoanerProgramCard className="equiptment">
          <List
            sx={{
              width: "100%",
              padding: "0px",
            }}
            subheader={
              <ListSubheader sx={{ lineHeight: "20px", paddingTop: "10px"}}>
                What type of equipment are you interested in?
              </ListSubheader>
            }
          >
            {["Adapted bike", "Stroller", "Home gym package"].map((value) => {
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
        <div className="formthree formfull">
          <FormControlLabel
            control={
              <Switch
                style={{ color: "#547c94" }}
                value={staffing}
                onChange={(e) => setStaffing(e.target.checked)}
              />
            }
            label="Do you need additional staffing? (additional $35/hr)"
            labelPlacement="start"
            style={{ margin: "0", color: "rgba(0, 0, 0, 0.6)" }}
          />
        </div>
        <div className="formthree formfull">
          <FormControlLabel
            control={
              <Switch
                style={{ color: "#547c94" }}
                value={ambulate}
                onChange={(e) => setAmbulate(e.target.checked)}
              />
            }
            label="Can the individual ambulate?"
            labelPlacement="start"
            style={{ margin: "0", color: "rgba(0, 0, 0, 0.6)" }}
          />
        </div>
        <div className="formthree formfull">
          <FormControlLabel
            control={
              <Switch
                style={{ color: "#547c94" }}
                value={wheelchair}
                onChange={(e) => setWheelchair(e.target.checked)}
              />
            }
            label="Does the individual use a wheelchair?"
            labelPlacement="start"
            style={{ margin: "0", color: "rgba(0, 0, 0, 0.6)" }}
          />
        </div>
        <div className="formthree formfull">
          <FormControlLabel
            control={
              <Switch
                style={{ color: "#547c94" }}
                value={seizure}
                onChange={(e) => setSeizure(e.target.checked)}
              />
            }
            label="Does the individual have a seizure disorder?"
            labelPlacement="start"
            style={{ margin: "0", color: "rgba(0, 0, 0, 0.6)" }}
          />
        </div>
        <div className="formthree formfull">
          <FormControlLabel
            control={
              <Switch
                style={{ color: "#547c94" }}
                value={medicine}
                onChange={(e) => setMedicine(e.target.checked)}
              />
            }
            label="Do they travel with rescue medicine/a plan?"
            labelPlacement="start"
            style={{ margin: "0", color: "rgba(0, 0, 0, 0.6)" }}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button
            variant="outlined"
            style={{ color: "#547c94", borderColor: "#547c94" }}
          >
            Submit
          </Button>
        </div>
      </Box>
      <Footer />
    </div>
  );
}
