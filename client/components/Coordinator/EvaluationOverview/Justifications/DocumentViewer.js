// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import CustomTabs from "components/MaterialKit/CustomTabs/CustomTabs.js";
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";

// CUSTOM COMPONENTS
import DocumentCard from "./../Documents/DocumentCard.js";

const DocumentViewer = ({ documents }) => {
    const generalDocs = [
        {
            documentID: "asdfasd",
            title: "Design Project Outline",
            createdDate: new Date("2019-12-19"),
            uri:
                "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
            eocs: [1, 2, 3],
        },
        {
            documentID: "asdfasd2",
            title: "RTIO Project - J Slack Something blah blah",
            createdDate: new Date("2019-12-19"),
            uri:
                "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
            eocs: [1.1],
        },
    ];

    const specificDocs = [
        {
            documentID: "asdfasd",
            title: "specific Design Project Outline",
            createdDate: new Date("2019-12-19"),
            uri:
                "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
            eocs: [1, 2, 3],
        },
        {
            _id: "asdfasd2",
            title: "specific !! fdsafRTIO Project - J Slack Something blah blah",
            createdDate: new Date("2019-12-19"),
            uri:
                "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
            eocs: [1.1],
        },
    ];

    const generalCards = generalDocs.map((doc) => (
        <DocumentCard key={doc._id} {...doc} />
    ));
    const specificCards = specificDocs.map((doc) => (
        <DocumentCard key={doc._id} {...doc} />
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
