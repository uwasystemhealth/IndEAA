// React + Redux + Functionality
import {useCurrentCourseData} from 'components/customHooks/CoordinatorCourseLoad';

// Custom Components
import EOCAccordion from './EOCAccordion.js';

const Justifications = () => {
  // Initiate Conditional Data Loading
  useCurrentCourseData();
    
  return <EOCAccordion />;
};

export default Justifications;
