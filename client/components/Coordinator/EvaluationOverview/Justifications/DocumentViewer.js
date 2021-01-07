// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import CustomTabs from "components/MaterialKit/CustomTabs/CustomTabs.js";
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";

// CUSTOM COMPONENTS

const DocumentViewer = ({ documents }) => {
  return (
    <CustomTabs
      headerColor="success"
      tabs={[
        {
          tabName: "General Documents",
          tabIcon: Face,
          tabContent: <p>General documents go here</p>,
        },
        {
          tabName: "Specific Documents",
          tabIcon: Chat,
          tabContent: <p>Content for specific EOCs goes here</p>,
        },
      ]}
    />
  );
};

export default DocumentViewer;
