// React + Redux + Functionality
import { useRouter } from 'next/router';
import { useState } from 'react';
import { services } from 'store/feathersClient';

// Custom Components
import ManageReviewers from './ManageReviewers.js';
import EvaluationModal from 'components/Coordinator/Evaluation/EvaluationModal';

// Material Kit
import Card from 'components/MaterialKit/Card/Card.js';
import CardBody from 'components/MaterialKit/Card/CardBody.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';


const Controls = ({ evaluationID, archived }) => {
  const router = useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const closeModal = () => setEditModalOpen(false);
  const openModal = () => setEditModalOpen(true);

  const setArchived = async (evaluation_id, value) => {
    try{
      await services['course-evaluation'].patch(evaluation_id, {
        isArchived: value,
      });
      if (value) { router.push('/coordinator'); }
    }catch(err){
    //Handled by Redux-Saga
    }
  };

  return (
    <Card>
      <CardBody>
        {!archived ? (
          <Button
            color="info"
            onClick={() => setArchived(evaluationID, true)}
          >
            Archive
          </Button>
        ) : (
          <Button
            color="info"
            onClick={() => setArchived(evaluationID, false)}
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
