import { Link } from "react-router-dom";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
import { Footer } from "../components/footer";

export default function Accomplishments() {
  return (
    <div className="page">
      <h1>Accomplishments</h1>
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
        Mass turned its focus towards the beaches of Cape Cod. Our initial goal
        was to donate a floating beach wheelchair to every public beach on Cape
        Cod that requested one. That goal has grown and over the years, we have
        donated over 150 floating beach wheelchairs to public beaches in
        Massachusetts, Maine, New Hampshire, Vermont and Connecticut as well as
        established a loaner program currently based in Sudbury through which
        anyone can borrow specially designed equipment (beach wheelchairs,
        adapted bicycles, snow sleds, jog strollers etc.) to use for a day or a
        week, at home or on vacation.
      </p>
      <br />
      <p>
        In 2018, we acquired a town house in Truro, MA and transformed it into a
        fully accessible, vacation rental on Cape Cod! Finding the right
        facilities that are actually fully handicapped accessible with all the
        right amenities can be extremely difficult for people with mobility or
        other severe disabilities. If found, these facilities often come with
        many extra fees that make it difficult for many families to afford. The
        SMILE Mass vacation home has been designed to accommodate people with a
        wide range of disabilities, with financial assistance provided to those
        who qualify.
      </p>
      <br />
      <p>
        We are now turning our sights to our next big project, creating a{" "}
        <Link to="/communitywithinacommunity">
          Community within a Community
        </Link>{" "}
        for Club SMILE Mass! This project will bring together our entire program
        in one fully accessible location. Our focus is to raise funds to
        purchase a facility and accessible grounds for all of our families to
        enjoy. We will eventually host all classes and events at the new
        facility and it will be home to the entire SMILE Mass community.
      </p>
      <br />
      <p>
        I hope you will consider continuing to support SMILE Mass with a
        tax-deductible gift. A donation of any denomination will make a tangible
        difference – whether it means purchasing new equipment for our loaner
        program or funding the construction of a room at the Community within a
        Community project. Please do not hesitate to contact us if you are
        interested in learning more about our organization, our projects or ways
        to contribute.
      </p>
      <br />
      <h2>Timeline of Our Accomplishments</h2>
      <br />
      <Timeline
        sx={{
          "& .MuiTimelineItem-root:before": {
            flex: 0,
          },
        }}
      >
        <TimelineItemSimpleWithYear year="2022">
          Earnestly searching for the right property to purchase to host Club
          SMILE Mass, our fastest growing program to date.
        </TimelineItemSimpleWithYear>
        <TimelineItemSimple>
          Running Ragnar Relay Cape Cod and the Falmouth Road Race with
          children/young adults with disabilities.
        </TimelineItemSimple>
        <TimelineItemSimpleWithYear year="2021">
          Updating the playground at the Loring Elementary Playground in
          Sudbury, MA to make it accessible to all students was delayed due to
          supply chain issues.
        </TimelineItemSimpleWithYear>
        <TimelineItemSimple>
          Club SMILE Mass expanded to include in-person work out classes in the
          spring at Get In Shape For Women. In the fall, Club SMILE Mass moved
          to Life Time Metrowest where we offer in person workout classes and
          swim classes. 9 zoom classes are offered each week.
        </TimelineItemSimple>
        <TimelineItemSimple>
          Ran in Ragnar Relay New England and the Falmouth Road Race with
          children/young adults with disabilities.
        </TimelineItemSimple>
        <TimelineItemSimpleWithYear year="2020">
          Updated the playground at the Nixon Elementary School in Sudbury, MA
          to make it accessible to all students.
        </TimelineItemSimpleWithYear>
        <TimelineItemSimple>
          Began Club SMILE Mass as 21 zoom classes offered during pandemic each
          week. In the fall, we were able to offer some socially distant outdoor
          music and story time classes. As schools resumed, our zoom offerings
          were reduced to offer after school times only.
        </TimelineItemSimple>
        <TimelineItemSimple>
          Ran virtual Ragnar Relay and virtual Falmouth Road Race.
        </TimelineItemSimple>
        <TimelineItemSimpleWithYear year="2019">
          Updated the playground at the Peter Noyes Elementary School in
          Sudbury, MA to make it accessible to all students.
        </TimelineItemSimpleWithYear>
        <TimelineItemSimple>
          Placed floating beach wheelchairs in 3 towns in CT, 1 in VT.
        </TimelineItemSimple>
        <TimelineItemSimple>
          Ran in Ragnar Relay Cape Cod and the Falmouth Road Race with
          children/young adults with disabilities.
        </TimelineItemSimple>
        <TimelineItemSimpleWithYear year="2018">
          Acquired a townhouse in Truro, MA on Cape Cod and transformed it into
          an accessible vacation rental giving families raising children and
          adults with disabilities the opportunity to enjoy a beach vacation
          with all the right amenities (such as a roll in shower, floating beach
          wheelchair and more).
        </TimelineItemSimpleWithYear>
        <TimelineItemSimple>
          Ran in the Iceland Marathon with children/young adults with
          disabilities.
        </TimelineItemSimple>
        <TimelineItemSimple>
          ​ Doing business as PlaySudbury, updated the playground at the Haynes
          Elementary School in Sudbury, MA to make it accessible to all
          students.
        </TimelineItemSimple>
        <TimelineItemSimpleWithYear year="2017">
          Placed floating beach wheelchairs on Martha’s Vineyard, Nantucket, New
          Hampshire and Maine.
        </TimelineItemSimpleWithYear>
        <TimelineItemSimple>
          Ran in the Ragnar Relay Cape Cod and the Falmouth Road Race with
          children/young adults with disabilities.
        </TimelineItemSimple>
        <TimelineItemSimpleWithYear year="2016">
          Placed a floating beach wheelchair in Tuscany, Italy.
        </TimelineItemSimpleWithYear>
        <TimelineItemSimple>
          Took 3 kids/young adults to the Copenhagen Marathon using the
          additional high performance running strollers, in addition to the
          Ragnar Relay Cape Cod and the Falmouth Road Race.
        </TimelineItemSimple>
        <TimelineItemSimple>
          Donated over 100 floating beach wheelchairs to public beaches in
          Massachusetts, with the majority located on Cape Cod Summer since
          2012.
        </TimelineItemSimple>
        <TimelineItemSimpleWithYear year="2015">
          Expanded Equipment Loaner Program which now includes: 10 floating
          beach wheelchairs, 5 jogging strollers, 5 high performance strollers,
          1 kick sled and 2 adapted bicycles.
        </TimelineItemSimpleWithYear>
        <TimelineItemSimpleWithYear year="2014">
          Expanded Equipment Loaner Program to include 6 floating beach
          wheelchairs, 5 jogging strollers, 2 high performance stroller, 1 kick
          sled and 2 adapted bicycles.
        </TimelineItemSimpleWithYear>
        <TimelineItemSimpleWithYear year="2013">
          Piloted the Equipment Loaner Program with 3 floating beach
          wheelchairs.
        </TimelineItemSimpleWithYear>
        <TimelineItemSimpleWithYear year="2010">
          Incorporated SMILE Mass as a new non-profit to expand out of Sudbury
        </TimelineItemSimpleWithYear>
        <TimelineItem>
          <TimelineOppositeContent
            variant="body2"
            sx={{
              flex: 0,
              color: "#547c94",
              marginTop: "2px",
              marginRight: "5px",
            }}
          >
            <div style={{ width: "20px" }}>2009</div>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ backgroundColor: "#547c94" }} />
          </TimelineSeparator>
          <TimelineContent>
            <p>
              Ribbon Cutting for the SMILE Sudbury fully handicapped accessible
              playground
            </p>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      <Footer />
    </div>
  );
}

const TimelineItemSimple = (props) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent
        variant="body2"
        color="text.secondary"
        sx={{ flex: 0 }}
      >
        <div style={{ width: "25px" }} />
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <p>{props.children}</p>
      </TimelineContent>
    </TimelineItem>
  );
};

const TimelineItemSimpleWithYear = (props) => {
  return (
    <TimelineItem>
      <TimelineOppositeContent
        variant="body2"
        sx={{ flex: 0, color: "#547c94", marginTop: "2px", marginRight: "5px" }}
      >
        <div style={{ width: "20px" }}>{props.year}</div>
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot sx={{ backgroundColor: "#547c94" }} />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <p>{props.children}</p>
      </TimelineContent>
    </TimelineItem>
  );
};
