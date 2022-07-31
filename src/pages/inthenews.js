import "./inthenews.css";
import { NewsButton } from "../components/mui";

export default function InTheNews() {
  return (
    <div className="page">
      <h1>In The News</h1>
      <br />
      <div style={{ display: "flex" }}>
        <div className="newsitem">
          <br />
          <NewsButton
            variant="outlined"
            style={{ color: "#547c94", borderColor: "#547c94" }}
          >
            <p>SMILE Donates Beach Wheelchairs in Connecticut</p>
          </NewsButton>
        </div>
      </div>
    </div>
  );
}
