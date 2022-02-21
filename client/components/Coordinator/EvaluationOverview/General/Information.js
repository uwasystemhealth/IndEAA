// React + Redux + Functionality
import { useSelector } from 'react-redux';

// Material Kit
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';

// Styles
import { cardSubtitle } from 'assets/jss/nextjs-material-kit.js';
import { makeStyles } from '@material-ui/core/styles';
const styles = {
  cardSubtitle,
};
const useStyles = makeStyles(styles);

const Information = () => {
  const courseEval = useSelector((state) => state['course-evaluation']);
  const classes = useStyles();
  const evalData = courseEval?.data;
    
  const date = new Date(evalData?.dueDate);
  const dateString = date.toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card>
      <CardHeader color="success">Information</CardHeader>
      <CardBody>
        <h4 className={classes.cardSubtitle}>Review Target due Date:</h4>
        <p>{dateString || 'Not set'}</p>
        <h4 className={classes.cardSubtitle}>Review Description:</h4>
        <p>{evalData?.reviewDescription || 'Not set'}</p>
      </CardBody>
    </Card>
  );
};

export default Information;
