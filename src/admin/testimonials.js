import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { useNavigate } from "react-router";
import {
  Button,
  Divider,
  Tooltip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MobileStepper,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { ColoredTextField } from "../components/mui";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material/";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([{ name: "No file chosen" }]);
  const [imageNames, setImageNames] = useState(["No file chosen"]);
  const [downloadURLs, setDownloadURLs] = useState([]);
  const [error, setError] = useState(false);
  const [run, setRun] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editingContent, setEditingContent] = useState("");
  const [editingImages, setEditingImages] = useState([
    { name: "No file chosen" },
  ]);
  const [editingImageNames, setEditingImageNames] = useState([
    "No file chosen",
  ]);
  const [editingDownloadURLs, setEditingDownloadURLs] = useState([]);
  const [editingError, setEditingError] = useState(false);
  const [editingRun, setEditingRun] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getTestimonials = async () => {
      const data = await getDocs(collection(db, "testimonials"));
      setTestimonials(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getTestimonials();
  }, []);

  testimonials.sort(function (first, second) {
    return first.index - second.index;
  });

  function addTestimonial() {
    if (content === "") {
      setError(true);
      return;
    } else {
      setError(false);
      setRun(true);

      if (images[0].type === undefined) {
        setImages([]);
        return;
      } else {
        const uploadImages = async () => {
          Array.from(images).forEach(async (image) => {
            if (image.name !== "No file chosen") {
              const imageRef = ref(
                storage,
                `testimonials/${Math.round(
                  Math.random() * 10000000000
                ).toString()}`
              );
              uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                  setDownloadURLs((prev) => [...prev, url]);
                });
              });
            }
          });
        };
        uploadImages();
      }
    }
  }

  const [openDeletingResponse, setOpenDeletingResponse] = useState(false);
  const [deletingResponse, setDeletingResponse] = useState({});

  function deleteTestimonial() {
    for (let i = 0; i < deletingResponse.imageurls.length; i++) {
      deleteObject(ref(storage, deletingResponse.imageurls[i]));
    }
    const upload = async () => {
      await deleteDoc(doc(db, "testimonials", deletingResponse.id));
      setOpenDeletingResponse(false);
      setTestimonials(testimonials.filter((r) => r.id !== deletingResponse.id));
    };
    upload();
  }

  function updateTestimonial() {
    if (editingContent === "") {
      setEditingError(true);
      return;
    } else {
      setEditingError(false);

      if (editingImages[0].type !== undefined) {
        for (let i = 0; i < testimonials.length; i++) {
          if (testimonials[i].id === editingId) {
            for (let j = 0; j < testimonials[i].imageurls.length; j++) {
              deleteObject(ref(storage, testimonials[i].imageurls[j]));
            }
          }
        }

        const uploadImages = async () => {
          Array.from(editingImages).forEach(async (image) => {
            if (image.name !== "No file chosen") {
              const imageRef = ref(
                storage,
                `testimonials/${Math.round(
                  Math.random() * 10000000000
                ).toString()}`
              );
              uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                  setEditingDownloadURLs((prev) => [...prev, url]);
                });
              });
            }
          });
        };

        setEditingRun(true);
        uploadImages();
      } else {
        const upload = async () => {
          await updateDoc(doc(db, "testimonials", editingId), {
            content: editingContent,
          });

          setTestimonials(
            testimonials.map((r) => {
              if (r.id === editingId) {
                return { ...r, content: editingContent };
              }
              return r;
            })
          );

          setEditing(false);
          setEditingContent("");
          setEditingId("");
          setEditingError(false);
          setEditingImages([]);
          setEditingImageNames([]);
        };
        upload();
      }
    }
  }

  function getImageNames(images) {
    setImageNames([]);
    for (let i = 0; i < images.length; i++) {
      setImageNames((prev) => [...prev, images[i].name]);
    }
  }

  function getEditingImageNames(images) {
    setEditingImageNames([]);
    for (let i = 0; i < images.length; i++) {
      setEditingImageNames((prev) => [...prev, images[i].name]);
    }
  }

  if (downloadURLs.length === images.length && run) {
    const upload = async () => {
      const id = await addDoc(collection(db, "testimonials"), {
        content: content,
        index: testimonials.length,
        imageurls: downloadURLs,
        imagenames: imageNames,
      });
      testimonials.push({
        content,
        id: id.id,
        index: testimonials.length,
        imageurls: downloadURLs,
      });
      setContent("");
      setImages([{ name: "No file chosen" }]);
      setImageNames(["No file chosen"]);
      setDownloadURLs([]);
    };
    upload();
    setRun(false);
  }

  if (editingDownloadURLs.length === editingImages.length && editingRun) {
    const upload = async () => {
      await updateDoc(doc(db, "testimonials", editingId), {
        content: editingContent,
        imageurls: editingDownloadURLs,
        imagenames: editingImageNames,
      });

      setTestimonials(
        testimonials.map((r) => {
          if (r.id === editingId) {
            return {
              ...r,
              content: editingContent,
              imageurls: editingDownloadURLs,
              imagenames: editingImageNames,
            };
          }
          return r;
        })
      );

      setEditing(false);
      setEditingContent("");
      setEditingId("");
      setEditingError(false);
      setEditingImages([]);
      setEditingImageNames([]);
      setEditingDownloadURLs([]);
    };
    upload();
    setEditingRun(false);
  }

  console.log(editingImageNames);

  function ImageAndTestimonial(props) {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = props.imageurls.length;

    if (props.imageurls.length > 1) {
      return (
        <div className="multiImage">
          <div style={{ width: "100%", margin: "0px" }}>
            <AutoPlaySwipeableViews
              index={activeStep}
              onChangeIndex={(index) => setActiveStep(index)}
              style={{ display: "flex", alignItems: "center" }}
              enableMouseEvents
            >
              {props.imageurls.map((step, index) => (
                <>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <img
                      style={{
                        width: "100%",
                      }}
                      src={step}
                      alt="testimonials"
                    />
                  ) : null}
                </>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeStep}
              sx={{
                width: "100%",
                padding: "8px 0 0 0",
              }}
              nextButton={
                <Button
                  size="small"
                  onClick={() =>
                    setActiveStep((prevActiveStep) => prevActiveStep + 1)
                  }
                  disabled={activeStep === maxSteps - 1}
                  sx={{ color: "#547c94" }}
                >
                  Next
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={() =>
                    setActiveStep((prevActiveStep) => prevActiveStep - 1)
                  }
                  disabled={activeStep === 0}
                  sx={{ color: "#547c94" }}
                >
                  <KeyboardArrowLeft />
                  Back
                </Button>
              }
            />
          </div>
          <p style={{ whiteSpace: "pre-wrap" }}>{props.content}</p>
        </div>
      );
    } else if (props.imageurls.length === 1) {
      return (
        <div className="singleImage">
          <img
            src={props.imageurls[0]}
            alt="testimonial"
            style={{ width: "100%" }}
          />
          <p style={{ whiteSpace: "pre-wrap" }}>{props.content}</p>
        </div>
      );
    } else {
      return <p style={{ whiteSpace: "pre-wrap" }}>{props.content}</p>;
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
        <span style={{ color: "gray" }}>/</span> Testimonials
      </h1>
      {testimonials.map((testimonial) => {
        if (editing && editingId === testimonial.id) {
          return (
            <div key={testimonial.id}>
              <br />
              <Divider />
              <br />
              <ColoredTextField
                label="Testimonial"
                variant="outlined"
                size="small"
                placeholder={editingContent}
                value={editingContent}
                error={editingError}
                helperText={editingError ? "Please enter a testimonial" : ""}
                onChange={(e) => setEditingContent(e.target.value)}
                fullWidth
                required
                multiline
              />
              <div style={{ display: "flex", marginTop: "20px" }}>
                <Button
                  variant="outlined"
                  component="label"
                  style={{
                    color: "#547c94",
                    borderColor: "#547c94",
                    height: "40px",
                  }}
                >
                  Upload Images
                  <input
                    type="file"
                    onChange={(event) => {
                      if (event.target.files !== []) {
                        setEditingImages(event.target.files);
                        getEditingImageNames(event.target.files);
                      }
                    }}
                    hidden
                    multiple
                  />
                </Button>
                <p>&nbsp;&nbsp;{editingImageNames.join(", ")}</p>
              </div>
              <div style={{ display: "flex" }}>
                <Button
                  onClick={updateTestimonial}
                  style={{
                    color: "#547c94",
                    borderColor: "#547c94",
                    marginTop: "20px",
                    height: "40px",
                  }}
                  variant="outlined"
                >
                  Update
                </Button>
                <Button
                  onClick={() => setEditing(false)}
                  style={{
                    color: "#547c94",
                    borderColor: "#547c94",
                    marginTop: "20px",
                    marginLeft: "20px",
                    height: "40px",
                  }}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </div>
            </div>
          );
        } else {
          return (
            <div key={testimonial.id}>
              <br />
              <Divider />
              <br />
              <div style={{ position: "relative", display: "flex" }}>
                <div
                  style={{
                    color: "#547c94",
                    position: "absolute",
                    top: "0px",
                    right: "0px",
                  }}
                >
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={() => {
                        setEditing(true);
                        setEditingId(testimonial.id);
                        setEditingContent(testimonial.content);
                        setEditingImageNames(testimonial.imagenames);
                      }}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => {
                        setOpenDeletingResponse(true);
                        setDeletingResponse(testimonial);
                      }}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <ImageAndTestimonial
                  imageurls={testimonial.imageurls}
                  content={testimonial.content}
                />
              </div>
            </div>
          );
        }
      })}
      <br />
      <Divider />
      <br />
      <ColoredTextField
        label="Testimonial"
        variant="outlined"
        size="small"
        value={content}
        error={error}
        helperText={error ? "Please enter a testimonial" : ""}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        required
        multiline
        minRows={4}
      />
      <div style={{ display: "flex", marginTop: "20px" }}>
        <Button
          variant="outlined"
          component="label"
          style={{ color: "#547c94", borderColor: "#547c94", height: "40px" }}
        >
          Upload Images
          <input
            type="file"
            onChange={(event) => {
              if (event.target.files !== []) {
                setImages(event.target.files);
                getImageNames(event.target.files);
              }
            }}
            hidden
            multiple
          />
        </Button>
        <p>&nbsp;&nbsp;{imageNames.join(", ")}</p>
      </div>
      <Button
        onClick={addTestimonial}
        style={{
          color: "#547c94",
          borderColor: "#547c94",
          marginTop: "20px",
          height: "40px",
        }}
        variant="outlined"
      >
        Submit
      </Button>
      <Dialog
        open={openDeletingResponse}
        onClose={() => setOpenDeletingResponse(false)}
      >
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. This will permanently delete this
            sponsor.
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
          <Button onClick={deleteTestimonial} variant="outlined" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
