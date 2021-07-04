// Custom Components
import ReviewList from 'components/reviewer/ReviewList';

//Styles
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/nextjs-material-kit/pages/landingPage.js';
const useStyles = makeStyles(styles);

const ReviewerMainPage = () => {
  const classes = useStyles();
  return (
    <div>
      <ReviewList />
    </div>
  );
};

export default ReviewerMainPage;
