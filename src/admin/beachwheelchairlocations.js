import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
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
import PropTypes from "prop-types";
import { AdminTabs, AdminTab } from "../components/mui";

export default function AdminBeachWheelchairLocations() {
  const [responses, setResponses] = useState([]);
  const [initial, setInitial] = useState(true);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const getresponses = async () => {
      const data = await getDocs(collection(db, "beachnomination"));
      setResponses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      if (initial) {
        const upload = async (response) => {
          if (response.status === "new") {
            await updateDoc(doc(db, "beachnomination", response.id), {
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
    getresponses();
  }, []);

  console.log(responses);

  responses.sort(function (first, second) {
    return second.time - first.time;
  });

  const navigate = useNavigate();

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function archive(response) {
    const update = async (response) => {
      console.log("archive");
      await updateDoc(doc(db, "beachnomination", response.id), {
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
      await updateDoc(doc(db, "beachnomination", response.id), {
        status: "all",
      });
      response.status = "all";
      forceUpdate();
    };
    update(response);
  }

  const [open, setOpen] = useState(false);
  const [deletingresponse, setDeletingresponse] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteResponse() {
    const upload = async () => {
      await deleteDoc(doc(db, "beachnomination", deletingresponse.id));
      responses.splice(responses.indexOf(deletingresponse), 1);
      handleClose();
      forceUpdate();
    };
    upload();
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
        <span style={{ color: "gray" }}>/</span> Beach Wheelchair Locations
      </h1>
      <br />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <AdminTabs value={value} onChange={handleChange}>
            <AdminTab label="New" {...a11yProps(0)} />
            <AdminTab label="All" {...a11yProps(1)} />
            <AdminTab label="Archive" {...a11yProps(2)} />
          </AdminTabs>
        </Box>
        <br />
        <TabPanel value={value} index={0}>
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
                          setDeletingresponse(response);
                          handleClickOpen();
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
                    <span className="bold">Beach Name: </span>
                    {response.beach}
                  </p>
                  <p>
                    <span className="bold">Beach Address: </span>
                    {response.beachAddress}
                  </p>
                  <p>
                    <span className="bold">
                      Contact Person / Town Official:{" "}
                    </span>
                    <br />
                    <span
                      style={
                        response.contact.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {response.contact}
                    </span>
                    <br />
                  </p>
                  <p>
                    <span className="bold">
                    Why are you nominating this beach community:{" "}
                    </span>
                    <br />
                    <span
                      style={
                        response.why.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {response.why}
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
        </TabPanel>
        <TabPanel value={value} index={1}>
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
                          setDeletingresponse(response);
                          handleClickOpen();
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
                    <span className="bold">Beach Name: </span>
                    {response.beach}
                  </p>
                  <p>
                    <span className="bold">Beach Address: </span>
                    {response.beachAddress}
                  </p>
                  <p>
                    <span className="bold">
                      Contact Person / Town Official:{" "}
                    </span>
                    <br />
                    <span
                      style={
                        response.contact.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {response.contact}
                    </span>
                    <br />
                  </p>
                  <p>
                    <span className="bold">
                    Why are you nominating this beach community:{" "}
                    </span>
                    <br />
                    <span
                      style={
                        response.why.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {response.why}
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
        </TabPanel>
        <TabPanel value={value} index={2}>
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
                          setDeletingresponse(response);
                          handleClickOpen();
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
                    <span className="bold">Beach Name: </span>
                    {response.beach}
                  </p>
                  <p>
                    <span className="bold">Beach Address: </span>
                    {response.beachAddress}
                  </p>
                  <p>
                    <span className="bold">
                      Contact Person / Town Official:{" "}
                    </span>
                    <br />
                    <span
                      style={
                        response.contact.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {response.contact}
                    </span>
                    <br />
                  </p>
                  <p>
                    <span className="bold">
                    Why are you nominating this beach community:{" "}
                    </span>
                    <br />
                    <span
                      style={
                        response.why.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {response.why}
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
        </TabPanel>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. This will permanently delete this
            response.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            style={{ color: "#547c94", borderColor: "#547c94" }}
          >
            Cancel
          </Button>
          <Button onClick={deleteResponse} variant="outlined" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
