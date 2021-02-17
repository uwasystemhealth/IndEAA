// CORE COMPONENTS
import CustomTabs from 'components/MaterialKit/CustomTabs/CustomTabs.js';
import Face from '@material-ui/icons/Face';
import Chat from '@material-ui/icons/Chat';
import Build from '@material-ui/icons/Build';


import General from './General';
import Justifications from './Justifications';
import Documents from './Documents';
import Reviews from './Reviews';


import landingStyles from 'assets/jss/nextjs-material-kit/pages/landingPage.js';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({ ...landingStyles });



const GeneralPage = () => {

    return (
        <CustomTabs
            headerColor="success"
            tabs={[
                {
                    tabName: 'General',
                    tabIcon: Face,
                    tabContent: <General />,
                },
                {
                    tabName: 'Justifications',
                    tabIcon: Chat,
                    tabContent: (
                        <Justifications />
                    ),
                },
                {
                    tabName: 'Documents',
                    tabIcon: Chat,
                    tabContent: <Documents />,
                },
                {
                    tabName: 'Reviews',
                    tabIcon: Build,
                    tabContent: <Reviews />,
                },
            ]}
        />
    );
    
};

export default GeneralPage;
