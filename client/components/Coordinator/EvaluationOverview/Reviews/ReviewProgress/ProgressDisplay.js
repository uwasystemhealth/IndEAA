// CORE COMPONENTS
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import PageviewIcon from '@material-ui/icons/Pageview';

// CUSTOM COMPONENTS
import ReviewProgress from 'components/reviewer/ReviewProgress';

// STYLES
import { makeStyles } from '@material-ui/core/styles';
import { cardTitle, cardSubtitle } from 'assets/jss/nextjs-material-kit.js';
const styles = {
    cardTitle,
    cardSubtitle,
};
const useStyles = makeStyles(styles);

const ProgressDisplay = ({ reviewer, review }) => {
    const classes = useStyles();

    const handleView = () =>{

    };

    const handleReopen = () =>{

    };
    return (
        <Card>
            <CardBody>
                <GridContainer>
                    <GridItem xs={4}>
                        <h4 className={classes.cardTitle}>{reviewer?.name}</h4>
                        <h5 className={classes.cardSubtitle}>{reviewer?.email}</h5>
                        <Button display="inline-block" color="white">
                            <PageviewIcon />
              View
                        </Button>
                        <Button display="inline-block" color="white">
                            <PageviewIcon />
              Reopen
                        </Button>
                    </GridItem>
                    <GridItem xs={8}>
                        <ReviewProgress review={review} isCoordinator/>
                    </GridItem>
                </GridContainer>
            </CardBody>
        </Card>
    );
};

export default ProgressDisplay;
