// React + Redux + Functionality
import { useSelector } from 'react-redux';
import { useState } from 'react';

// Custom Components
import DocumentsListItems from 'components/Coordinator/EvaluationOverview/Documents/DocumentsListItems.js';
import ReviewerDocumentModal from 'components/reviewer/ReviewerDocumentModal';

const Documents = ({ 
    specificTags=null, // Optional prop - allows filtering for specific documents of specific tags
}) => {
    const [currentSelectedDocumentReview, setCurrentSelectedDocumentReview] = useState(null);

    const courseEval = useSelector((state) => state['course-evaluation']);
    const reviewState = useSelector((state) => state.review);
    const review = reviewState?.queryResult.data[0];
    const evalData = courseEval?.data;

    const deselectCurrentSelectedDocumentReview = () =>
        setCurrentSelectedDocumentReview(null);

    const documentsToDisplay = specificTags ? 
        evalData?.documents.filter(({tags}) => tags.includes(specificTags))
        :  evalData?.documents;

    return (
        <>
            <ReviewerDocumentModal
                review_id={review?._id}
                documentReview={currentSelectedDocumentReview}
                isOpen={Boolean(currentSelectedDocumentReview)}
                setClose={deselectCurrentSelectedDocumentReview}
            />
            <DocumentsListItems documentsToDisplay={documentsToDisplay} course_id={evalData?.id}
                setCurrentSelectedDocumentReview={setCurrentSelectedDocumentReview} isReviewer/>
        </>
    );
};

export default Documents;

