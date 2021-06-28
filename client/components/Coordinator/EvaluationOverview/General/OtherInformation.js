// React + Redux + Functionality
import { useSelector } from 'react-redux';

// Material Kit
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';
import Grid from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';

const OtherInformation = () => {
    const courseEval = useSelector((state) => state['course-evaluation']);
    const evalData = courseEval?.data;

    const coordinators = evalData?.coordinators  || [];

    const createdOn = new Date(evalData?.createdAt);
    const dateString = createdOn?.toLocaleDateString('en-gb', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <Card>
            <CardHeader color="success">Other Information</CardHeader>
            <CardBody>
                <Grid direction="row" alignItems="center" justify="center">
                    <GridItem xs={6}>
                        <h4>Coordinators</h4>
                        {coordinators.map(({name},index) => <p key={`coordinators-${index}`}>{name}</p>)}
                    </GridItem>
                    <GridItem xs={6}>
                        <h4>Date Started</h4>
                        <p>
                            {dateString ?? 'unknown date'}
                        </p>
                    </GridItem>
                </Grid>
            </CardBody>
        </Card>
    );
};

export default OtherInformation;
