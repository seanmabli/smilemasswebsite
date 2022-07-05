import { Link } from "react-router-dom";

export default function Accomplishments() {
  return (
    <div className="page">
      <h1>Accomplishments</h1>
      <p>
        It has been ten years since fellow Sudbury resident Susan Brown and I
        co-founded SMILE Mass out of my home on Dudley Road with the mission of
        helping handicap children and their families create happy, healthy
        memories. In that short time, we have had enormous success. Here is a
        brief recap of what we have achieved over the past ten years and where
        we are headed in the near future.
      </p>
      <br />
      <p>
        SMILE Mass was born out of a simple goal – to get a handicap accessible
        swing installed in a playground in Sudbury so that my son, Nicholas,
        would be able to enjoy the park alongside his younger sister and
        friends. That simple goal resonated with the people in our town and
        evolved into a major project to construct a playground that children of
        all abilities could enjoy. Together, we were able to design, fund and
        build the first fully accessible playground in MetroWest in less than a
        year. The SMILE playground adjacent to Haskell Field is now a landmark
        in our community, a destination for families throughout MetroWest and
        greater Boston, and a model for towns across the Commonwealth and
        beyond.
      </p>
      <br />
      <p>
        Building on the success of the SMILE playground project, in 2010, SMILE
        Mass turned its focus towards the beaches of Cape Cod. Our goal was to
        donate a floating beach wheelchair to every public beach on Cape Cod
        that requested one. If you have not witnessed one of these amazing
        chairs in action, <Link to="/localbeachwheelchairlocations">click here</Link> and see firsthand how a chair
        can touch the life of a family simply by providing access to a day at
        the beach. Over the past 9 years, we have donated over 140 floating
        beach wheelchairs to public beaches in Massachusetts, Maine, New
        Hampshire, Vermont and Connecticut as well as established a loaner
        program currently based in Sudbury through which anyone can borrow
        specially designed equipment (beach wheelchairs, adapted bicycles, snow
        sleds, jog strollers etc.) to use for a day or a week, at home or on
        vacation.
      </p>
    </div>
  );
}
