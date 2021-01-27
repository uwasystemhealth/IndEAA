import React from 'react';

// CORE COMPONENTS
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { useSelector } from 'react-redux';

// Utils
import {getAllCommentsOfDocument} from 'utils/compileResult';

// STYLES
import { makeStyles } from '@material-ui/core/styles';
import {
    cardTitle,
    cardLink,
    cardSubtitle,
} from 'assets/jss/nextjs-material-kit.js';

const styles = { cardTitle, cardLink, cardSubtitle };
const useStyles = makeStyles(styles);

const ReviewDocumentsComments = ({reviewsUserLinked}) => {
    const classes = useStyles();

    // Get all the documents in the store
    const courseState = useSelector(state=>state['course-evaluation']);
    const course = courseState?.data;
    
    return (
        <Card>
            <CardBody>
                <CardHeader color="success">Document Comments</CardHeader>
                <GridContainer>{course?.documents.map(document=> (
                    <GridItem md={4}><ReviewDocumentsComment
                        document={document}
                        key={document?._id}
                        // Get only comments if the document id is defined
                        commentsUserLinked={document?._id ? getAllCommentsOfDocument(document._id, reviewsUserLinked) : []}
                    /></GridItem>
                ))}</GridContainer>
            </CardBody>
        </Card>
    );
};

export default ReviewDocumentsComments;


const ReviewDocumentsComment = ({document, commentsUserLinked}) => {
    const classes = useStyles();

    console.log(document?._id );
    return (
        <Card>
            <CardBody>
                <GridContainer xs={8}>
                    <GridItem>
                        <h4 className={classes.cardTitle}>{document?.name}</h4>
                        <p>{document?.description}</p>
                    </GridItem>
                    <GridItem xs={3}>
                        <GridContainer direction="column">
                            <button>View</button>
                        </GridContainer>
                    </GridItem>
                </GridContainer>
                <List>
                    {commentsUserLinked.map(commentUserLinked =>(
                        <ListItem key={commentUserLinked}>
        Name: {commentUserLinked?.reviewer?.name || commentUserLinked?.reviewer?.email} <br/>
        Comment: {commentUserLinked?.comment}
                        </ListItem>
                    ))}
                </List>
            </CardBody>
        </Card>
    );
};


