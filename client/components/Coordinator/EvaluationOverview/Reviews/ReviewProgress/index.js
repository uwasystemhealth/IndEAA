// CORE COMPONENTS
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';

// CUSTOM COMPONENTS
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

            console.log(courseID);
            services['review'].find({
                course_id: courseID,
            });
            services['users'].find();
        }
    }, [hasPath]);

    if (hasPath) {
        const reviews = useSelector((state) => state['review']);
        const reviewData = reviews?.queryResult?.data;
        console.log('reviewdata', reviewData);

        const { courseID } = router.query;
        const filteredReviews = reviewData?.filter(
            (review) => review.course_id == courseID
        );

        const revs = [
            {
                name: 'Michael Nefiodovas',
                email: 'michael.nefiodovas@uwa.edu.au',
                stage: 0,
                reviewID: 'asdsafdg',
            },
            {
                name: 'Frinze Lapuz',
                email: 'frinze.lapuz@uwa.edu.au',
                stage: 3,
                reviewID: 'yeet',
            },
            {
                name: 'Melinda Hodkiewicz',
                email: 'melinda.hodkiewicz@uwa.edu.au',
                stage: [false, true, true, true],
                reviewID: 'helloworld',
            },
        ];

        const users = useSelector((state) => state['users']);
        const usersData = users?.queryResult?.data;
        const progressCards = filteredReviews?.map((reviewer) => {
            const filteredUsers = usersData.filter(
                (user) => user._id == reviewer.user_id
            );

            const owner = filteredUsers[0];
            const stage = [
                Boolean(reviewer.step1DevelopmentLevels),
                Boolean(reviewer.step2Documents && reviewer.step2Documents.length > 0),
                Boolean(
                    reviewer.step3Evaluation && reviewer.step3Evaluation.length > 0
                ),
                Boolean(reviewer.submittedDate),
            ];

            return (
                <GridItem key={reviewer._id}>
                    <ProgressDisplay dones={stage} {...owner} {...reviewer} />
                </GridItem>
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
