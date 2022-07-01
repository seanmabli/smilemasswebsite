import "../index.css";
import "./ourteam.css";
import lottediomede from "../logo/lottediomede.jpg";
import susanbrown from "../logo/susanbrown.jpg";
import { Link } from "react-router-dom";

export default function OurTeam() {
  return (
    <div className="page">
      <h1>Our Team</h1>
      <br />
      <p>
        SMILE Mass was created in 2009 by Lotte Diomede and Susan Brown. The two
        women had worked closely together on the SMILE Sudbury Playground
        Project. Lotte was the Chairperson of SMILE Sudbury and Susan was on the
        fundraising committee. They were so happy with the results of the SMILE
        Sudbury Playgroup Project that they decided to continue to work together
        to continue improving the lives of disabled persons and the people
        around them.
      </p>
      <div>
        <div>
          <img src={lottediomede} />
        </div>
        <div>
          <img src={susanbrown} />
        </div>
      </div>
      <table className="center">
        <tr>
          <td>
            <tr></tr>
            <tr>Lotte Diomede President & Co-Founder</tr>
            <tr>
              <td>617-967-7755</td>
              <td>lotte@smilemass.org</td>
            </tr>
            <tr>
              The co-founder of SMILE Mass works tirelessly to help families
              with disabled members enjoy life a little more.
            </tr>
            <tr>
              <Link to="/lottediomede">Read her story</Link>
            </tr>
          </td>
          <td>
            <tr></tr>
            <tr>Susan Brown Vice President & Co-Founder</tr>
            <tr>
              <td>978-460-7410</td>
              <td>susan@smilemass.org</td>
            </tr>
            <tr>
              This co-founder of SMILE Mass works tirelessly to help raise funds
              for both phases of our dream.
            </tr>
            <tr>
              <Link to="/susanbrown">Read her story</Link>
            </tr>
          </td>
        </tr>
      </table>
    </div>
  );
}
