import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Footer } from "../components/footer";

export default function JoinTheCoffeeClub() {
  return (
    <div className="page">
      <h1>Join the Coffee Club</h1>
      <br />
      <p>
        You don’t actually have to drink coffee to join the club. But if you are
        like millions of Americans, you will consume two or more cups of coffee
        a day. Would you donate the cost of one cup of coffee a month to SMILE
        Mass?
      </p>
      <br />
      <p>
        With the continued growth of SMILE Mass, it is vital that we create
        sustainability. That is why your VIP Coffee Club donation of $5 or $10 a
        month is so important to SMILE Mass. It would help us continue the many
        programs we are currently running and it will help us start a
        scholarship fund that will allow us to host low income and at risk
        families so they can enjoy a week at our accessible vacation rental in
        Truro, MA. With your support, we can continue to build a better
        tomorrow, a world without barriers.
      </p>
      <br />
      <Button
        variant="outlined"
        href="https://smilemass.giv.sh/fea2"
        target="_blank"
        style={{ color: "#547c94", borderColor: "#547c94" }}
      >
        Click Here To Join And Help Continue To Grow Our Communities
      </Button>
      <br />
      <p>
        The Coffee Club will help grow some of our supported initiatives such
        as:
      </p>
      <ul className="dashed">
        <li>
          <Link to="/localbeachwheelchairlocations" className="link">
            Beach Wheelchair Program
          </Link>
        </li>
        <li>
          <Link to="/equipmentloanerprogram" className="link">
            Equipment Loaner Program
          </Link>
        </li>
        <li>Scholarship Fund</li>
      </ul>
      <Footer />
    </div>
  );
}
