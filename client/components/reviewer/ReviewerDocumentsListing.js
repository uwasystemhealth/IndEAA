
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';


import DocumentCard from 'components/Coordinator/EvaluationOverview/Documents/DocumentCard.js';
import ReviewerDocumentModal from 'components/reviewer/ReviewerDocumentModal';

// Store Actions and Redux
import { useSelector } from 'react-redux';

import { useState } from 'react';

const Documents = ({ 
    specificTags=null // Optional prop - allows filtering for specific documents of specific tags
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

    const documentComponents = documentsToDisplay?.map((doc) => {
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
                review_id={review?._id}
                documentReview={currentSelectedDocumentReview}
                isOpen={Boolean(currentSelectedDocumentReview)}
                setClose={deselectCurrentSelectedDocumentReview}
            />
            <GridContainer>{documentComponents}</GridContainer>;
        </>
    );
};

export default Documents;
