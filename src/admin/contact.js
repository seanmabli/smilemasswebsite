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
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { AdminTabs, AdminTab, ColoredTextField } from "../components/mui";

import "./contact.css";

export default function AdminContact() {
  const [responses, setResponses] = useState([]);
  const [initial, setInitial] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const getResponses = async () => {
      const data = await getDocs(collection(db, "contact"));
      setResponses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      if (initial) {
        const upload = async (response) => {
          if (response.status === "new") {
            await updateDoc(doc(db, "contact", response.id), {
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
      await updateDoc(doc(db, "contact", response.id), {
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
      await updateDoc(doc(db, "contact", response.id), {
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
      await deleteDoc(doc(db, "contact", deletingResponse.id));
      responses.splice(responses.indexOf(deletingResponse), 1);

      setOpenDeletingResponse(false);
      forceUpdate();
    };
    upload();
  }

  const [emailList, setEmailList] = useState([]);
  useEffect(() => {
    const getEmailList = async () => {
      const data = await getDoc(doc(db, "email", "contact"));
      setEmailList(data.data().email);
    };
    getEmailList();
  }, []);

  function deleteEmail() {
    const update = async () => {
      await updateDoc(doc(db, "email", "contact"), {
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
      await updateDoc(doc(db, "email", "contact"), {
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

  return (
    <div className="page">
      <h1>
        <span
          onClick={() => navigate("/admin/dashboard")}
          style={{ cursor: "pointer" }}
        >
          Admin
        </span>{" "}
        <span style={{ color: "gray" }}>/</span> Contact
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
                  <p>
                    <span className="bold">Name: </span>
                    {response.name}
                  </p>
                  <p>
                    <span className="bold">Email: </span>
                    {response.email}
                  </p>
                  <p>
                    <span className="bold">Phone: </span>
                    {response.phone}
                  </p>
                  <p>
                    <span className="bold">Message: </span>
                    <br />
                    <span
                      style={
                        response.message.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {response.message}
                    </span>
                  </p>
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
                  <p>
                    <span className="bold">Name: </span>
                    {response.name}
                  </p>
                  <p>
                    <span className="bold">Email: </span>
                    {response.email}
                  </p>
                  <p>
                    <span className="bold">Phone: </span>
                    {response.phone}
                  </p>
                  <p>
                    <span className="bold">Message: </span>
                    <br />
                    <span
                      style={
                        response.message.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {response.message}
                    </span>
                  </p>
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
                  <p>
                    <span className="bold">Name: </span>
                    {response.name}
                  </p>
                  <p>
                    <span className="bold">Email: </span>
                    {response.email}
                  </p>
                  <p>
                    <span className="bold">Phone: </span>
                    {response.phone}
                  </p>
                  <p>
                    <span className="bold">Message: </span>
                    <br />
                    <span
                      style={
                        response.message.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {response.message}
                    </span>
                  </p>
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
