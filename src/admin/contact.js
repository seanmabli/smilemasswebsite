import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Divider } from "@mui/material";
import ArchiveIcon from "@mui/icons-material/Archive";

export default function AdminContact() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      const data = await getDocs(collection(db, "contact"));
      setContacts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getContacts();
  }, []);

  contacts.sort(function (first, second) {
    return first.tune - second.index;
  });

  return (
    <div className="page">
      <h1>Admin - Contact</h1>
      <br />
      <Divider />
      <br />
      {contacts.map((contact) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ArchiveIcon style={{}} />
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
              <span style={{ whiteSpace: "pre-wrap" }}>{contact.message}</span>
            </p>
            <br />
            <Divider />
            <br />
          </div>
        );
      })}
    </div>
  );
}
