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

export default function AdminVolunteer() {
  const [volunteers, setVolunteers] = useState([]);
  const [initial, setInitial] = useState(true);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const getVolunteers = async () => {
      const data = await getDocs(collection(db, "volunteer"));
      setVolunteers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      if (initial) {
        const upload = async (volunteer) => {
          if (volunteer.status === "new") {
            await updateDoc(doc(db, "volunteer", volunteer.id), {
              status: "all",
            });
          }
        };
        setVolunteers((state) => {
          for (const volunteer of state) {
            upload(volunteer);
          }
          return state;
        });
        setInitial(false);
      }
    };
    getVolunteers();
  }, []);

  volunteers.sort(function (first, second) {
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

  function archive(volunteer) {
    const update = async (volunteer) => {
      console.log("archive");
      await updateDoc(doc(db, "volunteer", volunteer.id), {
        status: "archived",
      });
      volunteer.status = "archived";
      forceUpdate();
    };
    update(volunteer);
  }

  function unarchive(volunteer) {
    const update = async (volunteer) => {
      console.log("unarchive");
      await updateDoc(doc(db, "volunteer", volunteer.id), {
        status: "all",
      });
      volunteer.status = "all";
      forceUpdate();
    };
    update(volunteer);
  }

  const [open, setOpen] = useState(false);
  const [deletingVolunteer, setDeletingVolunteer] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteVolunteer() {
    const upload = async () => {
      await deleteDoc(doc(db, "volunteer", deletingVolunteer.id));
      volunteers.splice(volunteers.indexOf(deletingVolunteer), 1);
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
        <span style={{ color: "gray" }}>/</span> Volunteer
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
          {volunteers.map((volunteer) => {
            if (volunteer.status === "new") {
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
                          archive(volunteer);
                        }}
                      >
                        <ArchiveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setDeletingVolunteer(volunteer);
                          handleClickOpen();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <p>
                    <span className="bold">Name: </span>
                    {volunteer.name}
                  </p>
                  <p>
                    <span className="bold">Email: </span>
                    {volunteer.email}
                  </p>
                  <p>
                    <span className="bold">Phone: </span>
                    {volunteer.phone}
                  </p>
                  <p>
                    <span className="bold">Address: </span>
                    {volunteer.address}
                  </p>
                  <p>
                    <span className="bold">Birthday: </span>
                    {volunteer.birthday}
                  </p>
                  <p>
                    <span className="bold">
                      Which events are you interested in volunteering for:{" "}
                    </span>
                    <br />
                    <span
                      style={
                        volunteer.events.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {volunteer.events}
                    </span>
                    <br />
                  </p>
                  <p>
                    <span className="bold">
                      When are you availability to volunteer:{" "}
                    </span>
                    <br />
                    <span
                      style={
                        volunteer.availability.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {volunteer.availability}
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
              volunteers.filter((content) => content.status === "new")
                .length === 0
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            No new submissions
          </p>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {volunteers.map((volunteer) => {
            if (volunteer.status === "all") {
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
                          archive(volunteer);
                        }}
                      >
                        <ArchiveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setDeletingVolunteer(volunteer);
                          handleClickOpen();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <p>
                    <span className="bold">Name: </span>
                    {volunteer.name}
                  </p>
                  <p>
                    <span className="bold">Email: </span>
                    {volunteer.email}
                  </p>
                  <p>
                    <span className="bold">Phone: </span>
                    {volunteer.phone}
                  </p>
                  <p>
                    <span className="bold">Address: </span>
                    {volunteer.address}
                  </p>
                  <p>
                    <span className="bold">Birthday: </span>
                    {volunteer.birthday}
                  </p>
                  <p>
                    <span className="bold">
                      Which events are you interested in volunteering for:{" "}
                    </span>
                    <br />
                    <span
                      style={
                        volunteer.events.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {volunteer.events}
                    </span>
                    <br />
                  </p>
                  <p>
                    <span className="bold">
                      When are you availability to volunteer:{" "}
                    </span>
                    <br />
                    <span
                      style={
                        volunteer.availability.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {volunteer.availability}
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
          {volunteers.map((volunteer) => {
            if (volunteer.status === "archived") {
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
                          unarchive(volunteer);
                        }}
                      >
                        <UnarchiveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setDeletingVolunteer(volunteer);
                          handleClickOpen();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <p>
                    <span className="bold">Name: </span>
                    {volunteer.name}
                  </p>
                  <p>
                    <span className="bold">Email: </span>
                    {volunteer.email}
                  </p>
                  <p>
                    <span className="bold">Phone: </span>
                    {volunteer.phone}
                  </p>
                  <p>
                    <span className="bold">Address: </span>
                    {volunteer.address}
                  </p>
                  <p>
                    <span className="bold">Birthday: </span>
                    {volunteer.birthday}
                  </p>
                  <p>
                    <span className="bold">
                      Which events are you interested in volunteering for:{" "}
                    </span>
                    <br />
                    <span
                      style={
                        volunteer.events.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {volunteer.events}
                    </span>
                    <br />
                  </p>
                  <p>
                    <span className="bold">
                      When are you availability to volunteer:{" "}
                    </span>
                    <br />
                    <span
                      style={
                        volunteer.availability.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {volunteer.availability}
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
          <Button onClick={deleteVolunteer} variant="outlined" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
