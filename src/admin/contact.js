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
import PropTypes from "prop-types";
import { AdminTabs, AdminTab } from "../components/mui";

export default function AdminContact() {
  const [contacts, setContacts] = useState([]);
  const [initial, setInitial] = useState(true);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const getContacts = async () => {
      const data = await getDocs(collection(db, "contact"));
      setContacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      if (initial) {
        const upload = async (contact) => {
          if (contact.status === "new") {
            await updateDoc(doc(db, "contact", contact.id), {
              status: "all",
            });
          }
        };
        setContacts((state) => {
          for (const contact of state) {
            upload(contact);
          }
          return state;
        });
        setInitial(false);
      }
    };
    getContacts();
  }, []);

  contacts.sort(function (first, second) {
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

  function archive(contact) {
    const update = async (contact) => {
      console.log("archive");
      await updateDoc(doc(db, "contact", contact.id), {
        status: "archived",
      });
      contact.status = "archived";
      forceUpdate();
    };
    update(contact);
  }

  function unarchive(contact) {
    const update = async (contact) => {
      console.log("unarchive");
      await updateDoc(doc(db, "contact", contact.id), {
        status: "all",
      });
      contact.status = "all";
      forceUpdate();
    };
    update(contact);
  }

  const [open, setOpen] = useState(false);
  const [deletingContact, setDeletingContact] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function deleteContact() {
    const upload = async () => {
      await deleteDoc(doc(db, "contact", deletingContact.id));
      contacts.splice(contacts.indexOf(deletingContact), 1);
      handleClose();
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

  console.log(emailList);

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
          <AdminTabs value={value} onChange={handleChange}>
            <AdminTab label="New" {...a11yProps(0)} />
            <AdminTab label="All" {...a11yProps(1)} />
            <AdminTab label="Archive" {...a11yProps(2)} />
            <AdminTab label="Email List" {...a11yProps(3)} />
          </AdminTabs>
        </Box>
        <br />
        <TabPanel value={value} index={0}>
          {contacts.map((contact) => {
            if (contact.status === "new") {
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
                          archive(contact);
                        }}
                      >
                        <ArchiveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setDeletingContact(contact);
                          handleClickOpen();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <p>
                    <span className="bold">Name: </span>
                    {contact.name}
                  </p>
                  <p>
                    <span className="bold">Email: </span>
                    {contact.email}
                  </p>
                  <p>
                    <span className="bold">Phone: </span>
                    {contact.phone}
                  </p>
                  <p>
                    <span className="bold">Message: </span>
                    <br />
                    <span
                      style={
                        contact.message.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {contact.message}
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
              contacts.filter((content) => content.status === "new").length ===
              0
                ? { display: "flex" }
                : { display: "none" }
            }
          >
            No new submissions
          </p>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {contacts.map((contact) => {
            if (contact.status === "all") {
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
                          archive(contact);
                        }}
                      >
                        <ArchiveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setDeletingContact(contact);
                          handleClickOpen();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <p>
                    <span className="bold">Name: </span>
                    {contact.name}
                  </p>
                  <p>
                    <span className="bold">Email: </span>
                    {contact.email}
                  </p>
                  <p>
                    <span className="bold">Phone: </span>
                    {contact.phone}
                  </p>
                  <p>
                    <span className="bold">Message: </span>
                    <br />
                    <span
                      style={
                        contact.message.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {contact.message}
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
        </TabPanel>
        <TabPanel value={value} index={2}>
          {contacts.map((contact) => {
            if (contact.status === "archived") {
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
                          unarchive(contact);
                        }}
                      >
                        <UnarchiveIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => {
                          setDeletingContact(contact);
                          handleClickOpen();
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <p>
                    <span className="bold">Name: </span>
                    {contact.name}
                  </p>
                  <p>
                    <span className="bold">Email: </span>
                    {contact.email}
                  </p>
                  <p>
                    <span className="bold">Phone: </span>
                    {contact.phone}
                  </p>
                  <p>
                    <span className="bold">Message: </span>
                    <br />
                    <span
                      style={
                        contact.message.includes("\n")
                          ? { whiteSpace: "pre-wrap" }
                          : {}
                      }
                    >
                      {contact.message}
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
        </TabPanel>
        <TabPanel value={value} index={3}>
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
                    <IconButton onClick={() => {}}>
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
          <Button onClick={deleteContact} variant="outlined" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
