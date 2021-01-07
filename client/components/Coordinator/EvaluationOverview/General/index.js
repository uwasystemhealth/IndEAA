// CUSTOM COMPONENTS
import Information from "./Information.js";
import OtherInformation from "./OtherInformation.js";
import Controls from "./Controls";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";

const General = () => {
    return (
        <GridContainer>
            <GridItem xs={6}>
                <Information />
            </GridItem>
            <GridItem xs={6}>
                <OtherInformation />
                <Controls />
            </GridItem>
        </GridContainer>
    );
};

export default General;
