// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import { useState, useEffect } from "react";

const EOCAccordion = () => {
  const [EOCSets, setEOCSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the EOCs based on the review id.

    const eocs = [
      {
        _id: "123123",
        setNum: 1,
        setName: "Knowledge and Skill Base",
        EOCS: [
          {
            EOCNum: 1,
            desc:
              "Comprehensive, theory based understanding of the underpinning natural and physical sciences and the engineering fundamentals applicable to the engineering discipline.",
          },
          {
            EOCNum: 2,
            desc:
              "Conceptual understanding of the mathematics, numerical analysis, statistics, and computer and information sciences which underpin the engineering discipline",
          },
          {
            EOCNum: 3,
            desc:
              "In-depth understanding of specialist bodies of knowledge within the engineering discipline.",
          },
          {
            EOCNum: 4,
            desc:
              "Discernment of knowledge development and research directions within the engineering discipline.",
          },
          {
            EOCNum: 5,
            desc:
              "Knowledge of engineering design practice and contextual factors impacting the engineering discipline.",
          },
          {
            EOCNum: 6,
            desc:
              "Understanding of the scope, principles, norms, accountabilities and bounds of sustainable engineering practice in the specific discipline.",
          },
        ],
      },
      {
        _id: "11111",
        setNum: 2,
        setName: "Engineering Application Ability",
        EOCS: [
          {
            EOCNum: 1,
            desc:
              "Application of established engineering methods to complex engineering problem solving.",
          },
          {
            EOCNum: 2,
            desc:
              "Fluent application of engineering techniques, tools and resources.",
          },
          {
            EOCNum: 3,
            desc:
              "Application of systematic engineering synthesis and design processes.",
          },
          {
            EOCNum: 4,
            desc:
              "Application of systematic approaches to the conduct and management of engineering projects.",
          },
        ],
      },
      {
        _id: "abc123",
        setNum: 3,
        setName: "Professional and Personal Attributes",
        EOCS: [
          {
            EOCNum: 1,
            desc: "Ethical conduct and professional accountability",
          },
          {
            EOCNum: 2,
            desc:
              "Effective oral and written communication in professional and lay domains",
          },
          {
            EOCNum: 3,
            desc: "Creative, innovative and pro-active demeanour",
          },
          {
            EOCNum: 4,
            desc: "Professional use and management of information",
          },
          {
            EOCNum: 5,
            desc: "Orderly management of self, and professional conduct",
          },
          {
            EOCNum: 6,
            desc: "Effective team membership and team leadership",
          },
        ],
      },
    ];

    setLoading(false);
  }, []);

  return (
    <Card>
      <Accordion>
        <AccordionSummary>Acc</AccordionSummary>
      </Accordion>
    </Card>
  );
};

export default EOCAccordion;
