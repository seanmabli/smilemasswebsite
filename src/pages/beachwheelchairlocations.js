import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  Box,
  Button,
  Autocomplete,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { ColoredTextField } from "../components/mui";
import usePlacesAutocomplete from "@atomap/use-places-autocomplete";
import "./beachwheelchairlocations.css";

export default function BeachWheelchairLocations() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [beach, setBeach] = useState("");
  const [beachAddress, setBeachAddress] = useState("");
  const [contact, setContact] = useState("");
  const [why, setWhy] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [error, setError] = useState([false, false, false]);
  const [success, setSuccess] = useState(false);

  const addressPredictions = usePlacesAutocomplete(address).predictions;
  const beachAddressPredictions =
    usePlacesAutocomplete(beachAddress).predictions;

  function submitBeachNominationForm() {
    setError([false, false, false, false, false, false, false]);

    // validtate name
    var twoWordNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var threeWordNameRegex = /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/;
    if (!twoWordNameRegex.test(name) && !threeWordNameRegex.test(name)) {
      setError((state) => [true, state[1], state[2]]);
    }

    // validtate email
    var emailRegex =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setError((state) => [state[0], true, state[2]]);
    }

    // validtate phone
    var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(phone)) {
      setError((state) => [state[0], state[1], true]);
    }

    const upload = async () => {
      await addDoc(collection(db, "beachnomination"), {
        name: name,
        email: email,
        phone: phone,
        address: address,
        beach: beach,
        beachAddress: beachAddress,
        contact: contact,
        why: why,
        newsletter: newsletter,
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

  console.log(newsletter);

  return (
    <div className="page">
      <h1>Beach Wheelchair Locations</h1>
      <br />
      <div className="maptext">
        <div className="text">
          <p>
            SMILE Mass donates approximately 20 floating beach wheelchairs per
            year to public beaches. Your donation will help SMILE Mass make more
            beaches accessible. Where would you like to see a floating beach
            wheelchair? Let us know!
          </p>
          <br />
          <p>
            There is something special about the beach. It is relaxing,
            breathtaking and no matter the age, a day at the beach always makes
            life a little easier. Yes, it is hard to deny, but there is just
            something magical about the beach. Because the beach is a magical
            place, we at SMILE Mass, wanted everyone to have a choice to enjoy
            the beach despite disability. We believe it is the little things in
            life that can make memories that last a lifetime. I am sure we all
            remember growing up, enjoying time with family and friends on the
            beach. Building sandcastles, surfing the crashing waves on our
            boogie boards, eating homemade sandwiches and getting buried with
            sand, so only our heads showed. Let’s not forget those rosy cheeks
            from being out in the sun for too long!{" "}
          </p>
          <br />
          <p>
            Now stop and think for a moment, what if your sibling or child was
            born with a disability and was confined to a wheelchair, and a trip
            to the beach was no longer possible. What would you do? Would your
            family just not go to the beach? Or perhaps mom or dad would stay
            home with your disabled sibling just so the rest of you could enjoy
            a day at the beach.{" "}
          </p>
          <br />
          <p>
            Think of this for a second, if you were confined to a wheelchair
            getting to the beach would be impossible, the wheels just don’t do
            well in the sand. If you are lucky enough to find a beach that has
            mats or a boardwalk, you might be able to get down to the beach but
            you would be stuck at the end of the mat. Getting in the water to
            cool off would not be an option. That was until we started our Beach
            Wheelchair Program{" "}
          </p>
          <br />
          <p>
            A trip to the beach is something most people do at one time or
            another in their lifetime. It is also one of the free things you can
            still do. The beach doesn’t judge; everyone is welcome.
          </p>
          <br />
        </div>
        <iframe
          src="https://www.google.com/maps/d/embed?mid=11sjOQqOCx4A_zoqpaTzASfqPOyJuoE-D&ehbc=2E312F"
          className="map"
        />
      </div>
      <h2>Available Beaches</h2>
      <br />
      <div className="table">
        <p>Andover</p>
        <ul className="dashed">
          <li>Pomps Pond </li>
        </ul>
        <p>Barnstable-Hyannis</p>
        <ul className="dashed">
          <li>Covell&rsquo;s Beach </li>
          <li>Craigville </li>
          <li>Dowses Beach </li>
          <li>Fortse Beach </li>
          <li>Hamblin&rsquo;s Pond </li>
          <li>Hathaway&rsquo;s Pond </li>
          <li>Kalmus Park Beach </li>
          <li>Keyes Beach </li>
          <li>Loop BeachMillway Beach </li>
          <li>Sandy Neck Beach </li>
          <li>Wequaquet Lake </li>
          <li>Veteran&rsquo;s Park Beach </li>
        </ul>
        <p>Boston</p>
        <ul className="dashed">
          <li>Carson Beach </li>
          <li>Spectacle Island </li>
        </ul>
        <p>Bourne</p>
        <ul className="dashed">
          <li>Monument Beach </li>
          <li>Scusset Beach State Park </li>
        </ul>
        <p>Brewster</p>
        <ul className="dashed">
          <li>Long Pond Beach </li>
        </ul>
        <p>Buzzards Bay</p>
        <ul className="dashed">
          <li>Sagamore Beach </li>
        </ul>
        <p>Chatham</p>
        <ul className="dashed">
          <li>Harding&rsquo;s Beach </li>
          <li>Oyster Pond Beach </li>
        </ul>
        <p>Dennis</p>
        <ul className="dashed">
          <li>Bayview </li>
          <li>Chapin Beach </li>
          <li>Cold Storage </li>
          <li>Corporation Beach (2) </li>
          <li>Glendon </li>
          <li>Howes Street </li>
          <li>Mayflower (2) </li>
          <li>Princess </li>
          <li>West Dennis Beach (2) </li>
        </ul>
        <p>Edgartown</p>
        <ul className="dashed">
          <li>Bend in the Road Beach </li>
          <li>South Beach (2) </li>
        </ul>
        <p>Falmouth</p>
        <ul className="dashed">
          <li>Bristol </li>
          <li>Chapoquoit </li>
          <li>Falmouth Heights </li>
          <li>Megansett </li>
          <li>Menauhant </li>
          <li>Old Silver Beach (2) </li>
          <li>Stoney </li>
          <li>Surf Drive </li>
          <li>Woodneck </li>
        </ul>
        <p>Framingham</p>
        <ul className="dashed">
          <li>Learned&rsquo;s Pond </li>
        </ul>
        <p>Harwich</p>
        <ul className="dashed">
          <li>Bank Street Beach </li>
          <li>Earle Road </li>
          <li>Long Pond </li>
          <li>Pleasant Road </li>
          <li>Red River Beach </li>
          <li>Sand Pond </li>
        </ul>
        <p>Harvard</p>
        <ul className="dashed">
          <li>Bare Hill Pond </li>
        </ul>
        <p>Hudson</p>
        <ul className="dashed">
          <li>Centennial Beach </li>
        </ul>
        <p>Hull</p>
        <ul className="dashed">
          <li>Nantasket Beach </li>
        </ul>
        <p>Ipswich</p>
        <ul className="dashed">
          <li>Crane Beach </li>
        </ul>
        <p>Kingston</p>
        <ul className="dashed">
          <li>Gray&rsquo;s Beach Park </li>
        </ul>
        <p>Mashpee</p>
        <ul className="dashed">
          <li>John&rsquo;s Pond </li>
          <li>South Cape Beach </li>
        </ul>
        <p>Mass Audubon</p>
        <ul className="dashed">
          <li>Long Pasture Wildlife Sanctuary (Barnstable) </li>
        </ul>
        <p>Nahant</p>
        <ul className="dashed">
          <li>Nahant Beach </li>
        </ul>
        <p>Nantucket</p>
        <ul className="dashed">
          <li>Children&rsquo;s Beach </li>
          <li>Jetties Beach (2) </li>
        </ul>
        <p>Natick</p>
        <ul className="dashed">
          <li>Memorial Beach </li>
        </ul>
        <p>New Bedford</p>
        <ul className="dashed">
          <li>West Beach </li>
        </ul>
        <p>Oak Bluffs</p>
        <ul className="dashed">
          <li>Pay Beach </li>
        </ul>
        <p>Orleans</p>
        <ul className="dashed">
          <li>Skaket Beach </li>
        </ul>
        <p>Plymouth</p>
        <ul className="dashed">
          <li>Plymouth Beach </li>
          <li>Morton Park </li>
          <li>Hedges Pond </li>
        </ul>
        <p>Provincetown</p>
        <ul className="dashed">
          <li>Ryder Street Extension (2) </li>
        </ul>
        <p>Revere</p>
        <ul className="dashed">
          <li>Revere Beach </li>
        </ul>
        <p>Sandwich</p>
        <ul className="dashed">
          <li>Peter Pond at Oakcrest CoveSnake Pond </li>
          <li>Wakeby-Mashpee Pond at Ryder Conservation </li>
        </ul>
        <p>Scituate</p>
        <ul className="dashed">
          <li>Humarock </li>
        </ul>
        <p>Sharon</p>
        <ul className="dashed">
          <li>Memorial Park Beach </li>
        </ul>
        <p>Vineyard Haven</p>
        <ul className="dashed">
          <li>Owen Park Beach </li>
        </ul>
        <p>Wayland</p>
        <ul className="dashed">
          <li>Wayland Town Beach </li>
        </ul>
        <p>Wellfleet</p>
        <ul className="dashed">
          <li>Gull Pond </li>
        </ul>
        <p>Yarmouth</p>
        <ul className="dashed">
          <li>Bass Hole (Gray&rsquo;s Beach) </li>
          <li>Bass River Beach (2) </li>
          <li>Seagull Beach (2) </li>
          <li>South Middle Beach </li>
        </ul>
        <p>Connecticut</p>
        <ul className="dashed">
          <li>FairField </li>
          <li>Lake Mohegan </li>
          <li>Norwalk </li>
          <li>Calf Pasture Beach </li>
          <li>Westport </li>
          <li>Compo Beach </li>
        </ul>
        <p>Maine</p>
        <ul className="dashed">
          <li>Kennebunk </li>
          <li>Ocean Park </li>
          <li>Ogunquit </li>
          <li>Wells </li>
        </ul>
        <p>New Hampshire</p>
        <ul className="dashed">
          <li>Mt. Sunapee State Park</li>
          <li>Pawtuckaway State Park </li>
          <li>Wellington State Park </li>
          <li>White Lake State Park </li>
        </ul>
        <p>Vermont</p>
        <ul className="dashed">
          <li>Fairlee Town Beach </li>
        </ul>
      </div>
      <br />
      <h2>Nominate A Beach</h2>
      <br />
      <p>
        If your local beach does not appear on the list, nominate the beach to
        be granted a new beach wheelchair. We will do our best to get that
        location added to the list.{" "}
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
                />
              )}
            />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="beachname">
              <ColoredTextField
                label="Beach Name"
                variant="outlined"
                size="small"
                value={beach}
                onChange={(e) => setBeach(e.target.value)}
                fullWidth
                required
              />
            </div>
            <div className="beachaddress">
              <Autocomplete
                disablePortal
                options={beachAddressPredictions.map(
                  ({ description }) => description
                )}
                clearOnBlur={false}
                onChange={(event, value) => setAddress(value)}
                fullWidth
                renderInput={(params) => (
                  <ColoredTextField
                    {...params}
                    label="Beach Address"
                    variant="outlined"
                    size="small"
                    value={beachAddress}
                    onChange={(e) => setBeachAddress(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="contact">
              <ColoredTextField
                label="Contact Person / Town Official"
                variant="outlined"
                size="small"
                minRows={2}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                multiline
                fullWidth
              />
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className="why">
              <ColoredTextField
                label="Why are you nominating this beach community?"
                variant="outlined"
                size="small"
                minRows={5}
                value={why}
                onChange={(e) => setWhy(e.target.value)}
                multiline
                fullWidth
              />
            </div>
          </div>
          <FormControlLabel
            control={
              <Switch
                style={{ color: "#547c94" }}
                value={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
              />
            }
            label="Interested in receiving our newsletter?"
            labelPlacement="start"
            style={{ margin: "0", color: "rgba(0, 0, 0, 0.6)" }}
          />
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="outlined"
              onClick={submitBeachNominationForm}
              style={{ color: "#547c94", borderColor: "#547c94" }}
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
      <div style={success ? {} : { display: "none" }}>
        <p>
          Thank you for helping us find beaches in communities that need
          wheelchairs.
        </p>
        <p>We will be in touch with you shortly.</p>
      </div>
    </div>
  );
}
