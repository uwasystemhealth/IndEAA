import EditIcon from "@material-ui/icons/Edit";
// CORE COMPONENTS
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";

// CUSTOM COMPONENTS
import DocumentCard from "components/Coordinator/EvaluationOverview/Documents/DocumentCard.js";
import ReviewerDocumentModal from "components/reviewer/ReviewerDocumentModal";

// Store Actions and Redux
import { useDispatch, useSelector } from "react-redux";
import { services } from "store/feathersClient";

import { useState, useEffect } from "react";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNewDocumentModalOpen, setIsNewDocumentModalOpen] = useState(false);
  const [currentSelectedDocumentReview, setCurrentSelectedDocumentReview] = useState(null);

  const courseEval = useSelector((state) => state["course-evaluation"]);
  const reviewState = useSelector((state) => state.review);
  const review = reviewState?.queryResult.data[0];
  const evalData = courseEval?.data;

  const deselectCurrentSelectedDocumentReview = () =>
    setCurrentSelectedDocumentReview(null);

  const documentComponents = evalData?.documents.map((doc) => {
    return (
      <GridItem key={doc._id} xs={4}>
        <DocumentCard
          course_id={evalData?._id}
          document={doc}
          isReviewer
          setCurrentSelectedDocumentReview={setCurrentSelectedDocumentReview}
        />
      </GridItem>
    );
  });

  return (
    <>
      <ReviewerDocumentModal
        review_id={review._id}
        documentReview={currentSelectedDocumentReview}
        isOpen={Boolean(currentSelectedDocumentReview)}
        setClose={deselectCurrentSelectedDocumentReview}
      ></ReviewerDocumentModal>
      <GridContainer>{documentComponents}</GridContainer>;
    </>
  );
};

export default Documents;
