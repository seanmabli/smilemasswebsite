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
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdminTabs, AdminTab, ColoredTextField } from "../components/mui";

export default function AdminEquiptmentLoanerProgram() {
  const [responses, setresponses] = useState([]);
  const [initial, setInitial] = useState(true);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const getresponses = async () => {
      const data = await getDocs(collection(db, "equiptmentloaner"));
      setresponses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      if (initial) {
        const upload = async (response) => {
          if (response.status === "new") {
            await updateDoc(doc(db, "equiptmentloaner", response.id), {
              status: "all",
            });
          }
        };
        setresponses((state) => {
          for (const response of state) {
            upload(response);
          }
          return state;
        });
        setInitial(false);
      }
    };
    getresponses();
  }, []);

  responses.sort(function (first, second) {
    return second.time - first.time;
  });

  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  function archive(response) {
    const update = async (response) => {
      console.log("archive");
      await updateDoc(doc(db, "equiptmentloaner", response.id), {
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
      await updateDoc(doc(db, "equiptmentloaner", response.id), {
        status: "all",
      });
      response.status = "all";
      forceUpdate();
    };
    update(response);
  }

  const [openDeletingResponse, setOpenDeletingResponse] = useState(false);
  const [DeletingResponse, setDeletingResponse] = useState({});

  const [openDeletingEmail, setOpenDeletingEmail] = useState(false);
  const [deletingEmail, setDeletingEmail] = useState("");

  function deleteresponse() {
    const upload = async () => {
      await deleteDoc(doc(db, "equiptmentloaner", DeletingResponse.id));
      responses.splice(responses.indexOf(DeletingResponse), 1);

      setOpenDeletingResponse(false);
      forceUpdate();
    };
    upload();
  }

  const [emailList, setEmailList] = useState([]);
  useEffect(() => {
    const getEmailList = async () => {
      const data = await getDoc(doc(db, "email", "equiptmentloaner"));
      setEmailList(data.data().email);
    };
    getEmailList();
  }, []);

  function deleteEmail() {
    const update = async () => {
      await updateDoc(doc(db, "email", "equiptmentloaner"), {
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
      await updateDoc(doc(db, "email", "equiptmentloaner"), {
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
        <span style={{ color: "gray" }}>/</span> Equiptment Loaner Program
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
                        <ArchiveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setDeletingResponse(response);

                          setOpenDeletingResponse(true);
                        }}
                      >
                        <DeleteIcon />
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
                    <span className="bold">Address: </span>
                    {response.address}
                  </p>
                  <p>
                    <span className="bold">Equiptment: </span>
                    {response.equiptment.join(", ")}
                  </p>
                  <p>
                    <span className="bold">Requested Pickup Date: </span>
                    {response.pickup}
                  </p>
                  <p>
                    <span className="bold">Return Date: </span>
                    {response.dropoff}
                  </p>
                  <p>
                    <span className="bold">Do you need delivery: </span>
                    {response.delivery ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="bold">Delivery Address: </span>
                    {response.deliveryAddress}
                  </p>
                  <p>
                    <span className="bold">Birthday: </span>
                    {response.birthday}
                  </p>
                  <p>
                    <span className="bold">
                      Have you used this program before:{" "}
                    </span>
                    {response.used ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="bold">Questions / Comments: </span>
                    <br />
                    <span
                      style={
                        response.questions.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {response.questions}
                    </span>
                    <br />
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
                        <ArchiveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setDeletingResponse(response);

                          setOpenDeletingResponse(true);
                        }}
                      >
                        <DeleteIcon />
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
                    <span className="bold">Address: </span>
                    {response.address}
                  </p>
                  <p>
                    <span className="bold">Equiptment: </span>
                    {response.equiptment.join(", ")}
                  </p>
                  <p>
                    <span className="bold">Requested Pickup Date: </span>
                    {response.pickup}
                  </p>
                  <p>
                    <span className="bold">Return Date: </span>
                    {response.dropoff}
                  </p>
                  <p>
                    <span className="bold">Do you need delivery: </span>
                    {response.delivery ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="bold">Delivery Address: </span>
                    {response.deliveryAddress}
                  </p>
                  <p>
                    <span className="bold">Birthday: </span>
                    {response.birthday}
                  </p>
                  <p>
                    <span className="bold">
                      Have you used this program before:{" "}
                    </span>
                    {response.used ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="bold">Questions / Comments: </span>
                    <br />
                    <span
                      style={
                        response.questions.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {response.questions}
                    </span>
                    <br />
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
                        <UnarchiveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setDeletingResponse(response);
                          setOpenDeletingResponse(true);
                        }}
                      >
                        <DeleteIcon />
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
                    <span className="bold">Address: </span>
                    {response.address}
                  </p>
                  <p>
                    <span className="bold">Equiptment: </span>
                    {response.equiptment.join(", ")}
                  </p>
                  <p>
                    <span className="bold">Requested Pickup Date: </span>
                    {response.pickup}
                  </p>
                  <p>
                    <span className="bold">Return Date: </span>
                    {response.dropoff}
                  </p>
                  <p>
                    <span className="bold">Do you need delivery: </span>
                    {response.delivery ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="bold">Delivery Address: </span>
                    {response.deliveryAddress}
                  </p>
                  <p>
                    <span className="bold">Birthday: </span>
                    {response.birthday}
                  </p>
                  <p>
                    <span className="bold">
                      Have you used this program before:{" "}
                    </span>
                    {response.used ? "Yes" : "No"}
                  </p>
                  <p>
                    <span className="bold">Questions / Comments: </span>
                    <br />
                    <span
                      style={
                        response.questions.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {response.questions}
                    </span>
                    <br />
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
                      <DeleteIcon />
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
