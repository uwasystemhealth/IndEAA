// CORE COMPONENTS
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";

// CUSTOM COMPONENTS
import DocumentCard from "components/Coordinator/EvaluationOverview/Documents/DocumentCard.js";
import EditModal from "./EditModal.js";

import { useState, useEffect } from "react";

const Documents = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load documents from database
    const docs = [
      {
        _id: "asdfasd",
        name: "Design Project Outline",
        added: new Date("2019-12-19"),
        uri:
          "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
        eocs: [1, 2, 3],
      },
      {
        _id: "asdfasd2",
        name: "RTIO Project - J Slack Something blah blah",
        added: new Date("2019-12-19"),
        uri:
          "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
        eocs: [1.1],
      },
      {
        _id: "asdfasd3",
        name: "Design Project Outline",
        added: new Date("2019-12-19"),
        uri:
          "https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/",
        eocs: [1, 2, 3],
      },
    ];
    setDocuments(docs);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading....</div>;
  }

  const documentComps = documents.map((doc) => (
    <GridItem key={doc._id} xs={4}>
      <DocumentCard
        documentID={doc._id}
        title={doc.name}
        createdDate={doc.added}
        uri={doc.uri}
        eocs={doc.eocs}
      />
    </GridItem>
  ));

  return (
    <>
      <GridContainer>{documentComps}</GridContainer>;
      <EditModal createModal />
    </>
  );
};

export default Documents;
