// React + Redux + Functionality
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

// Custom Components
import ReviewDocumentsComments from 'components/Coordinator/ReviewCompiled/ReviewDocumentsComment.js';
import ReviewGeneralCommentCards from 'components/Coordinator/ReviewCompiled/ReviewGeneralCommentCards';
import ReviewEOCTable from 'components/Coordinator/ReviewCompiled/ReviewEOCTable';

// Utilities
import {linkReviewerAndReview} from 'utils/compileResult';

const CompiledPage = () => {
    const router = useRouter();
    const {courseID} = router.query;

    useEffect(() => {
        services['course-evaluation'].get(courseID); // Accessed by data
        services['review'].find({
            query:{
                course_id: courseID
            },
        }); //Accessed by queryResult.data
    }, [courseID]);

    const courseEval = useSelector((state) => state['course-evaluation']);
    const evalData = courseEval?.data;
    const reviewers = evalData?.reviewers || [];
    const reviewState = useSelector(state=> state.review);
    const reviews = reviewState?.queryResult.data;

    // Get only the linked if both are defined otherwise and empty array is used
    const reviewsUserLinked = (reviewers && reviews && linkReviewerAndReview(reviewers,reviews)) || [];
    return (
        <div>
            <ReviewDocumentsComments reviewsUserLinked={reviewsUserLinked}/>
            <ReviewEOCTable reviewsUserLinked={reviewsUserLinked} />
            <ReviewGeneralCommentCards reviewsUserLinked={reviewsUserLinked}/>
        </div>
    );
};

export default CompiledPage;
