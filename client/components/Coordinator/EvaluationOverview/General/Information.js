// CORE COMPONENTS
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';

// STYLES
import { cardSubtitle } from 'assets/jss/nextjs-material-kit.js';
import { makeStyles } from '@material-ui/core/styles';
const styles = {
    cardSubtitle,
};
const useStyles = makeStyles(styles);

// Store Actions and Redux
import { useDispatch, useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Information = ({ evaluationID }) => {
    const classes = useStyles();

    useEffect(() => {
        services['course-evaluation'].get({
            _id: evaluationID,
        });
    }, []);

    const courseEval = useSelector((state) => state['course-evaluation']);
    const evalData = courseEval?.data;
    const date = new Date(evalData?.dueDate);
    const dateString = date.toLocaleDateString('en-gb', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <Card>
            <CardHeader color="success">Information</CardHeader>
            <CardBody>
                <h4 className={cardSubtitle}>Review Target due Date:</h4>
                <p>{dateString || 'Not set'}</p>
                <h4 className={cardSubtitle}>Review Description:</h4>
                <p>{evalData?.reviewDescription || 'Not set'}</p>
            </CardBody>
        </Card>
    );
};

export default Information;
