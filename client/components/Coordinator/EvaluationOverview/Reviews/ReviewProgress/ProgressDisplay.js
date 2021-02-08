import { useRouter } from 'next/router';

// CORE COMPONENTS
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import PageviewIcon from '@material-ui/icons/Pageview';

// CUSTOM COMPONENTS
import ReviewProgress from 'components/reviewer/ReviewProgress';
import AreYouSureButton from 'components/Other/AreYouSureButton';


// Redux
import { useSelector } from 'react-redux';
import { services } from 'store/feathersClient';


// STYLES
import { makeStyles } from '@material-ui/core/styles';
import { cardTitle, cardSubtitle } from 'assets/jss/nextjs-material-kit.js';
const styles = {
    cardTitle,
    cardSubtitle,
};
const useStyles = makeStyles(styles);

const ProgressDisplay = ({ reviewer, review }) => {
    const router = useRouter();
    const classes = useStyles();

    const courseEvaluation = useSelector((state) => state['course-evaluation'])
        ?.data;

    const handleView = () => {
        router.push(`/coordinator/${courseEvaluation._id}/review/${reviewer._id}`);
    };

    const handleReopen = () => {
        services.review.patch(review._id,{
            submittedDate: null
        });
    };

    return (
        <Card>
            <CardBody>
                <GridContainer>
                    <GridItem xs={4}>
                        <h4 className={classes.cardTitle}>{reviewer?.name}</h4>
                        <h5 className={classes.cardSubtitle}>{reviewer?.email}</h5>
                        <Button
                            display="inline-block"
                            color="white"
                            onClick={handleView}
                        >
                            <PageviewIcon />
              View
                        </Button>
                        {review?.submittedDate && (
                                
                            <AreYouSureButton
                                buttonProps={{ color: 'white', display:'inline-block' }}
                                action={handleReopen}
                            >
                                <PageviewIcon />
                                Reopen
                            </AreYouSureButton>
                        )}
                    </GridItem>
                    <GridItem xs={8}>
                        <ReviewProgress review={review} isCoordinator />
                    </GridItem>
                </GridContainer>
            </CardBody>
        </Card>
    );
};

export default ProgressDisplay;
