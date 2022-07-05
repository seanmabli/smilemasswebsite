import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

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
      {contacts.map((contact) => {
        console.log(contact);
        if (contact.phone !== "") {
          return (
            <>
              <br />
              <p style={{ fontWeight: "bold" }}>
                {contact.name} - {contact.email} - {contact.phone} -{" "}
                {contact.time.toDate().toString()}
              </p>
              <p style={{ whiteSpace: "pre-wrap" }}>{contact.message}</p>
              <br />
            </>
          );
        } else {
          return (
            <>
              <br />
              <p style={{ fontWeight: "bold" }}>
                {contact.name} - {contact.email} -{" "}
                {contact.time.toDate().toString()}
              </p>
              <p style={{ whiteSpace: "pre-wrap" }}>{contact.message}</p>
              <br />
            </>
          );
        }
      })}
    </div>
  );
}
