import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import CardHeader from 'components/MaterialKit/Card/CardHeader.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import ManageReviewers from './ManageReviewers.js';

import { useState } from 'react';
import { useRouter } from 'next/router';

// Store actions and Redux
import { services } from 'store/feathersClient';

const makeArchived = (evaluation_id, router) =>
    setArchived(evaluation_id, router, true);
const makeUnarchived = (evaluation_id, router) =>
    setArchived(evaluation_id, router, false);
const setArchived = (evaluation_id, router, value) => {
    services['course-evaluation'].patch(evaluation_id, {
        isArchived: value,
    });
    router.push('/coordinator');
};

const Controls = ({ evaluationID, archived }) => {
    const router = useRouter();
    console.log(archived);

    return (
        <Card>
            <CardBody>
                {!archived ? (
                    <Button
                        color="warning"
                        onClick={() => makeArchived(evaluationID, router)}
                    >
            Archive
                    </Button>
                ) : (
                    <Button
                        color="warning"
                        onClick={() => makeUnarchived(evaluationID, router)}
                    >
            Unarchive
                    </Button>
                )}

                <Button color="warning">Force Completion</Button>
                <ManageReviewers evaluationID={evaluationID} />
            </CardBody>
        </Card>
    );
};

export default Controls;
