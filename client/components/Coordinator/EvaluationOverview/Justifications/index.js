// CORE COMPONENTS
import CircularProgress from "@material-ui/core/CircularProgress";

// CUSTOM COMPONENTS
import EOCAccordion from "./EOCAccordion.js";
import Error from "components/Utility/Error";

import { useState, useEffect } from "react";

const Justifications = ({ courseID }) => {
  return <EOCAccordion evaluationID={courseID} />;
};

export default Justifications;
