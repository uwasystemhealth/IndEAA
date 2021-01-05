// CORE COMPONENTS
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";

// CUSTOM COMPONENTS
import DocumentCard from "components/Coordinator/EvaluationOverview/Documents/DocumentCard.js";

const Documents = () => {
  return (
    <GridContainer>
      <GridItem>
        <DocumentCard
          documentID="adsf"
          title="Design Project Outline"
          createdDate="19 Dec 2020"
          uri="https://docs.google.com/document/d/1rdLcaVBP_z-vE_5-gbaOevRbd6e_vkRjTQpuXyRF_FU/"
          eocs={[1, 2, 3]}
        />
      </GridItem>
    </GridContainer>
  );
};

export default Documents;
