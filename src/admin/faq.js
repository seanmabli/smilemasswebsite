import { useNavigate } from "react-router";
import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  Divider,
  Box,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { ColoredTextField } from "../components/mui";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export function AdminFAQ() {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState([false, false]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [reference, setReference] = useState("");

  const [editing, setEditing] = useState({ id: null });

  const navigate = useNavigate();
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

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
    if (props.reference === "") {
      return null;
    } else {
      return (
        <p style={{ fontStyle: "italic" }}>Reference: {props.reference}</p>
      );
    }
  }

  function add() {
    setError([false, false, false]);

    if (question === "") {
      setError((state) => [true, state[1]]);
    }

    if (answer === "") {
      setError((state) => [state[0], true]);
    }

    const upload = async () => {
      await addDoc(collection(db, "faq"), {
        question: question,
        answer: answer,
        reference: reference,
        index: faqs.length,
      });
    };

    setError((state) => {
      if (!state[0] && !state[1]) {
        upload();
        setFaqs([
          ...faqs,
          {
            question: question,
            answer: answer,
            reference: reference,
            index: faqs.length,
          },
        ]);
        setQuestion("");
        setAnswer("");
        setReference("");
      }
      return state;
    });
  }

  const [openDelete, setOpenDelete] = useState(false);
  const [deletingFAQ, setDeletingFAQ] = useState(null);

  function deleteFAQ() {
    const upload = async () => {
      await deleteDoc(doc(db, "faq", deletingFAQ.id));
      faqs.splice(faqs.indexOf(deletingFAQ), 1);
      setOpenDelete(false);
      forceUpdate();
    };
    upload();
  }

  function update() {
    setEditing({
      id: editing.id,
      question: editing.question,
      answer: editing.answer,
      reference: editing.reference,
      error: [false, false],
    });

    // validate question
    if (editing.question === "") {
      setEditing((state) => {
        return {
          id: editing.id,
          question: editing.question,
          answer: editing.answer,
          reference: editing.reference,
          error: [true, state.error[1]],
        };
      });
    }

    if (editing.answer === "") {
      setEditing((state) => {
        return {
          id: editing.id,
          question: editing.question,
          answer: editing.answer,
          reference: editing.reference,
          error: [state.error[0], true],
        };
      });
    }

    const upload = async () => {
      await updateDoc(doc(db, "faq", editing.id), {
        question: editing.question,
        answer: editing.answer,
        reference: editing.reference,
      });
    };

    setEditing((state) => {
      if (!state.error[0] && !state.error[1]) {
        upload();
        setFaqs(
          faqs.map((r) => {
            if (r.id === editing.id) {
              return {
                question: editing.question,
                answer: editing.answer,
                reference: editing.reference,
                id: r.id,
                index: r.index,
              };
            } else {
              return r;
            }
          })
        );
        setEditing({ id: null });
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
        <span style={{ color: "gray" }}>/</span> FAQ
      </h1>
      {faqs.map((faq) => {
        if (editing.id === faq.id) {
          return (
            <>
              <br />
              <Divider />
              <br />
              <Box component="form" noValidate autoComplete="off">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <ColoredTextField
                    label="Question"
                    variant="outlined"
                    size="small"
                    value={editing.question}
                    error={editing.error[0]}
                    helperText={
                      editing.error[0] ? "Please enter a question" : ""
                    }
                    onChange={(e) =>
                      setEditing({
                        id: editing.id,
                        question: e.target.value,
                        answer: editing.answer,
                        reference: editing.reference,
                        error: editing.error,
                      })
                    }
                    fullWidth
                    required
                    sx={{ margin: "10px 0 10px 0" }}
                  />
                  <ColoredTextField
                    label="Answer"
                    variant="outlined"
                    size="small"
                    value={editing.answer}
                    error={editing.error[1]}
                    helperText={editing.error[1] ? "Please enter a answer" : ""}
                    onChange={(e) =>
                      setEditing({
                        id: editing.id,
                        question: editing.question,
                        answer: e.target.value,
                        reference: editing.reference,
                        error: editing.error,
                      })
                    }
                    fullWidth
                    multiline
                    minRows={4}
                    required
                    sx={{ margin: "10px 0 10px 0" }}
                  />
                  <ColoredTextField
                    label="Reference"
                    variant="outlined"
                    size="small"
                    value={editing.reference}
                    onChange={(e) =>
                      setEditing({
                        id: editing.id,
                        question: editing.question,
                        answer: editing.answer,
                        reference: e.target.value,
                        error: editing.error,
                      })
                    }
                    fullWidth
                    required
                    sx={{ margin: "10px 0 10px 0" }}
                  />
                  <Button
                    onClick={update}
                    style={{
                      color: "#547c94",
                      borderColor: "#547c94",
                      margin: "10px 0 10px 0",
                      height: "40px",
                    }}
                    variant="outlined"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => setEditing({ id: null })}
                    style={{
                      color: "#547c94",
                      borderColor: "#547c94",
                      margin: "10px 0 10px 10px",
                      height: "40px",
                    }}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                </div>
              </Box>
            </>
          );
        } else {
          return (
            <div style={{ position: "relative" }}>
              <div
                style={{
                  color: "#547c94",
                  position: "absolute",
                  top: "4px",
                  right: "8px",
                }}
              >
                <Tooltip title="Edit">
                  <IconButton
                    onClick={() => {
                      setEditing({
                        id: faq.id,
                        question: faq.question,
                        answer: faq.answer,
                        reference: faq.reference,
                        error: [false, false],
                      });
                    }}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => {
                      setDeletingFAQ(faq);
                      setOpenDelete(true);
                    }}
                  >
                    <DeleteRoundedIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <br />
              <Divider />
              <br />
              <p style={{ fontWeight: "bold" }}>{faq.question}</p>
              <br />
              <p>{faq.answer}</p>
              <br />
              <Reference reference={faq.reference} />
            </div>
          );
        }
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
            error={error[0]}
            helperText={error[0] ? "Please enter a question" : ""}
            onChange={(e) => setQuestion(e.target.value)}
            fullWidth
            required
            sx={{ margin: "10px 0 10px 0" }}
          />
          <ColoredTextField
            label="Answer"
            variant="outlined"
            size="small"
            value={answer}
            error={error[1]}
            helperText={error[1] ? "Please enter a answer" : ""}
            onChange={(e) => setAnswer(e.target.value)}
            fullWidth
            multiline
            minRows={4}
            required
            sx={{ margin: "10px 0 10px 0" }}
          />
          <ColoredTextField
            label="Reference"
            variant="outlined"
            size="small"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            fullWidth
            required
            sx={{ margin: "10px 0 10px 0" }}
          />
          <Button
            onClick={add}
            style={{
              color: "#547c94",
              borderColor: "#547c94",
              margin: "10px 0 10px 0",
              height: "40px",
            }}
            variant="outlined"
          >
            Add
          </Button>
        </div>
      </Box>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. This will permanently delete this FAQ.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDelete(false)}
            variant="outlined"
            style={{ color: "#547c94", borderColor: "#547c94" }}
          >
            Cancel
          </Button>
          <Button onClick={deleteFAQ} variant="outlined" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
