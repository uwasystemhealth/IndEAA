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
import { useRouter } from "next/router";

const GeneralPage = () => {
  const classes = useStyles();
  const router = useRouter();

  const { courseID } = router.query;

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
          tabContent: <Justifications reviewID={courseID} />,
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
