// CORE COMPONENTS
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import CircularProgress from "@material-ui/core/CircularProgress";

// CUSTOM COMPONENTS
import Information from "./Information.js";
import OtherInformation from "./OtherInformation.js";
import Controls from "./Controls";

import { useRouter } from "next/router";

const General = () => {
  const router = useRouter();
  if (router.query.hasOwnProperty("courseID")) {
    const { courseID } = router.query;
    return (
      <GridContainer>
        <GridItem xs={6}>
          <Information evaluationID={courseID} />
        </GridItem>
        <GridItem xs={6}>
          <OtherInformation evaluationID={courseID} />
          <Controls evaluationID={courseID} />
        </GridItem>
      </GridContainer>
    );
  } else {
    return <p>invalid</p>;
  }
};

export default General;
