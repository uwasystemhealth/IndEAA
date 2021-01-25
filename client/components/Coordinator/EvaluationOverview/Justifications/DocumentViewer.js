// CORE COMPONENTS
import CustomTabs from 'components/MaterialKit/CustomTabs/CustomTabs.js';
import Face from '@material-ui/icons/Face';
import Chat from '@material-ui/icons/Chat';

// CUSTOM COMPONENTS
import DocumentCard from './../Documents/DocumentCard.js';
import EditModal from 'components/Coordinator/EvaluationOverview/Documents/EditModal.js';
import ReviewerDocumentModal from 'components/reviewer/ReviewerDocumentModal';

import { useState } from 'react';

const DocumentViewer = ({
    documents = [],
    course_id = null,
    review_id = null,
    eocBeingViewed = null,
    isReviewer = false,
}) => {
    const [
        currentSelectedDocumentReview,
        setCurrentSelectedDocumentReview,
    ] = useState(null);
    const [currentSelectedDocument, setCurrentSelectedDocument] = useState(null);

    const deselectCurrentSelectedDocument = () =>
        setCurrentSelectedDocument(null);
    const deselectCurrentSelectedDocumentReview = () =>
        setCurrentSelectedDocumentReview(null);

    // Format of EOC is [Set No].[EOC Number]
    // Eg. 1.2
    // specific = 1.2
    // general = 1
    const specificEocNumber = eocBeingViewed;
    const generalEocNumber = eocBeingViewed?.split('.')[0];
    const generalDocs = documents.filter((document) =>
        document.tags.includes(generalEocNumber)
    );
    const specificDocs = documents.filter((document) =>
        document.tags.includes(specificEocNumber)
    );

    const generalCards = generalDocs.map((doc) => (
        <DocumentCard
            course_id={course_id}
            document={doc}
            isReviewer={isReviewer}
            setCurrentSelectedDocument={setCurrentSelectedDocument}
            setCurrentSelectedDocumentReview={setCurrentSelectedDocumentReview}
        />
    ));
    const specificCards = specificDocs.map((doc) => (
        <DocumentCard
            course_id={course_id}
            document={doc}
            isReviewer={isReviewer}
            setCurrentSelectedDocument={setCurrentSelectedDocument}
            setCurrentSelectedDocumentReview={setCurrentSelectedDocumentReview}
        />
    ));

    return (
        <>
            {!isReviewer ? (
                <EditModal
                    course_id={course_id}
                    document={currentSelectedDocument}
                    isOpen={Boolean(currentSelectedDocument)}
                    setClose={deselectCurrentSelectedDocument}
                />
            ) : (
                <ReviewerDocumentModal
                    review_id={review_id}
                    documentReview={currentSelectedDocumentReview}
                    isOpen={Boolean(currentSelectedDocumentReview)}
                    setClose={deselectCurrentSelectedDocumentReview}
                />
            )}

            <CustomTabs
                headerColor="success"
                tabs={[
                    {
                        tabName: 'General Documents',
                        tabIcon: Face,
                        tabContent: <>{generalCards}</>,
                    },
                    {
                        tabName: 'Specific Documents',
                        tabIcon: Chat,
                        tabContent: <>{specificCards}</>,
                    },
                ]}
            />
        </>
    );
};

export default DocumentViewer;
