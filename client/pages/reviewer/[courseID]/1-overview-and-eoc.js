import { useState } from 'react';
import { useRouter } from 'next/router';

// CORE COMPONENTS
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CustomTabs from 'components/MaterialKit/CustomTabs/CustomTabs.js';

// Custom Hooks
import {useCurrentReviewOfUser} from 'components/customHooks/ReviewerReviewLoad';
// Use own components
import ReviewProgress from 'components/reviewer/ReviewProgress';
import ReviewerPageCardDescription from 'components/reviewer/ReviewerPageCardDescription';
import ReviewerPageBottomNavigation from 'components/reviewer/ReviewerPageBottomNavigation';

// Redux
import { useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

// Utils
import { getEOCInfo } from 'utils/eocs';

//Styles
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/jss/nextjs-material-kit/pages/loginPage.js';
const useStyles = makeStyles(styles);


const ReviewerCourseReviewPage1 = () => {
    const router = useRouter();
    const { courseID } = router.query;

    const reviewState = useSelector((state) => state.review);
    const review = reviewState.queryResult.data[0] || { course_id: courseID };
    const authUser = useSelector((state) => state.auth.user);


    // Load the Reviewer using custom useEffect Hook
    useCurrentReviewOfUser(authUser,reviewState,courseID);

    const handleSubmit = () => {
    // Update the Review Process when has been read
        if (!review.step1DevelopmentLevels) {
            services.review.patch(review._id, {
                step1DevelopmentLevels: new Date(),
            });
        }
    };

    const pageNumber = 1;

    return (
        <div>
            <ReviewProgress review={review} />
            <ReviewerPageCardDescription
                pageNumber={pageNumber}
            />
            <EOCDescriptionAccordions />
            <ReviewerPageBottomNavigation
                pageNumber={pageNumber}
                course_id={courseID}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

const EOCDescriptionAccordions = () => {
    const [eocs] = useState(() => getEOCInfo());

    // This is a copy of the coordinator/EOCAccordion (modified)
    // This needs to be refactored later on
    // Ideally the aggreed upon

    const classes = useStyles();

    return (
        <>
            {eocs.map((eocSet) => (
                <Accordion key={eocSet.setNum}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            EOC {eocSet.setNum}: {eocSet.setName}
                    </AccordionSummary>
                    <AccordionDetails>
                        <CustomTabs
                            headerColor="primary"
                            tabs={eocSet.EOCS.map((eoc) => ({
                                tabName: `EOC ${eocSet.setNum}.${eoc.EOCNum}`,
                                tabContent: (
                                    <div>
                                        <h4 className={classes.title}>{eocSet.setName}</h4>
                                        {eoc.desc}
                                    </div>
                                ),
                            }))}
                        />
                    </AccordionDetails>
                </Accordion>
            ))}
        </>
    );
};

export default ReviewerCourseReviewPage1;
