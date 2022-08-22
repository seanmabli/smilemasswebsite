import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
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

export default function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);

  let navigate = useNavigate();

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    navigate(value.toLowerCase().replace(/\s+/g, "").replace("/", ""));
    setIsOpen(false);
  };

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
}
