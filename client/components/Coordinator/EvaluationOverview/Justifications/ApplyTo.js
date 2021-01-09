// CORE COMPONENTS
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";

// STYLES
import { makeStyles } from "@material-ui/core/styles";
import checkboxStyles from "assets/jss/nextjs-material-kit/customCheckboxRadioSwitch.js";
const styles = {
    ...checkboxStyles,
};
const useStyles = makeStyles(styles);

const ApplyTo = ({ eocs }) => {
    const classes = useStyles();

    const checkboxes = eocs.map((eoc) => {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        key={eoc._id}
                        checkedIcon={<Check className={classes.checkedIcon} />}
                        icon={<Check className={classes.uncheckedIcon} />}
                        classes={{ checked: classes.checked }}
                    />
                }
                classes={{ label: classes.label }}
                label={`EOC ${eoc.EOCNum}`}
            />
        );
    });

    /* eocs should be loaded from redux store */
    return (
        <Card>
            <CardHeader color="success">Appy to</CardHeader>
            <CardBody>{checkboxes}</CardBody>
        </Card>
    );
};

export default ApplyTo;
