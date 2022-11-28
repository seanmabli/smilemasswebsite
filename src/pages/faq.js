import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

import { Divider } from "@mui/material";

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const getFaqs = async () => {
      const data = await getDocs(collection(db, "faq"));
      setFaqs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFaqs();
  }, []);

  faqs.sort(function (first, second) {
    return first.index - second.index;
  });

  function Reference(props) {
    console.log(props.reference);
    if (props.reference === "") {
      return null;
    } else {
      return (
        <p style={{ fontStyle: "italic" }}>Reference: {props.reference}</p>
      );
    }
  }

  return (
    <div className="page">
      <h1>Frequently Asked Questions</h1>
      <br />
      {faqs.map((faq) => {
        return (
          <>
            <br />
            <Divider />
            <br />
            <p style={{ fontWeight: "bold" }}>{faq.question}</p>
            <br />
            <p>{faq.answer}</p>
            <br />
            <Reference reference={faq.reference} />
          </>
        );
      })}
      
    </div>
  );
}
