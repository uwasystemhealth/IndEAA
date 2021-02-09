
import GridContainer from 'components/MaterialKit/Grid/GridContainer.js';
import GridItem from 'components/MaterialKit/Grid/GridItem.js';


import DocumentCard from 'components/Coordinator/EvaluationOverview/Documents/DocumentCard.js';




const DocumentsListItems = ({documentsToDisplay, course_id, setCurrentSelectedDocumentReview, setCurrentSelectedDocument, isReviewer})=> {
    
    console.log(documentsToDisplay);
    return <GridContainer>{documentsToDisplay?.map((doc) => {
        return (
            <GridItem key={doc._id} xs={4}>
                <DocumentCard
                    course_id={course_id}
                    document={doc}
                    isReviewer={isReviewer}
                    setCurrentSelectedDocumentReview={setCurrentSelectedDocumentReview} 
                    setCurrentSelectedDocument={setCurrentSelectedDocument}/>
            </GridItem>
        );
    })}</GridContainer>;
};

export default DocumentsListItems;