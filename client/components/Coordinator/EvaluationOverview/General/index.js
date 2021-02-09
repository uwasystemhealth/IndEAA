import { useRouter } from 'next/router';

// CORE COMPONENTS
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';


import Information from './Information.js';
import OtherInformation from './OtherInformation.js';
import Controls from './Controls';

// Store Actions and Redux
import { useSelector } from 'react-redux';
import {useCurrentCourseData} from 'components/customHooks/CoordinatorCourseLoad';

const General = () => {
    const router = useRouter();

    const evaluation = useSelector((state) => state['course-evaluation']);
    const evaluationData = evaluation?.data;
    // Initiate Conditional Data Loading
    useCurrentCourseData();

    if (evaluationData?._id) {
        const { courseID } = router.query;

        return (
            <GridContainer>
                <GridItem xs={6}>
                    <Information evaluationID={courseID} />
                </GridItem>
                <GridItem xs={6}>
                    <OtherInformation evaluationID={courseID} />
                    <Controls
                        evaluationID={courseID}
                        archived={evaluationData?.isArchived}
                    />
                </GridItem>
            </GridContainer>
        );
    } else {
        return <p>invalid</p>;
    }
};

export default General;
