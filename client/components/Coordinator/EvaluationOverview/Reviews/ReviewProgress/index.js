// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";

// CUSTOM COMPONENTS
import ProgressDisplay from "./ProgressDisplay.js";

import { useState, useEffect } from "react";

const ReviewProgress = () => {
  const [reviewers, setReviewers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const revs = [
      {
        name: "Michael Nefiodovas",
        email: "michael.nefiodovas@uwa.edu.au",
        stage: 0,
        reviewID: "asdsafdg",
      },
      {
        name: "Frinze Lapuz",
        email: "frinze.lapuz@uwa.edu.au",
        stage: 3,
        reviewID: "yeet",
      },
      {
        name: "Melinda Hodkiewicz",
        email: "melinda.hodkiewicz@uwa.edu.au",
        stage: 4,
        reviewID: "helloworld",
      },
    ];

    setReviewers(revs);
    setLoading(false);
  }, []);

  if (loading) {
    return <p>loading...</p>;
  }

  const progressCards = reviewers.map((reviewer) => (
    <GridItem key={reviewer.reviewID}>
      <ProgressDisplay {...reviewer}></ProgressDisplay>
    </GridItem>
  ));

  return (
    <Card>
      <CardHeader color="success">Review Progress</CardHeader>
      <CardBody>
        <GridContainer>{progressCards}</GridContainer>
      </CardBody>
    </Card>
  );
};

export default ReviewProgress;
