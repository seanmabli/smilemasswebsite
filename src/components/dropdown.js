import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../index.css";
import "./dropdown.css";

export default function Dropdown(props) {
  const [isOpen, setIsOpen] = useState(false);

  let navigate = useNavigate();

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    navigate(value.toLowerCase().replace(/\s+/g, ""));
    setIsOpen(false);
  };

  return (
    <div
      onMouseEnter={toggling}
      onMouseLeave={toggling}
    >
      <a className="button" style={props.buttonStyle}>{props.title}</a>
      {isOpen && (
        <ul className="dropdowncontent">
          {props.options.map((option) => (
            <li
              className="button"
              onClick={onOptionClicked(option)}
              style={props.dropdownStyle}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
