// React + Redux + Functionality
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {useCurrentCourseData} from 'components/customHooks/CoordinatorCourseLoad';

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

const General = () => {
    const router = useRouter();

    const evaluation = useSelector((state) => state['course-evaluation']);
    const evaluationData = evaluation?.data;
    // Initiate Conditional Data Loading
    useCurrentCourseData();

    const { courseID } = router.query;

    return (
        <GridContainer>
            <GridItem md={6}>
                <Information />
            </GridItem>
            <GridItem md={6}>
                <OtherInformation />
                <Controls
                    evaluationID={courseID}
                    archived={evaluationData?.isArchived}
                />
            </GridItem>
            <GridItem md={6} ><DocumentsGeneralSection /></GridItem>
        </GridContainer>
    );

};

const DocumentsGeneralSection = () => (<>
    {/* Disable Grid Item Props */}
    <Card>
        <CardHeader color="success">Introduction Documents</CardHeader>
        <CardBody>
            <Documents specificTags={'introduction'} gridItemProps={{}} removeAddDocument/> 
        </CardBody>
    </Card>
</>);

export default General;
