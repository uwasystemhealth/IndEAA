// CORE COMPONENTS

import EOCAccordion from './EOCAccordion.js';



import {useCurrentCourseData} from 'components/customHooks/CoordinatorCourseLoad';


const Justifications = () => {
    // Initiate Conditional Data Loading
    useCurrentCourseData();
    
    return <EOCAccordion />;
};

export default Justifications;
