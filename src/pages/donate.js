import { Footer } from "../components/footer";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Donate() {
  return (
    <div className="page">
      <h1>Donate</h1>
      <br />
      <p>
        SMILE Mass has set ambitious goals, and we need your help! With your
        past support, we have established 5 projects. Click on each to learn
        more and donate to these worthy causes.
      </p>
      <br />
      <ul className="dashed">
        <li>
          <Link to="/clubsmilemass">Club SMILE Mass</Link>
        </li>
        <li>
          <Link to="/beachwheelchairlocations">Beach Wheelchair</Link>
        </li>
        <li>
          <Link to="/beachhouse">Beach House</Link>
        </li>
        <li>
          <Link to="/equiptmentloanerprogram">Equiptment Loaner Program</Link>
        </li>
        <li>
          <Link to="/accessibleplaygrounds">Accessible Playgrounds</Link>
        </li>
      </ul>
      <br />
      <p>
        We hope you will consider supporting SMILE Mass with a tax-deductible
        gift. A donation of any denomination will make a tangible difference.
        Please do not hesitate to{" "}
        <Link to="/contact">
          contact us directly if you are interested in learning more about our
          organization, our projects or ways to contribute.
        </Link>
      </p>
      <br />
      <Button
        variant="outlined"
        href="https://smilemass.giv.sh/a082"
        target="_blank"
        style={{ color: "#547c94", borderColor: "#547c94" }}
      >
        Donate to SMILE Mass
      </Button>
      
    </div>
  );
}
