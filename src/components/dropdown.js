import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, ThemeProvider } from "@mui/material";
import { styled, createTheme } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import "../index.css";
import "./dropdown.css";

const NavButton = styled(Button)({
  color: "#547c94",
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  lineHeight: 1.5,
  backgroundColor: "#FFFFFF",
  width: "100%",
  justifyContent: "left",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
});

const theme = createTheme({
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);

  let navigate = useNavigate();

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    navigate(value.toLowerCase().replace(/\s+/g, "").replace("/", ""));
    setIsOpen(false);
  };

  if (props.direction === "left") {
    return (
      <div onMouseEnter={toggling} onMouseLeave={toggling}>
        <NavButton variant="text" style={props.buttonStyle} disableRipple>
          {props.title}
        </NavButton>
        {isOpen && (
          <ul className="dropdowncontent">
            {props.options.map((option) => (
              <li onClick={onOptionClicked(option)}>
                <NavButton
                  variant="text"
                  style={props.dropdownStyle}
                  className="button"
                >
                  {option}
                </NavButton>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  } else {
    return (
      <div onMouseEnter={toggling} onMouseLeave={toggling}>
        <NavButton variant="text" style={props.buttonStyle} disableRipple>
          {props.title}
        </NavButton>
        <div className="rightcontainer">
          {isOpen && (
            <ul className="dropdowncontent rightcontent">
              {props.options.map((option) => (
                <li onClick={onOptionClicked(option)}>
                  <CacheProvider value={cacheRtl}>
                    <ThemeProvider theme={theme}>
                      <div dir="rtl">
                        <NavButton
                          variant="text"
                          style={props.dropdownStyle}
                          className="button"
                        >
                          {option}
                        </NavButton>
                      </div>
                    </ThemeProvider>
                  </CacheProvider>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
