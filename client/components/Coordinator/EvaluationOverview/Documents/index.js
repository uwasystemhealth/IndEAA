import EditIcon from '@material-ui/icons/Edit';
// CORE COMPONENTS
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';
import Button from 'components/MaterialKit/CustomButtons/Button.js';

// CUSTOM COMPONENTS
import DocumentCard from 'components/Coordinator/EvaluationOverview/Documents/DocumentCard.js';
import EditModal from 'components/Coordinator/EvaluationOverview/Documents/EditModal.js';

// Store Actions and Redux
import { useDispatch, useSelector } from 'react-redux';
import { services } from 'store/feathersClient';

import { useState, useEffect } from 'react';

const Documents = ({ evaluationID }) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isNewDocumentModalOpen, setIsNewDocumentModalOpen] = useState(false);
    const [currentSelectedDocument, setCurrentSelectedDocument] = useState(null);

    useEffect(() => {
        services['course-evaluation'].get({
            _id: evaluationID,
        });
    }, []);

    const courseEval = useSelector((state) => state['course-evaluation']);
    const evalData = courseEval?.data;

    const deselectCurrentSelectedDocument = () =>
        setCurrentSelectedDocument(null);
    const closeNewDocumentModal = () => setIsNewDocumentModalOpen(false);
    const openNewDocumentModal = () => setIsNewDocumentModalOpen(true);

    const documentComponents = evalData?.documents.map((doc) => {
        return (
            <GridItem key={doc._id} xs={4}>
                <DocumentCard
                    // handleDelete={handleDelete}
                    course_id={evaluationID}
                    document={doc}
                    setCurrentSelectedDocument={setCurrentSelectedDocument}
                />
            </GridItem>
        );
    });

    return (
        <>
            <EditModal
                course_id={evaluationID}
                isOpen={isNewDocumentModalOpen}
                setClose={closeNewDocumentModal}
            />
            <EditModal
                course_id={evaluationID}
                document={currentSelectedDocument}
                isOpen={Boolean(currentSelectedDocument)}
                setClose={deselectCurrentSelectedDocument}
            />
            <GridContainer>{documentComponents}</GridContainer>;
            <Button color="primary" onClick={() => openNewDocumentModal()}>
                <EditIcon />
        Add New Document
            </Button>
        </>
    );
};

export default Documents;
