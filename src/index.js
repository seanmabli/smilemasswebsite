import * as React from "react";
import ReactDOM from "react-dom/client";
import "./firebase/firebase";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <React.Fragment>
      <BrowserRouter>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="site"
            style={
              window.innerWidth > 1250
                ? { minWidth: "1250px" }
                : null
            }
          >
            <Navbar />
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  </>
);
