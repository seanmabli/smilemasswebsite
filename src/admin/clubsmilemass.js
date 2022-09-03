import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router";
import {
  Button,
  Divider,
  Tooltip,
  IconButton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import UnarchiveRoundedIcon from "@mui/icons-material/UnarchiveRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { AdminTabs, AdminTab, ColoredTextField } from "../components/mui";

import "./contact.css";

export function AdminClubSmileMass() {
  const [responses, setResponses] = useState([]);
  const [initial, setInitial] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const getResponses = async () => {
      const data = await getDocs(collection(db, "clubsmilemass"));
      setResponses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      if (initial) {
        const upload = async (response) => {
          if (response.status === "new") {
            await updateDoc(doc(db, "clubsmilemass", response.id), {
              status: "all",
            });
          }
        };
        setResponses((state) => {
          for (const response of state) {
            upload(response);
          }
          return state;
        });
        setInitial(false);
      }
    };
    getResponses();
  }, []);

  responses.sort(function (first, second) {
    return second.time - first.time;
  });

  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  function archive(response) {
    const update = async (response) => {
      console.log("archive");
      await updateDoc(doc(db, "clubsmilemass", response.id), {
        status: "archived",
      });
      response.status = "archived";
      forceUpdate();
    };
    update(response);
  }

  function unarchive(response) {
    const update = async (response) => {
      console.log("unarchive");
      await updateDoc(doc(db, "clubsmilemass", response.id), {
        status: "all",
      });
      response.status = "all";
      forceUpdate();
    };
    update(response);
  }

  const [openDeletingResponse, setOpenDeletingResponse] = useState(false);
  const [deletingResponse, setDeletingResponse] = useState({});

  const [openDeletingEmail, setOpenDeletingEmail] = useState(false);
  const [deletingEmail, setDeletingEmail] = useState("");

  function deleteresponse() {
    const upload = async () => {
      await deleteDoc(doc(db, "clubsmilemass", deletingResponse.id));
      responses.splice(responses.indexOf(deletingResponse), 1);

      setOpenDeletingResponse(false);
      forceUpdate();
    };
    upload();
  }

  const [emailList, setEmailList] = useState([]);
  useEffect(() => {
    const getEmailList = async () => {
      const data = await getDoc(doc(db, "email", "clubsmilemass"));
      setEmailList(data.data().email);
    };
    getEmailList();
  }, []);

  function deleteEmail() {
    const update = async () => {
      await updateDoc(doc(db, "email", "clubsmilemass"), {
        email: emailList.filter((e) => e !== deletingEmail),
      });
      setEmailList((state) => state.filter((e) => e !== deletingEmail));
      setOpenDeletingEmail(false);
      forceUpdate();
    };
    update();
  }

  function addEmail() {
    setError(false);

    var emailRegex =
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      setError(true);
    }

    const update = async () => {
      await updateDoc(doc(db, "email", "clubsmilemass"), {
        email: [...emailList, email],
      });
      setEmailList((state) => [...state, email]);
      setEmail("");
      forceUpdate();
    };

    setError((state) => {
      if (!state) {
        update();
      }
      return state;
    });
  }

  function DisplayResponse(props) {
    return (
      <>
        <p>
          <span className="bold">Full Name: </span>
          {props.response.childname}
        </p>
        <p>
          <span className="bold">Birthday: </span>
          {props.response.birthday}
        </p>
        <p>
          <span className="bold">Parent/Guardian Full Name: </span>
          {props.response.parentname}
        </p>
        <p>
          <span className="bold">Parent/Guardian Email: </span>
          {props.response.parentemail}
        </p>
        <p>
          <span className="bold">Parent/Guardian Phone: </span>
          {props.response.parentphone}
        </p>
        <p>
          <span className="bold">Address: </span>
          {props.response.address}
        </p>
        <p>
          <span className="bold">Emergency Contact Full Name: </span>
          {props.response.emergencyname}
        </p>
        <p>
          <span className="bold">Emergency Contact Phone: </span>
          {props.response.emergencyphone}
        </p>
        <p>
          <span className="bold">Diagnosis: </span>
          <br />
          <span
            style={
              props.response.diagnosis.includes("\n")
                ? { whiteSpace: "pre-wrap" }
                : {}
            }
          >
            {props.response.diagnosis}
          </span>
        </p>
        <p>
          <span className="bold">
            What type of equipment are you interested in:{" "}
          </span>
          {props.response.equiptment.join(", ")}
        </p>
        <p>
          <span className="bold">When would you like to see the program: </span>
          {props.response.programs.join(", ")}
        </p>
        <p>
          <span className="bold">Do you need additional staffing: </span>
          {props.response.staffing ? "Yes" : "No"}
        </p>
        <p>
          <span className="bold">Can the individual ambulate: </span>
          {props.response.ambulate ? "Yes" : "No"}
        </p>
        <p>
          <span className="bold">Does the individual use a wheelchair: </span>
          {props.response.wheelchair ? "Yes" : "No"}
        </p>
        <p>
          <span className="bold">
            Does the individual have a seizure disorder:
          </span>
          {props.response.seizure ? "Yes" : "No"}
        </p>
        <p>
          <span className="bold">
            Do they travel with rescue medicine/a plan:{" "}
          </span>
          {props.response.medicine ? "Yes" : "No"}
        </p>

        <p>
          <span className="bold">
            Any additional information you'd like us to know:{" "}
          </span>
          <br />
          <span
            style={
              props.response.questions.includes("\n")
                ? { whiteSpace: "pre-wrap" }
                : {}
            }
          >
            {props.response.questions}
          </span>
        </p>
      </>
    );
  }

  return (
    <div className="page">
      <h1>
        <span
          onClick={() => navigate("/admin/dashboard")}
          style={{ cursor: "pointer" }}
        >
          Admin
        </span>{" "}
        <span style={{ color: "gray" }}>/</span> Club SMILE Mass
      </h1>
      <br />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <AdminTabs value={value}>
            <AdminTab label="New" onClick={() => setValue(0)} />
            <AdminTab label="All" onClick={() => setValue(1)} />
            <AdminTab label="Archive" onClick={() => setValue(2)} />
            <AdminTab label="Email List" onClick={() => setValue(3)} />
          </AdminTabs>
        </Box>
        <br />
        <div hidden={value !== 0}>
          {responses.map((response) => {
            if (response.status === "new") {
              return (
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      color: "#547c94",
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                    }}
                  >
                    <Tooltip title="Archive">
                      <IconButton
                        onClick={() => {
                          archive(response);
                        }}
                      >
                        <ArchiveRoundedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setDeletingResponse(response);
                          setOpenDeletingResponse(true);
                        }}
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <DisplayResponse response={response} />
                  <br />
                  <Divider />
                  <br />
                </div>
              );
            } else {
              return null;
            }
          })}
          <p
            style={
              responses.filter((content) => content.status === "new").length ===
              0
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            No new submissions
          </p>
        </div>
        <div hidden={value !== 1}>
          {responses.map((response) => {
            if (response.status === "all") {
              return (
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      color: "#547c94",
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                    }}
                  >
                    <Tooltip title="Archive">
                      <IconButton
                        onClick={() => {
                          archive(response);
                        }}
                      >
                        <ArchiveRoundedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setDeletingResponse(response);

                          setOpenDeletingResponse(true);
                        }}
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <DisplayResponse response={response} />
                  <br />
                  <Divider />
                  <br />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div hidden={value !== 2}>
          {responses.map((response) => {
            if (response.status === "archived") {
              return (
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      color: "#547c94",
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                    }}
                  >
                    <Tooltip title="Unarchive">
                      <IconButton
                        onClick={() => {
                          unarchive(response);
                        }}
                      >
                        <UnarchiveRoundedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setDeletingResponse(response);
                          setOpenDeletingResponse(true);
                        }}
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <DisplayResponse response={response} />
                  <br />
                  <Divider />
                  <br />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div hidden={value !== 3}>
          {emailList.map((email) => {
            return (
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    color: "#547c94",
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                  }}
                >
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => {
                        setDeletingEmail(email);
                        setOpenDeletingEmail(true);
                      }}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <p style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                  {email}
                </p>
                <br />
                <Divider />
                <br />
              </div>
            );
          })}
          <Box component="form" noValidate autoComplete="off">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div className="addemail">
                <ColoredTextField
                  label="New Email"
                  variant="outlined"
                  size="small"
                  value={email}
                  error={error}
                  helperText={error ? "Please enter a valid email address" : ""}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                />
              </div>
              <Button
                onClick={addEmail}
                style={{
                  color: "#547c94",
                  borderColor: "#547c94",
                  marginLeft: "10px",
                  height: "40px",
                }}
                variant="outlined"
              >
                Add
              </Button>
            </div>
          </Box>
        </div>
      </Box>
      <Dialog
        open={openDeletingResponse}
        onClose={() => setOpenDeletingResponse(false)}
      >
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. This will permanently delete this
            response.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeletingResponse(false)}
            variant="outlined"
            style={{ color: "#547c94", borderColor: "#547c94" }}
          >
            Cancel
          </Button>
          <Button onClick={deleteresponse} variant="outlined" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeletingEmail}
        onClose={() => setOpenDeletingEmail(false)}
      >
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. This will permanently delete this
            email.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeletingEmail(false)}
            variant="outlined"
            style={{ color: "#547c94", borderColor: "#547c94" }}
          >
            Cancel
          </Button>
          <Button onClick={deleteEmail} variant="outlined" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
