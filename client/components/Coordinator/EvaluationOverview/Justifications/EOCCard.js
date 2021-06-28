// React + Redux + Functionality
import React from 'react';

// Utilities
import { developmentLevelToString } from 'utils/eocs';

// Material Kit
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardFooter from 'components/MaterialKit/Card/CardFooter.js';
import Muted from 'components/MaterialKit/Typography/Muted.js';
import Success from 'components/MaterialKit/Typography/Success.js';
import Danger from 'components/MaterialKit/Typography/Danger.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';

// Icons
import FindInPageIcon from '@material-ui/icons/FindInPage';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import { cardTitle } from 'assets/jss/nextjs-material-kit.js';
const styles = {
    cardTitle,
};
const useStyles = makeStyles(styles);

const EOCCard = (props) => {
    const {
        eocGeneralAndSpecific,
        description,
        rating,
        justification,
        reason,
        ideaForImprovement,
        handleView,
        isReviewer,
    } = props;
    const classes = useStyles();

    const ratingMsg =
    rating != 0 ? (
        <Success>Your Rating: {developmentLevelToString[rating]}</Success>
    ) : (
        <Danger>Your Rating: None</Danger>
    );

    const justMsg = // Truthy and Falsy Color
    justification ? (
        <Success>Your Justification: {justification}</Success>
    ) : (
        <Danger>Your Justification: None</Danger>
    );

    const reasonMsg = // Truthy and Falsy Color
    reason ? (
        <Success>Your Reason: {reason}</Success>
    ) : (
        <Danger>Your Reason: None</Danger>
    );

    const ideaForImprovementMsg = // Truthy and Falsy Color
  ideaForImprovement ? (
      <Success>Your Idea For Improvement: {ideaForImprovement}</Success>
  ) : (
      <Danger>Your Idea For Improvement: None</Danger>
  );

    return (
        <Card>
            <CardBody>
                <h4 className={classes.cardTitle}>{`EOC ${eocGeneralAndSpecific}`}</h4>
                <GridContainer>
                    <GridItem xs={8}>
                        <Muted>{description}</Muted>
                    </GridItem>
                    <GridItem xs={4}>
                        <Button color="white" onClick={() => handleView()}>
                            <FindInPageIcon />
              View
                        </Button>
                    </GridItem>
                </GridContainer>
            </CardBody>
            <CardFooter>
                <GridContainer direction="column" alignItems="flex-start">
                    <GridItem>{ratingMsg}</GridItem>
                    {!isReviewer ? (
                        <GridItem>{justMsg}</GridItem>
                    ) : (
                        <>
                            <GridItem>{reasonMsg}</GridItem>
                            <GridItem>{ideaForImprovementMsg}</GridItem>
            
                        </>
                    )}
                </GridContainer>
            </CardFooter>
        </Card>
    );
};

export default EOCCard;
