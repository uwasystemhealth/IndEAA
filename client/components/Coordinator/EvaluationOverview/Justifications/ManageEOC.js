// CORE COMPONENTS
import Button from "components/MaterialKit/CustomButtons/Button.js";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import GridContainer from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import CustomDropdown from "components/MaterialKit/CustomDropdown/CustomDropdown.js";
import TextField from "@material-ui/core/TextField";
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import HelpIcon from "@material-ui/icons/Help";

// CUSTOM COMPONENTS
import ApplyTo from "./ApplyTo.js";
import DocumentViewer from "./DocumentViewer.js";

// STYLES
import { makeStyles } from "@material-ui/core/styles";
const styles = {};
const useStyles = makeStyles(styles);

import React, { useState } from "react";

const eocs = [
  {
    _id: "a",
    EOCNum: "1.2",
    desc: "aaha",
  },
  {
    _id: "b",
    EOCNum: "1.3",
    desc: "badga",
  },
];

const ManageEOC = ({ title, description }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [developmentLevel, setDevelopmentLevel] = useState("None");

  return (
    <>
      <Button color="white" onClick={() => setModal(true)}>
        <FindInPageIcon />
        View
      </Button>
      <Dialog
        open={modal}
        keepMounted
        onClose={() => setModal(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {title} - {description}
        </DialogTitle>

        <DialogContent>
          <GridContainer>
            <GridItem xs={6}>
              Development Level
              <HelpIcon />
              <CustomDropdown
                buttonText={developmentLevel}
                dropdownList={[
                  "Level 1 - Foundational",
                  "Level 2 - Broad and Coherent",
                  "Level 3 - Advanced",
                  "Level 4 - Specialist",
                ]}
              />
            </GridItem>
            <GridItem xs={6}>
              <ApplyTo eocs={eocs} />
            </GridItem>
            <GridItem xs={6}>
              Justification
              <TextField multiline fullWidth rows={4} variant="filled" />
            </GridItem>
            <GridItem xs={6}>
              <DocumentViewer />
            </GridItem>
          </GridContainer>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageEOC;
