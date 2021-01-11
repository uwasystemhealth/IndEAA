// CORE COMPONENTS
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";

// CUSTOM COMPONENTS
import DocumentCard from "components/Coordinator/EvaluationOverview/Documents/DocumentCard.js";
import EditModal from "./EditModal.js";

// Store Actions and Redux
import { useDispatch, useSelector } from "react-redux";
import { services } from "store/feathersClient";

import { useState, useEffect } from "react";

const Documents = ({ evaluationID }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    services["course-evaluation"].get({
      _id: evaluationID,
    });
  }, []);

  const courseEval = useSelector((state) => state["course-evaluation"]);
  const evalData = courseEval?.data;

  const documentComps = evalData?.documents.map((doc) => (
    <GridItem key={doc._id} xs={4}>
      <DocumentCard
        documentID={doc._id}
        title={doc.name}
        createdDate={doc.added}
        uri={doc.link}
        eocs={doc.tags}
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
