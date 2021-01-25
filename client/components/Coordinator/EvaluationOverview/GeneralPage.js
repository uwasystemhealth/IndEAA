// CORE COMPONENTS
import CustomTabs from 'components/MaterialKit/CustomTabs/CustomTabs.js';
import Face from '@material-ui/icons/Face';
import Chat from '@material-ui/icons/Chat';
import Build from '@material-ui/icons/Build';
import CircularProgress from '@material-ui/core/CircularProgress';

// CUSTOM COMPONENTS
import General from './General';
import Justifications from './Justifications';
import Documents from './Documents';
import Reviews from './Reviews';
import Error from 'components/Utility/Error';

// Styles
import landingStyles from 'assets/jss/nextjs-material-kit/pages/landingPage.js';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({ ...landingStyles });

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

const GeneralPage = () => {
    const classes = useStyles();
    const router = useRouter();

    const hasPath = router.query.hasOwnProperty('courseID');

    useEffect(() => {
        if (router.query.hasOwnProperty('courseID')) {
            const { courseID } = router.query;
            services['course-evaluation'].get(courseID);
        }
    }, [hasPath]);

    if (hasPath) {
        const { courseID } = router.query;

        const evaluation = useSelector((state) => state['course-evaluation']);
        const evaluationData = evaluation?.data;

        return (
            <CustomTabs
                headerColor="success"
                tabs={[
                    {
                        tabName: 'General',
                        tabIcon: Face,
                        tabContent: <General evaluationData={evaluationData} />,
                    },
                    {
                        tabName: 'Justifications',
                        tabIcon: Chat,
                        tabContent: (
                            <Justifications courseID={courseID} evaluationID={courseID} />
                        ),
                    },
                    {
                        tabName: 'Documents',
                        tabIcon: Chat,
                        tabContent: <Documents evaluationID={courseID} />,
                    },
                    {
                        tabName: 'Reviews',
                        tabIcon: Build,
                        tabContent: <Reviews />,
                    },
                ]}
            />
        );
    } else {
        return <p>invalid...</p>;
    }
};

export default GeneralPage;
