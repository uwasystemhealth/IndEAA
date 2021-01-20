import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// CORE COMPONENTS
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import CustomTabs from "components/MaterialKit/CustomTabs/CustomTabs.js";

// Use own components
import ReviewProgress from "components/reviewer/ReviewProgress";
import ReviewerPageCardDescription from "components/reviewer/ReviewerPageCardDescription";
import ReviewerPageBottomNavigation from "components/reviewer/ReviewerPageBottomNavigation";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { services } from "store/feathersClient";

//Styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/loginPage.js";
const useStyles = makeStyles(styles);

import { getOrCreateReview, updateCurrentlyBeingViewedCourse} from "utils";

const ReviewerCourseReviewPage1 = () => {
  const router = useRouter();
  const { courseID } = router.query;

  const reviewState = useSelector((state) => state.review);
  const review = reviewState.queryResult.data[0] || { course_id: courseID };
  const authUser = useSelector((state) => state.auth.user);

  // Fetch Review dependent on AuthUser and when the Review fetched matches the course route
  // If it cannot find it, then create it
  // Executes on Component Remount (after auth user is fetched)
  useEffect(() => {
    // Only Call when authUser is now defined
    if (authUser && (reviewState.queryResult.total<=0 || review.course_id !== courseID)) {
      getOrCreateReview(courseID, authUser._id);
      updateCurrentlyBeingViewedCourse(courseID)
    }
  }, [authUser]);

  const classes = useStyles();
  const handleSubmit = () => {
    // Update the Review Process when has been read
    if (!review.step1DevelopmentLevels) {
      services.review.patch(review._id, {
        step1DevelopmentLevels: true,
      });
    }
  };

  const pageNumber = 1

  return (
    <div>
      <ReviewProgress review={review}></ReviewProgress>
      <ReviewerPageCardDescription pageNumber={pageNumber}></ReviewerPageCardDescription>
      <EOCDescriptionAccordions></EOCDescriptionAccordions>
      <ReviewerPageBottomNavigation
        pageNumber={pageNumber}
        course_id={courseID}
        handleSubmit={handleSubmit}
      ></ReviewerPageBottomNavigation>
    </div>
  );
};

const EOCDescriptionAccordions = () => {
  const [eocs, setEocs] = useState(() => getEOCInfo());

  // This is a copy of the coordinator/EOCAccordion (modified)
  // This needs to be refactored later on
  // Ideally the aggreed upon

  const classes = useStyles();

  return (
    <>
      {eocs.map((eocSet) => (
        <Accordion key={eocSet.setNum}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            EOC {eocSet.setNum}: {eocSet.setName}
          </AccordionSummary>
          <AccordionDetails>
            <CustomTabs
              headerColor="primary"
              tabs={eocSet.EOCS.map((eoc) => ({
                tabName: `EOC ${eocSet.setNum}.${eoc.EOCNum}`,
                tabContent: (
                  <div>
                    <h4 className={classes.title}>{eocSet.setName}</h4>
                    {eoc.desc}
                  </div>
                ),
              }))}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

// TODO Remove this once obtained the EOC info
const getEOCInfo = (evaluationID) => {
  return [
    {
      _id: "1",
      setNum: 1,
      setName: "Knowledge and Skill Base",
      EOCS: [
        {
          _id: "2",
          EOCNum: 1,
          desc:
            "Comprehensive, theory based understanding of the underpinning natural and physical sciences and the engineering fundamentals applicable to the engineering discipline.",
        },
        {
          _id: "3",
          EOCNum: 2,
          desc:
            "Conceptual understanding of the mathematics, numerical analysis, statistics, and computer and information sciences which underpin the engineering discipline",
        },
        {
          _id: "4",
          EOCNum: 3,
          desc:
            "In-depth understanding of specialist bodies of knowledge within the engineering discipline.",
        },
        {
          _id: "5",
          EOCNum: 4,
          desc:
            "Discernment of knowledge development and research directions within the engineering discipline.",
        },
        {
          _id: "6",
          EOCNum: 5,
          desc:
            "Knowledge of engineering design practice and contextual factors impacting the engineering discipline.",
        },
        {
          _id: "7",
          EOCNum: 6,
          desc:
            "Understanding of the scope, principles, norms, accountabilities and bounds of sustainable engineering practice in the specific discipline.",
        },
      ],
    },
    {
      _id: "8",
      setNum: 2,
      setName: "Engineering Application Ability",
      EOCS: [
        {
          _id: "9",
          EOCNum: 1,
          desc:
            "Application of established engineering methods to complex engineering problem solving.",
        },
        {
          _id: "10",
          EOCNum: 2,
          desc:
            "Fluent application of engineering techniques, tools and resources.",
        },
        {
          _id: "11",
          EOCNum: 3,
          desc:
            "Application of systematic engineering synthesis and design processes.",
        },
        {
          _id: "12",
          EOCNum: 4,
          desc:
            "Application of systematic approaches to the conduct and management of engineering projects.",
        },
      ],
    },
    {
      _id: "13",
      setNum: 3,
      setName: "Professional and Personal Attributes",
      EOCS: [
        {
          _id: "14",
          EOCNum: 1,
          desc: "Ethical conduct and professional accountability",
        },
        {
          _id: "15",
          EOCNum: 2,
          desc:
            "Effective oral and written communication in professional and lay domains",
        },
        {
          _id: "16",
          EOCNum: 3,
          desc: "Creative, innovative and pro-active demeanour",
        },
        {
          _id: "17",
          EOCNum: 4,
          desc: "Professional use and management of information",
        },
        {
          _id: "18",
          EOCNum: 5,
          desc: "Orderly management of self, and professional conduct",
        },
        {
          _id: "19",
          EOCNum: 6,
          desc: "Effective team membership and team leadership",
        },
      ],
    },
  ];
};

export default ReviewerCourseReviewPage1;
