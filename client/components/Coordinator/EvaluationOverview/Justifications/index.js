// CORE COMPONENTS

import EOCAccordion from './EOCAccordion.js';

import landingStyles from 'assets/jss/nextjs-material-kit/pages/landingPage.js';
import { makeStyles } from '@material-ui/core/styles';

// Store Actions and Redux
import {useCurrentCourseData} from 'components/customHooks/CoordinatorCourseLoad';


const Justifications = () => {
    // Initiate Conditional Data Loading
    useCurrentCourseData();
    
    return <EOCAccordion />;
};

export default Justifications;
