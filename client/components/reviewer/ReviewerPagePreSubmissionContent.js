import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { services } from "store/feathersClient";

// CORE COMPONENTS
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Success from "components/MaterialKit/Typography/Success.js";
import Danger from "components/MaterialKit/Typography/Danger.js";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import CustomTabs from "components/MaterialKit/CustomTabs/CustomTabs.js";

const ReviewerPagePreSubmissionContent = () => {
  const reviewState = useSelector((state) => state.review);
  const review = reviewState.queryResult.data[0] || { course_id: courseID };
  const authUser = useSelector((state) => state.auth.user);
  const courseState = useSelector((state) => state["course-evaluation"]);
  const course = courseState.data;

    console.log(courseState)
    console.log(course)
  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          1. Overview and EOCs
        </AccordionSummary>
        <AccordionDetails>
          {review && review.step1DevelopmentLevels ? (
            <Success>
              You have read and confirmed that you have understood the elements
              of competencies.
            </Success>
          ) : (
            <Danger>
              You have not yet read and confirmed that you have understood the
              elements of competencies.
            </Danger>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          2. Documents
        </AccordionSummary>
        <AccordionDetails>
          {course &&
            course.documents.map((document) => {
              // Filter the review documents with the currently
              // selected course document
              const reviewOfDocument = review.step2Documents.find(
                (reviewDoc) =>
                  reviewDoc && reviewDoc.document_id === document._id
              );

              return (
                <div>
                  <h3>{document.name}</h3>
                  <h4>
                    <strong>Comment:</strong>
                    {reviewOfDocument && reviewOfDocument.comment ? (
                      <Success> {reviewOfDocument.comment}</Success>
                    ) : (
                      <Danger> You have not provided any comments here</Danger>
                    )}
                    <h4>
                      Date Finished:{" "}
                      {reviewOfDocument &&
                      reviewOfDocument.finishedReviewedOn ? (
                        <Success>{reviewOfDocument.finishedReviewedOn}</Success>
                      ) : (
                        <Danger>
                          You have not marked this as review completed
                        </Danger>
                      )}
                    </h4>
                  </h4>
                </div>
              );
            })}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default ReviewerPagePreSubmissionContent;
