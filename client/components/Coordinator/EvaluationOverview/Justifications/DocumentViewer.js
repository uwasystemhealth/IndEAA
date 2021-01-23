// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import CustomTabs from "components/MaterialKit/CustomTabs/CustomTabs.js";
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";

// CUSTOM COMPONENTS
import DocumentCard from "./../Documents/DocumentCard.js";

const DocumentViewer = ({
  documents,
  course_id,
  eocBeingViewed,
}) => {
  // Format of EOC is [Set No].[EOC Number]
  // Eg. 1.2
  // specific = 1.2
  // general = 1
  const specificEocNumber = eocBeingViewed;
  const generalEocNumber = eocBeingViewed?.substring(0,1);
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
    />
  ));
  const specificCards = specificDocs.map((doc) => (
    <DocumentCard
      course_id={course_id}
      document={doc}
    />
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
