import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Skeleton, Stack } from "@mui/material";
import { Footer } from "../components/footer";

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

  if (true) {
    return (
      <div className="page">
        <h1>Frequently Asked Questions</h1>
        <br />
        {faqs.map((faq) => {
          return (
            <>
              <br />
              <p style={{ fontWeight: "bold" }}>{faq.question}</p>
              <br />
              <p>{faq.answer}</p>
              <br />
              <Reference reference={faq.reference} />
              <br />
            </>
          );
        })}
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="page">
        <h1>Frequently Asked Questions</h1>
        <br />
        <Stack spacing={1}>
          <Skeleton
            variant="text"
            width={800}
            height={35}
            style={{ backgroundColor: "#ccc" }}
          />
          <Skeleton
            variant="rectangular"
            height={200}
            style={{ maxWidth: "1250px" }}
          />
          <Skeleton variant="text" style={{ maxWidth: "1250px" }} height={35} />
        </Stack>
        <br />
        <Stack spacing={1}>
          <Skeleton
            variant="text"
            width={800}
            height={35}
            style={{ backgroundColor: "#ccc" }}
          />
          <Skeleton
            variant="rectangular"
            height={200}
            style={{ maxWidth: "1250px" }}
          />
          <Skeleton variant="text" style={{ maxWidth: "1250px" }} height={35} />
        </Stack>
        <Footer />
      </div>
    );
  }
}
