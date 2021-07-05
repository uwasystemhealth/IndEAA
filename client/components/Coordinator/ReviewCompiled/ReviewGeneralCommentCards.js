// React + Redux + Functionality
import React from 'react';

// Material Kit
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import {
  cardTitle,
  cardLink,
  cardSubtitle,
} from 'assets/jss/nextjs-material-kit.js';
const styles = { cardTitle, cardLink, cardSubtitle };
const useStyles = makeStyles(styles);

const ReviewCommentCards = ({reviewsUserLinked}) => {
  return (
    <Card>
      <CardBody>
        <CardHeader color="success">General Comments</CardHeader>
        <GridContainer>
          {reviewsUserLinked.map(({reviewer, review},index)=>(
            <GridItem md={4} key={review}><ReviewCommentCard
              reviewerNo={index+1}
              name={reviewer?.name || reviewer?.email}
              comment={review?.step4ReviewComment}
            /></GridItem>)
          )
          }
        </GridContainer>
      </CardBody>
    </Card>
  );
};

export default ReviewCommentCards;


const ReviewCommentCard = ({reviewerNo,name,comment}) => {
  const classes = useStyles();
  return (
    <Card>
      <CardBody>
        <h4 className={classes.cardTitle}>R{reviewerNo}: {name}</h4>
        <h5>Comment</h5>
        <p>{comment}</p>
      </CardBody>
    </Card>
  );
};


