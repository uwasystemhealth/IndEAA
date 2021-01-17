// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DesignedCheckBox  from 'components/administrator/DesignedCheckBox';


// STYLES
import { makeStyles } from "@material-ui/core/styles";
import checkboxStyles from "assets/jss/nextjs-material-kit/customCheckboxRadioSwitch.js";
const styles = {
    ...checkboxStyles,
};
const useStyles = makeStyles(styles);

const ApplyTo = ({ eocs ,eocInSame,handleCheck}) => {
    console.log(eocs)
    const classes = useStyles();

    return (
        <Card>
          <CardHeader color="success">Tags</CardHeader>
          <CardBody>
            <List>
              {eocs.map((numberLabel) => (
                  <DesignedCheckBox
                    onClick={() =>handleCheck(numberLabel)}
                    isChecked={ eocInSame.includes(numberLabel)}
                    label={`EOC ${numberLabel}`}
                  ></DesignedCheckBox>
              ))}
            </List>
          </CardBody>
        </Card>
      );
};

export default ApplyTo;
