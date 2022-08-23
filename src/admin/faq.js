import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Divider, Box, Button } from "@mui/material";
import { ColoredTextField } from "../components/mui";

export function AdminFAQ() {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState([false, false, false]);
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [reference, setReference] = useState([]);

  const navigate = useNavigate();

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
      <h1>
        <span
          onClick={() => navigate("/admin/dashboard")}
          style={{ cursor: "pointer" }}
        >
          Admin
        </span>{" "}
        <span style={{ color: "gray" }}>/</span> FAQ
      </h1>
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
      <br />
      <Divider />
      <br />
      <Box component="form" noValidate autoComplete="off">
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <ColoredTextField
            label="Question"
            variant="outlined"
            size="small"
            value={question}
            error={error}
            helperText={error ? "Please enter a question" : ""}
            onChange={(e) => setQuestion(e.target.value)}
            fullWidth
            required
            sx={{ margin: "5px 0 5px 0" }}
          />
          <ColoredTextField
            label="Answer"
            variant="outlined"
            size="small"
            value={answer}
            error={error}
            helperText={error ? "Please enter a answer" : ""}
            onChange={(e) => setAnswer(e.target.value)}
            fullWidth
            multiline
            minRows={3}
            required
            sx={{ margin: "5px 0 5px 0" }}
          />
          <ColoredTextField
            label="Reference"
            variant="outlined"
            size="small"
            value={reference}
            error={error}
            helperText={error ? "Please enter a question" : ""}
            onChange={(e) => setReference(e.target.value)}
            fullWidth
            required
            sx={{ margin: "5px 0 5px 0" }}
          />
          <Button
            style={{
              color: "#547c94",
              borderColor: "#547c94",
              margin: "5px 0 5px 0",
              height: "40px",
            }}
            variant="outlined"
          >
            Add
          </Button>
        </div>
      </Box>
    </div>
  );
}
