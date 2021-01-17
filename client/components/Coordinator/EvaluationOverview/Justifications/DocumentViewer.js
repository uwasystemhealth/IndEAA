// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import CustomTabs from "components/MaterialKit/CustomTabs/CustomTabs.js";
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";

// CUSTOM COMPONENTS
import DocumentCard from "./../Documents/DocumentCard.js";

const DocumentViewer = ({ documents, course_id ,eocBeingViewed}) => {
    // TODO: Fix this (this is super hacky)
    // I am passing title to eocBeingViewed
    // Assume title is always in the format `EOC 1.1`
    const specificEocNumber = eocBeingViewed.substring(4)
    const generalEocNumber = eocBeingViewed.substring(4,5)
    const generalDocs = documents.filter(document => document.tags.includes(generalEocNumber))
    const specificDocs = documents.filter(document => document.tags.includes(specificEocNumber))

    const generalCards = generalDocs.map((doc) => (
        <DocumentCard  course_id={course_id}
        document={doc}/>
    ));
    const specificCards = specificDocs.map((doc) => (
        <DocumentCard          course_id={course_id}
        document={doc} />
    ));

    return (
        <CustomTabs
            headerColor="success"
            tabs={[
                {
                    tabName: "General Documents",
                    tabIcon: Face,
                    tabContent: <>{generalCards}</>,
                },
                {
                    tabName: "Specific Documents",
                    tabIcon: Chat,
                    tabContent: <>{specificCards}</>,
                },
            ]}
        />
    );
};

export default DocumentViewer;
