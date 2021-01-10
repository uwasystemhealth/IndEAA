// CORE COMPONENTS
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import CircularProgress from "@material-ui/core/CircularProgress";

// CUSTOM COMPONENTS
import Information from "./Information.js";
import OtherInformation from "./OtherInformation.js";
import Controls from "./Controls";
import Error from "components/Utility/Error";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { services } from "store/feathersClient";

const General = () => {
  const router = useRouter();
  if (router.query.hasOwnProperty("courseID")) {
    const { courseID } = router.query;
    console.log(courseID);
    return (
      <GridContainer>
        <GridItem xs={6}>
          <Information evaluationID={courseID} />
        </GridItem>
        <GridItem xs={6}>
          <OtherInformation />
          <Controls />
        </GridItem>
      </GridContainer>
    );
  } else {
    return <p>invalid</p>;
  }
};

export default General;
