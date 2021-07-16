// React + Redux + Functionality
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useCurrentCourseData } from 'components/customHooks/CoordinatorCourseLoad';

// Custom Components
import Documents from 'components/Coordinator/EvaluationOverview/Documents';
import Information from './Information.js';
import OtherInformation from './OtherInformation.js';
import Controls from './Controls';

// Material Kit
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';

const General = () => {
  const router = useRouter();

  const evaluation = useSelector((state) => state['course-evaluation']);
  const evaluationData = evaluation?.data;
  // Initiate Conditional Data Loading
  useCurrentCourseData();

  const { courseID } = router.query;
  const reportLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/documents/${evaluationData?._id}/IndEAA-Report-${evaluationData?.courseId}.docx`;
  return (
    <GridContainer>
      <GridItem md={6}>
        <GridContainer>
          <GridItem xs={12}>
            <Information />
          </GridItem>
          <GridItem xs={12}>
            <OtherInformation />
            <Controls
              evaluationID={courseID}
              archived={evaluationData?.isArchived}
            />
          </GridItem>
          <GridItem xs={12} ><DocumentsGeneralSection /></GridItem>
        </GridContainer>
      </GridItem>
      <GridItem md={6}>
        <Card style={{ height: '100%' }}>
          <CardHeader color="success">
            Course Evaluation in Word {' '}
            <Button color="rose" external={true} target='_blank' rel="noreferrer" href={reportLink}>
                Download Document
            </Button>
          </CardHeader>
          <CardBody>
            <iframe 
              src={`https://docs.google.com/gview?url=${reportLink}`} width='100%' height='100%' frameBorder='0' />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );

};

const DocumentsGeneralSection = () => (<>
  {/* Disable Grid Item Props */}
  <Card>
    <CardHeader color="success">Introduction Documents</CardHeader>
    <CardBody>
      <Documents specificTags={'introduction'} gridItemProps={{}} removeAddDocument />
    </CardBody>
  </Card>
</>);

export default General;
