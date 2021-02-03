import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import ManageReviewers from './ManageReviewers.js';
import { useRouter } from 'next/router';
import EvaluationModal from 'components/Coordinator/Evaluation/EvaluationModal';
import { useState } from 'react';

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
    const [editModalOpen, setEditModalOpen] = useState(false);
    const closeModal = () => setEditModalOpen(false);
    const openModal = () => setEditModalOpen(true);

    return (
        <Card>
            <CardBody>
                {!archived ? (
                    <Button
                        color="info"
                        onClick={() => makeArchived(evaluationID, router)}
                    >
            Archive
                    </Button>
                ) : (
                    <Button
                        color="info"
                        onClick={() => makeUnarchived(evaluationID, router)}
                    >
            Unarchive
                    </Button>
                )}

                <Button color="info">Force Completion</Button>
                <ManageReviewers evaluationID={evaluationID} />
                <Button onClick={openModal} color="info">
          Edit Evaluation
                </Button>
                <EvaluationModal
                    closeModal={closeModal}
                    isOpen={editModalOpen}
                    isEditModal
                />
            </CardBody>
        </Card>
    );
};

export default Controls;
