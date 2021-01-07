// CORE COMPONENTS
import CircularProgress from "@material-ui/core/CircularProgress";

// CUSTOM COMPONENTS
import EOCAccordion from "./EOCAccordion.js";
import Error from "components/Utility/Error";

import { useState, useEffect } from "react";

const getEOCInfo = async (evaluationID) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    evaluationID,
    eocs: [
      {
        _id: "123123",
        setNum: 1,
        setName: "Knowledge and Skill Base",
        EOCS: [
          {
            _id: "aaaaa",
            EOCNum: 1,
            desc:
              "Comprehensive, theory based understanding of the underpinning natural and physical sciences and the engineering fundamentals applicable to the engineering discipline.",
          },
          {
            _id: "aaaaa",
            EOCNum: 2,
            desc:
              "Conceptual understanding of the mathematics, numerical analysis, statistics, and computer and information sciences which underpin the engineering discipline",
          },
          {
            _id: "aaaaa",
            EOCNum: 3,
            desc:
              "In-depth understanding of specialist bodies of knowledge within the engineering discipline.",
          },
          {
            _id: "aaaaa",
            EOCNum: 4,
            desc:
              "Discernment of knowledge development and research directions within the engineering discipline.",
          },
          {
            _id: "aaaaa",
            EOCNum: 5,
            desc:
              "Knowledge of engineering design practice and contextual factors impacting the engineering discipline.",
          },
          {
            _id: "aaaaa",
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
            _id: "aaaaa",
            EOCNum: 1,
            desc:
              "Application of established engineering methods to complex engineering problem solving.",
          },
          {
            _id: "aaaaa",
            EOCNum: 2,
            desc:
              "Fluent application of engineering techniques, tools and resources.",
          },
          {
            _id: "aaaaa",
            EOCNum: 3,
            desc:
              "Application of systematic engineering synthesis and design processes.",
          },
          {
            _id: "aaaaa",
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
            _id: "aaaaa",
            EOCNum: 1,
            desc: "Ethical conduct and professional accountability",
          },
          {
            _id: "aaaaa",
            EOCNum: 2,
            desc:
              "Effective oral and written communication in professional and lay domains",
          },
          {
            _id: "aaaaa",
            EOCNum: 3,
            desc: "Creative, innovative and pro-active demeanour",
          },
          {
            _id: "aaaaa",
            EOCNum: 4,
            desc: "Professional use and management of information",
          },
          {
            _id: "aaaaa",
            EOCNum: 5,
            desc: "Orderly management of self, and professional conduct",
          },
          {
            _id: "aaaaa",
            EOCNum: 6,
            desc: "Effective team membership and team leadership",
          },
        ],
      },
    ],
  };
};

const Justifications = ({ courseID }) => {
  const [loading, setLoading] = useState(true);
  const [EOCInfo, setEOCInfo] = useState({});
  const [error, setError] = useState(false);

  useEffect(async () => {
    try {
      const response = await getEOCInfo(courseID);
      setEOCInfo(response);
      setError(false);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div>
        <CircularProgress />;
      </div>
    );
  }

  if (error) {
    return <Error msg={error.message} />;
  }

  return <EOCAccordion {...EOCInfo} />;
};

export default Justifications;
