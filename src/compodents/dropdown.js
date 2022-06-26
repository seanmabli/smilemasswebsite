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
      className="dropdowncontainer"
      onMouseEnter={toggling}
      onMouseLeave={toggling}
    >
      <div>{props.title}</div>
      {isOpen && (
        <ul className="dropdownlist">
          {props.options.map((option) => (
            <li className="dropdown" onClick={onOptionClicked(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
