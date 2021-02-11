import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import ManageReviewers from './ManageReviewers.js';

import { useRouter } from 'next/router';

// custom components
import LoadingButton, { useLoading } from 'components/Other/LoadingButton.js';

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

    const handleSubmit = () => {
        if (archived) {
            makeArchived(evaluationID, router);
        }
        else {
            makeUnarchived(evaluationID, router);
        }
    }

    const [isLoading, handleSubmitLoading] = useLoading(handleSubmit)

    return (
        <Card>
            <CardBody>

                <LoadingButton isLoading={isLoading} buttonProps={{
                    color: "warning",
                    onClick={() => handleSubmitLoading()}
                }}>
                    {!archived ? "Archive" : "Unarchive"}
                </LoadingButton>

                <Button color="warning">Force Completion</Button>
                <ManageReviewers evaluationID={evaluationID} />
            </CardBody>
        </Card>
    );
};

export default Controls;
