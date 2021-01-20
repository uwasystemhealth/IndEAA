import React from "react";
import { useRouter } from "next/router";

// CORE COMPONENTS
import Button from "components/MaterialKit/CustomButtons/Button.js";
import CardFooter from "components/MaterialKit/Card/CardFooter.js";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";

// Index represents page number
const ReviewerPageBottomNavigation = ({
  pageNumber,
  course_id,
  handleSubmit,
}) => {
  // Look at ReviewProgress.js and make sure this lines up with "steps"
  const index = pageNumber - 1;
  const pageLink = [
    {
      stepName: "Overview & Eoc",
      stepLink: "overview-and-eoc",
    },
    {
      stepName: "Read Documents",
      stepLink: "documents",
    },

    {
      stepName: "Review Course",
      stepLink: "assessment",
    },

    {
      stepName: "Review & Submit",
      stepLink: "review",
    },
  ];
  const router = useRouter();

  return (
    <CardFooter>
      <GridContainer direction="row" alignItems="flex-start" justify="flex-end">
        {index > 0 && (
          <GridItem xs={6}>
            <Button
              href={`/reviewer/${course_id}/${pageNumber - 1}-${
                pageLink[index - 1].stepLink
              }`}
            >
              Back
            </Button>
          </GridItem>
        )}
        {index < pageLink.length - 1 &&
          // The button has different functionality depending on whether there is a handleChange event
          (handleSubmit ? (
            <GridItem xs={6}>
              <Button
                onClick={() => {
                  handleSubmit();
                  router.push(
                    `/reviewer/${course_id}/${pageNumber + 1}-${
                      pageLink[index + 1].stepLink
                    }`
                  );
                }}
              >
                Next
              </Button>
            </GridItem>
          ) : (
            <GridItem xs={6}>
              <Button
                href={`/reviewer/${course_id}/${pageNumber + 1}-${
                  pageLink[index + 1].stepLink
                }`}
              >
                Next
              </Button>
            </GridItem>
          ))}
      </GridContainer>
    </CardFooter>
  );
};

export default ReviewerPageBottomNavigation;