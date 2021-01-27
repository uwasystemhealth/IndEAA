// CORE COMPONENTS
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';


import ProgressDisplay from './ProgressDisplay.js';

// Redux
import { useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const ReviewProgress = () => {
    const router = useRouter();

    const [reviewers, setReviewers] = useState([]);
    const [loading, setLoading] = useState(true);

    const hasPath = router.query.hasOwnProperty('courseID');

    useEffect(() => {
        if (router.query.hasOwnProperty('courseID')) {
            const { courseID } = router.query;

            services['review'].find({
                course_id: courseID,
            });
            services['users'].find(
                {query:
                   { 
                       perms: {
                           $elemMatch: { course_id: courseID, role: 'Reviewer' },
                       }
                   }
                }
            );
        }
    }, [hasPath]);

    if (hasPath) {
        const reviews = useSelector((state) => state['review']);
        const reviewData = reviews?.queryResult?.data;

        const users = useSelector((state) => state['users']);

        const usersData = users?.queryResult?.data;
        
        // TODO Note: Something similar is done in utils/compileResult
        const progressCards = usersData?.map(reviewer=>{
            const reviewOfUser = reviewData?.find(review=> review.user_id === reviewer._id) || {};
            return(
                <ProgressDisplay reviewer={reviewer} review={reviewOfUser} key={reviewer._id} />
            );
        });

        return (
            <Card>
                <CardHeader color="success">Review Progress</CardHeader>
                <CardBody>
                    <GridContainer>{progressCards}</GridContainer>
                </CardBody>
            </Card>
        );
    } else {
        return <p>invalid...</p>;
    }
};

export default ReviewProgress;
