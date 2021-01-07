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

const getReviewInfo = async (reviewID) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    reviewID,
    dueDate: new Date(),
    description: "example description",
    createdBy: "Frinze Erin Lapuz",
    createdOn: new Date(),
    courseTitle: "MECH5551/MECH5552",
  };
};

const General = ({ reviewID }) => {
  const [loading, setLoading] = useState(true);
  const [reviewInfo, setReviewInfo] = useState({});
  const [error, setError] = useState(false);

  useEffect(async () => {
    try {
      const response = await getReviewInfo(reviewID);
      setReviewInfo(response);
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
    <GridContainer>
      <GridItem xs={6}>
        <Information {...reviewInfo} />
      </GridItem>
      <GridItem xs={6}>
        <OtherInformation {...reviewInfo} />
        <Controls {...reviewInfo} />
      </GridItem>
    </GridContainer>
  );
};

export default General;
