// CORE COMPONENTS
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import SettingsIcon from '@material-ui/icons/Settings';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';

const OtherFunctions = () => {
    return (
        <Card>
            <CardHeader color="success">Other Functions</CardHeader>
            <CardBody>
                <GridContainer direction="column" justify="center" alignItems="center">
                    <GridItem xs={6}>
                        <Button color="white" display="block" fullWidth>
                            <PictureAsPdfIcon />
              Export
                        </Button>
                    </GridItem>
                    <GridItem xs={6}>
                        <Button color="white" fullWidth>
                            <SettingsIcon />
              Manage Users
                        </Button>
                    </GridItem>
                </GridContainer>
            </CardBody>
        </Card>
    );
};

export default OtherFunctions;
