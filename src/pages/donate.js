import { Footer } from "../components/footer";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Donate() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1>Donate</h1>
      <br />
      <p>
        SMILE Mass has set ambitious goals, and we need your help! With your
        past support, we have established 6 projects. Click on each to learn
        more and donate to these worthy causes.
      </p>
      <br />
      <ul className="dashed">
        <li><Link to="/beachwheelchairlocations">Beach Wheelchair</Link></li>
        <li>Accessible Playgrounds</li>
        <li>Beach House</li>
        <li>Adapted Gym</li>
        <li>Loaner Program</li>
      </ul>
      <br />
      <p>
        I hope you will consider supporting SMILE Mass with a tax-deductible
        gift. A donation of any denomination will make a tangible difference.
        Please do not hesitate to{" "}
        <Link to="/contact">
          contact us directly if you are interested in learning more about our
          organization, our projects or ways to contribute.
        </Link>
      </p>
      <br />
      <p>
        You can shop at Amazon and automatically donate a percentage of your
        cart to SMILE Mass.
      </p>
      <Footer />
    </div>
  );
}
