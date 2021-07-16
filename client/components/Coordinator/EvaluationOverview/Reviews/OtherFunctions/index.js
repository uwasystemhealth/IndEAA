// React + Redux + Functionality
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useCurrentCourseData } from 'components/customHooks/CoordinatorCourseLoad';


// Material Kit
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';

// Icons
import AssessmentIcon from '@material-ui/icons/Assessment';
import GetAppIcon from '@material-ui/icons/GetApp';

const OtherFunctions = () => {
  const router = useRouter();
  const { courseID } = router.query;

  const evaluation = useSelector((state) => state['course-evaluation']);
  const evaluationData = evaluation?.data;
  // Initiate Conditional Data Loading
  useCurrentCourseData();

  const reportLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/documents/${evaluationData?._id}/IndEAA-Report-${evaluationData?.courseId}.docx`;
  return (
    <Card>
      <CardHeader color="success">Other Functions</CardHeader>
      <CardBody>
        <GridContainer direction="column" justify="center" alignItems="center">
          <GridItem xs={8}>
            <Button color="white" display="block" fullWidth href={`/coordinator/${courseID}/review/compiled`}>
              <AssessmentIcon />
              View Compiled Report
            </Button>
          </GridItem>
          <GridItem xs={8}>
            <Button color="white" display="block" fullWidth external={true} target='_blank' rel="noreferrer" href={reportLink}>
              <GetAppIcon />
                Download Document
            </Button>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
};

export default OtherFunctions;
