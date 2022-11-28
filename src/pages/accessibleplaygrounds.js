
import haskell from "../images/accessibleplaygrounds/haskell.webp";
import haynes from "../images/accessibleplaygrounds/haynes.webp";
import noyes from "../images/accessibleplaygrounds/noyes.webp";
import nixon from "../images/accessibleplaygrounds/nixon.webp";
import loring from "../images/accessibleplaygrounds/loring.webp";
import jones from "../images/accessibleplaygrounds/jones.webp";
import "./accessibleplaygrounds.css";

export function AccessiblePlaygrounds() {
  function Playground(props) {
    return (
      <div id={props.name} className="accessibleplaygroundscontainer">
        <img
          src={props.image}
          alt={props.name}
          className="accessibleplaygroundsimage"
        />
        <div className="accessibleplaygroundstext">
          <h2 style={{ color: "black" }}>{props.name}</h2>
          <p style={{ color: "black" }}>{props.town}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Accessible Playgrounds</h1>
      <br />
      <p>
        SMILE Mass renovated the Haskell Field Playground in Sudbury to become
        the 1st fully accessible playground in Metrowest. We are currently
        working with Play Sudbury to update the playgrounds at all four of the
        Sudbury elementary schools. For more information on the school
        playgrounds, please visit{" "}
        <a href="http://www.playsudbury.com/">http://www.playsudbury.com/</a>
      </p>
      <br />
      <p>
        When one member of a family is disabled, it usually limits the entire
        family from using the play area. The SMILE Sudbury Playground Project
        Committee made it possible for all friends and family members to enjoy
        the playground together. The goal of the SMILE — Simple Mobility in a
        Learning Environment — Sudbury Playground Project was to create the
        first accessible playground for the Metrowest community. This initiative
        came about when Lotte Diomede, a Sudbury resident with a child with
        multiple disabilities, became aware of the limitations placed on the
        handicapped when trying to access the parks and play areas in Sudbury.
        Lotte went to the town and asked for a handicap swing. Being that town
        funds were scarce during the fiscal year. Lotte and Dennis Mannone,
        Sudbury’s Park and Recreation Director at the time, worked together to
        obtain a grant from Boundless Playgrounds. The $125,000 grant covered
        the initial expenses for the playground area. But more fundraising was
        needed to complete all of the renovations. The SMILE Sudbury Playground
        Project Committee was created and took on the responsibility for
        creating public awareness of the project. They involved the community in
        the development and creation of the playground and raised the additional
        funds needed to complete the project. The end result is a beautiful and
        award-winning playground.
      </p>
      <br />
      <p>
        Sudbury now has a completely accessible play area that allows anyone
        with disabilities to be a part of a community area and develop
        physically, socially and emotionally. Children and young people without
        disabilities now have an opportunity to develop tolerance, awareness,
        and compassion for others in a fun and socially positive atmosphere.
        Other communities have taken notice and we are now helping Acton and
        Hudson to create similar playgrounds.{" "}
      </p>
      <br />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Playground name="Haskell Field" town="Sudbury" image={haskell} />
        <Playground
          name="Josiah Haynes Elementary School"
          town="Sudbury"
          image={haynes}
        />
        <Playground
          name="Peter Noyes Elementary School"
          town="Sudbury"
          image={noyes}
        />
        <Playground
          name="General John Nixon Elementary School"
          town="Sudbury"
          image={nixon}
        />
        <Playground
          name="Israel Loring Elementary School"
          town="Sudbury"
          image={loring}
        />
        <Playground name="Jones Field Playground" town="Acton" image={jones} />
      </div>
      
    </div>
  );
}
