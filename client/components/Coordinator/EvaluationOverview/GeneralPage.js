// CORE COMPONENTS
import CustomTabs from "components/MaterialKit/CustomTabs/CustomTabs.js";
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
import CircularProgress from "@material-ui/core/CircularProgress";

// CUSTOM COMPONENTS
import General from "./General";
import Justifications from "./Justifications";
import Documents from "./Documents";
import Reviews from "./Reviews";
import Error from "components/Utility/Error";

// Styles
import landingStyles from "assets/jss/nextjs-material-kit/pages/landingPage.js";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({ ...landingStyles });

import { useState, useEffect } from "react";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getEvaluationDetails = async (courseID) => {
  await sleep(1000);
  // throw new Error(
  //   "ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla"
  // );
  return {
    title: "MECH5551/MECH5552",
  };
};

const GeneralPage = ({ courseID }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [evaluation, setEvaluation] = useState({});
  const [error, setError] = useState(false);

  useEffect(async () => {
    try {
      const response = await getEvaluationDetails(courseID);
      setEvaluation(response);
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

  return (
    <CustomTabs
      headerColor="success"
      tabs={[
        {
          tabName: "General",
          tabIcon: Face,
          tabContent: <General reviewID={courseID} />,
        },
        {
          tabName: "Justifications",
          tabIcon: Chat,
          tabContent: <Justifications />,
        },
        {
          tabName: "Documents",
          tabIcon: Chat,
          tabContent: <Documents />,
        },
        {
          tabName: "Reviews",
          tabIcon: Build,
          tabContent: <Reviews />,
        },
      ]}
    />
  );
};

export default GeneralPage;
