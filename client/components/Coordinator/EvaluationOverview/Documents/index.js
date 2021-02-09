import EditIcon from '@material-ui/icons/Edit';
// CORE COMPONENTS
import Button from 'components/MaterialKit/CustomButtons/Button.js';

// CUSTOM COMPONENTS
import DocumentsListItems from 'components/Coordinator/EvaluationOverview/Documents/DocumentsListItems.js';
import EditModal from 'components/Coordinator/EvaluationOverview/Documents/EditModal.js';

// Store Actions and Redux
import { useSelector } from 'react-redux';
import {useCurrentCourseData} from 'components/customHooks/CoordinatorCourseLoad';

import { useState } from 'react';

const Documents = ({ specificTags=null, }) => {
    const [isNewDocumentModalOpen, setIsNewDocumentModalOpen] = useState(false);
    const [currentSelectedDocument, setCurrentSelectedDocument] = useState(null);

    const courseEval = useSelector((state) => state['course-evaluation']);
    const evalData = courseEval?.data;

    // Initiate Conditional Data Loading
    useCurrentCourseData();

    const deselectCurrentSelectedDocument = () =>
        setCurrentSelectedDocument(null);
    const closeNewDocumentModal = () => setIsNewDocumentModalOpen(false);
    const openNewDocumentModal = () => setIsNewDocumentModalOpen(true);

    const documentsToDisplay = specificTags ? 
        evalData?.documents.filter(({tags}) => tags.includes(specificTags))
        :  evalData?.documents;

    return (
        <>
            <EditModal
                course_id={evalData?._id}
                isOpen={isNewDocumentModalOpen}
                setClose={closeNewDocumentModal}
            />
            <EditModal
                course_id={evalData?._id}
                document={currentSelectedDocument}
                isOpen={Boolean(currentSelectedDocument)}
                setClose={deselectCurrentSelectedDocument}
            />
            <DocumentsListItems documentsToDisplay={documentsToDisplay} course_id={evalData?.id}
                setCurrentSelectedDocument={setCurrentSelectedDocument} />
            <Button color="primary" onClick={() => openNewDocumentModal()}>
                <EditIcon />
        Add New Document
            </Button>
        </>
    );
};

export default Documents;
