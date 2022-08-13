import * as React from "react";
import ReactDOM from "react-dom/client";
import "./firebase/firebase";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/navbar";
import { Footer } from "./components/footer";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <React.Fragment>
      <BrowserRouter>
        <div>
          <div className="site">
            <Navbar />
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </React.Fragment>
  </>
);
