import React from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Check from "@material-ui/icons/Check";
import { useStyles } from './UserModal';

const DesignedCheckBox = ({ onClick, isChecked, label, disabled = false }) => {
    const classes = useStyles();
    return (
        <FormControlLabel
            control={<Checkbox
                tabIndex={-1}
                onClick={onClick}
                checked={isChecked}
                disabled={disabled}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                className={{ checked: classes.checked, root: classes.checkRoot }} />}
            className={{ label: classes.label, disabled: !disabled || classes.disabledCheckboxAndRadio }}
            label={label} />
    );
};

export default DesignedCheckBox 