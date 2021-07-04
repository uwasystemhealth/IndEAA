// CORE
import Grid from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import Link from '@material-ui/core/Link';

// Own Components
import ReviewProgress from 'components/reviewer/ReviewProgress';

//Styles
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
    root: {
        width: 'inherit',
    },
}));

const ReviewListing = ({
    evalId,
    review ,
    courseCode,
    coordinators,
    evaluationDescription,
}) => {
    const classes = useStyles();

    const coordinatorNames = coordinators?.map(({name,email})=>name || email).join(', ');

    return (
        <Grid className={classes.root} direction="row" alignItems="center" justify="center">
            <GridItem md={7}>
                <Link href={`/reviewer/${evalId}/1-overview-and-eoc`} style={{textDecoration:'none'}}>
                    <h3 className={classes.title}>{courseCode}</h3>
                    <h4 className={classes.description}>{coordinatorNames}</h4>
                    <h5 className={classes.description}>{evaluationDescription}</h5>
                </Link>
            </GridItem>
            <GridItem md={5}>
                <ReviewProgress review={review} />
            </GridItem>
        </Grid>
    );
};

export default ReviewListing;
