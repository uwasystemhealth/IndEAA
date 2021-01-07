// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";

// CUSTOM COMPONENTS
import ProgressDisplay from "./ProgressDisplay.js";

const ReviewProgress = () => {
  const reviewers = [
    {
      name: "Michael Nefiodovas",
      email: "michael.nefiodovas@uwa.edu.au",
      stage: 0,
      reviewID: "asdsafdg",
    },
  ];

  const progressCards = reviewers.map((reviewer) => (
    <ProgressDisplay key={reviewer.reviewID} {...reviewer}></ProgressDisplay>
  ));

  return (
    <Card>
      <CardHeader color="success">Review Progress</CardHeader>
      <CardBody>{progressCards}</CardBody>
    </Card>
  );
};

export default ReviewProgress;
