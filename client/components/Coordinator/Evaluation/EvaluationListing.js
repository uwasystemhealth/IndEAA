// Material Kit
import Grid from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';

// Material UI
import Link from '@material-ui/core/Link';

// Icons
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import HowToVoteIcon from '@material-ui/icons/HowToVote';

//Styles
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  root: {
    width: 'inherit',
  },
}));

const EvaluationListing = ({
  evalId,
  courseCode,
  coordinators,
  evaluationDescription,
}) => {
  const classes = useStyles();

  const coordinatorNames = coordinators.map(({ name,email }) => name || email)?.join(', ');

  return (
    <Grid
      className={classes.root}
      direction="row"
      alignItems="center"
      justify="center"
    >
      <GridItem md={7}>
        <h3 className={classes.title}>{courseCode}</h3>
        <h4 className={classes.description}>{coordinatorNames}</h4>
        <h5 className={classes.description}>{evaluationDescription}</h5>
      </GridItem>
      <GridItem md={2}>
        <Button
          color="primary"
          type="button"
          size="large"
          startIcon={<PictureAsPdfIcon />}
        >
          Export
        </Button>
      </GridItem>
      <GridItem md={2}>
        <Link href={`/coordinator/${evalId}`}>
          <Button
            color="primary"
            size="large"
            type="button"
            startIcon={<HowToVoteIcon />}
          >
            Reviews
          </Button>
        </Link>
      </GridItem>
    </Grid>
  );
};

export default EvaluationListing;
