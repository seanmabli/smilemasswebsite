import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { CardActionArea } from "@mui/material";
import { styled } from "@mui/material/styles";

const SponsorshipsCardActionArea = styled(CardActionArea)({
  margin: "10px",
  padding: "10px",
  width: "300px",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: "5px",
  justifyContent: "left",
});

export function Sponsorships() {
  return (
    <div className="page">
      <h1>Sponsorships</h1>
      <br />
      <h2>Community / Race</h2>
      <br />
      <p>
        Your annual sponsorship helps SMILE Mass purchase much needed equipment
        for the loaner program, adding addition wheelchairs to the Beach
        Wheelchair program, provides scholarships to those in need and much
        more. We value your partnership and look forward to another incredible
        year.
      </p>
      <br />
      <div style={{ display: "flex" }}>
        <SponsorshipsCardActionArea>
          <h2>$250 Supporter Sponsor</h2>
          <br />
          <ul className="dashed">
            <li>Promotional material in swag bag</li>
            <li>Business name of race t-shirts</li>
            <li>Inclusion in sponsor list on website</li>
          </ul>
        </SponsorshipsCardActionArea>
        <SponsorshipsCardActionArea>
          <h2>$500 Patron Sponsor</h2>
          <br />
          <ul className="dashed">
            <li>Feather flag at mile markers for Gobble Wobble race</li>
            <li>Inclusion on social media sponsor posts</li>
            <li>Promotional material in swag bag</li>
            <li>Business name of race t-shirts</li>
            <li>Inclusion in sponsor list on website</li>
          </ul>
        </SponsorshipsCardActionArea>
        <SponsorshipsCardActionArea>
          <h2>$1,000 Angel Sponsor</h2>
          <br />
          <ul className="dashed">
            <li>Banner at local race</li>
            <li>Table at race</li>
            <li>Feather flag at mile markers for Gobble Wobble race</li>
            <li>Inclusion on social media sponsor posts</li>
            <li>Promotional material in swag bag</li>
            <li>Business name of race t-shirts</li>
            <li>Inclusion in sponsor list on website</li>
          </ul>
        </SponsorshipsCardActionArea>
      </div>
      <h2>Corporate</h2>
      <br />
      <p>
        Our goal is to open a new accessible facility in the Metrowest area that
        will be a place for all to enjoy indoor and outdoor recreational
        opportunities. To bring this to life, we must raise $2.5 Million and
        every penny of our corporate sponsorships will help us get there.
      </p>
      <br />
      <div style={{ display: "flex" }}>
        <SponsorshipsCardActionArea href="https://smilemass.giv.sh/067d">
          <h2>$1,500 Arts Sponsor</h2>
          <br />
          <ul className="dashed">
            <li>Signage at art station and at art themed events</li>
            <li>Featured sponsor in newsletter for Art content</li>
            <li>Name on brick at facility</li>
            <li>Inclusion in sponsor list on website</li>
          </ul>
        </SponsorshipsCardActionArea>
        <SponsorshipsCardActionArea href="https://smilemass.giv.sh/f15c">
          <h2>$2,500 Recreation Sponsor</h2>
          <br />
          <ul className="dashed">
            <li>Mini-signage on equipment</li>
            <li>
              Social media sponsor inclusion in monthly recreation/outing posts
            </li>
            <li>Featured sponsor in newsletter</li>
            <li>Name on brick at facility</li>
            <li>Inclusion in sponsor list on website</li>
          </ul>
        </SponsorshipsCardActionArea>
        <SponsorshipsCardActionArea href="https://smilemass.giv.sh/b1ff">
          <h2>$5,000 Equipment Sponsor</h2>
          <br />
          <ul className="dashed">
            <li>Signage at equipment storage</li>
            <li>
              Social media sponsor for equipment video testimonials from team
              highlighting new equipment and community members
            </li>
            <li>Feature sponsor in newsletter for recreation/outings</li>
            <li>Name on brick at facility</li>
            <li>Inclusion in sponsor list on website</li>
          </ul>
        </SponsorshipsCardActionArea>
        <SponsorshipsCardActionArea href="https://smilemass.giv.sh/e079">
          <h2>$10,000 Pavillion Sponsor</h2>
          <br />
          <ul className="dashed">
            <li>Permanent signage at Pavillion</li>
            <li>Inclusion in Grand Opening signage & marketing materials</li>
            <li>Social media sponsor for Club updates</li>
            <li>Feature sponsor in newsletter</li>
            <li>Name on brick at facility</li>
            <li>Inclusion in sponsor list on website</li>
          </ul>
        </SponsorshipsCardActionArea>
      </div>
    </div>
  );
}
