import * as React from "react";
import ReactDOM from "react-dom/client";
import { Button, Menu, MenuItem } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import "./firebase";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.StrictMode>
      <p>smilemass</p>
      <Dropdown />
    </React.StrictMode>
  </>
);


function Dropdown() {
  return (
    <>
    <PopupState variant="popover" popupId="demo-popup-menu" className="navbardropdown">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            About
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Our Mission</MenuItem>
            <MenuItem onClick={popupState.close}>The Staff</MenuItem>
            <MenuItem onClick={popupState.close}>Testimonials</MenuItem>
            <MenuItem onClick={popupState.close}>Accompishments</MenuItem>
            <MenuItem onClick={popupState.close}>Sudbury Accessible Playgrounds</MenuItem>
            <MenuItem onClick={popupState.close}>F. A. Q.</MenuItem>
            <MenuItem onClick={popupState.close}>Contact</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
    <PopupState variant="popover" popupId="demo-popup-menu" className="navbardropdown">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Dashboard
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>Profile</MenuItem>
            <MenuItem onClick={popupState.close}>My account</MenuItem>
            <MenuItem onClick={popupState.close}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
    </>
  );
}
