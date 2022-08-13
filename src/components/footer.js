import { useState, useEffect, useReducer } from "react";
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
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { ColoredTextField } from "../components/mui";

import "./footer.css";

export function Footer() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const getResponses = async () => {
      const data = await getDocs(collection(db, "sponsors"));
      setResponses(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getResponses();
  }, []);

  responses.sort(function (first, second) {
    return first.name.localeCompare(second.name);
  });
  
  return (
    <div className="page">
      <Divider />
      <br />
      <p>Special Thanks To Our Sponsors:</p>
      <div className="sponsorscontainer">
        {responses.map((response) => {
          return (
            <div className="sponsor">
              <img
                src={response.imageurl}
                alt={response.name}
                href={response.url}
                className="sponsorimage"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
