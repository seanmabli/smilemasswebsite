import * as React from "react";
import ReactDOM from "react-dom/client";
import { Button, Menu, MenuItem } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import "./firebase";

const theme = createTheme({
  palette: {
    primary: {
      main: "#547c94",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Dropdown
          title="About"
          options={[
            "Our Mission",
            "The Staff",
            "Testimonials",
            "Accomplishments",
            "Sudbury Accesible Playgrounds",
            "F. A. Q.",
            "Contact",
          ]}
        />
        <Dropdown
          title="Our Programs"
          options={[
            "Club SMILE Mass",
            "Local Beach Wheelchair Locations",
            "Beach House",
            "Community wihtin a Community",
            "Equipment Loaner Program",
          ]}
        />
        <Dropdown
          title="Get Involved"
          options={["Running Team", "Volunteer"]}
        />
        <Dropdown
          title="News & Events"
          options={["Events", "In The News", "Newsletters", "SMILE Blog"]}
        />
        <Button>Resources</Button>
        <Dropdown
          title="Support"
          options={["Join the Coffee Club", "Donate"]}
          bold={true}
        />
      </ThemeProvider>
    </React.Fragment>
  </>
);

function Dropdown(props) {
  var buttonType = props.bold ? "contained" : "text";
  var buttonStyle = {
    marginLeft: "10px",
    marginRight: "10px",
    paddingBottom: "4px",
  };

  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button
              onMouseOver={popupState.open}
              style={buttonStyle}
              variant={buttonType}
            >
              {props.title}
            </Button>
            <Menu {...bindMenu(popupState)}>
              {props.options.map((option) => (
                <MenuItem onClick={popupState.close}>{option}</MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </>
  );
}
