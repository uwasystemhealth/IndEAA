// CORE COMPONENTS
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';
import CardFooter from 'components/MaterialKit/Card/CardFooter.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';


import EvaluationListing from './EvaluationListing.js';
import EvaluationModal from './EvaluationModal.js';

//Styles
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/nextjs-material-kit/pages/landingPage.js';
import checkboxStyles from 'assets/jss/nextjs-material-kit/customCheckboxRadioSwitch.js';
const useStyles = makeStyles(() => ({
    ...styles,
    ...checkboxStyles,
    footer: {
        flexDirection: 'row-reverse',
    },
    list: {
        maxHeight: '60vh',
        overflow: 'auto',
    },
}));

import { useEffect, useState } from 'react';

// Redux
import { useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

const EvaluationList = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isBiggerThanMd = useMediaQuery(theme.breakpoints.up('md'));

    const [loading, setLoading] = useState(true);
    const [showArchived, setShowArchived] = useState(false);
    const [isNewEvaluationModalOpen, setNewEvaluationModalOpen] = useState(false);

    const closeNewEvaluationModal = () => setNewEvaluationModalOpen(false);
    const openNewEvaluationModal = () => setNewEvaluationModalOpen(true);

    useEffect(() => {
    // 1. Find all CourseEvaluations where the createdBy key matches the logged in user
        services['course-evaluation'].find();
        services['users'].find();
        setLoading(false);
    }, []);

    const courseEvaluations = useSelector((state) => state['course-evaluation'])
        ?.queryResult?.data;
    const users = useSelector((state) => state['users'])?.queryResult?.data;

    if (loading || !users || !courseEvaluations) {
        return (
            <Card>
                <CardBody>Loading...</CardBody>
            </Card>
        );
    }

    let evaluationListings = courseEvaluations;
    // 2. Filter out archived courses
    if (!showArchived) {
        evaluationListings = courseEvaluations.filter((val) => !val.isArchived);
    }

    // 3. Render course list elemnts
    evaluationListings = evaluationListings.map(
        ({ _id, courseId, reviewDescription }) => {
            // select out the coordinators with the permission for this evaluation

            const coordinators = users.filter(({ perms }) =>
                perms.some(
                    ({ course_id, role }) => course_id === _id && role === 'Coordinator'
                )
            );

            return (
                <ListItem key={_id} divider>
                    <EvaluationListing
                        evalId={_id}
                        courseCode={courseId}
                        coordinators={coordinators}
                        evaluationDescription={reviewDescription}
                    />
                </ListItem>
            );
        }
    );

    return (
        <Card>
            <CardHeader
                color="primary"
                style={{ width: isBiggerThanMd ? '50%' : '90%' }}
            >
                <GridContainer alignItems="center" justify="center">
                    <GridItem md={9}>
                        <h3 className={classes.cardTitle}>Manage Course Evaluations</h3>
                    </GridItem>
                    <GridItem md={3}>
                        {showArchived ? (
                            <Button color="primary" onClick={() => setShowArchived(false)}>
                Hide Archived
                            </Button>
                        ) : (
                            <Button color="rose" onClick={() => setShowArchived(true)}>
                Show Archived
                            </Button>
                        )}
                    </GridItem>
                </GridContainer>
            </CardHeader>
            <CardBody>
                <List className={classes.list}>{evaluationListings}</List>
            </CardBody>
            <CardFooter className={classes.footer}>
                <Button color="secondary" onClick={openNewEvaluationModal}>
          Create New Evaluation
                </Button>
                <EvaluationModal
                    isOpen={isNewEvaluationModalOpen}
                    closeModal={closeNewEvaluationModal}
                />
            </CardFooter>
        </Card>
    );
};

export default EvaluationList;
