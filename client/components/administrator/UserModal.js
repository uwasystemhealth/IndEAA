import React, { useState } from 'react';
// material-ui components
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';

// @material-ui/icons
import Close from "@material-ui/icons/Close";
import Placeholder from "@material-ui/icons/Mood";
import Check from "@material-ui/icons/Check";

// core components
import Card from "components/MaterialKit/Card/Card.js";
import CardBody from "components/MaterialKit/Card/CardBody.js";
import CardHeader from "components/MaterialKit/Card/CardHeader.js";
import CustomInput from 'components/MaterialKit/CustomInput/CustomInput.js';
import Button from "components/MaterialKit/CustomButtons/Button.js";
import Grid from "components/MaterialKit/Grid/GridContainer.js";
import GridItem from "components/MaterialKit/Grid/GridItem.js";
import CustomTabs from "components/MaterialKit/CustomTabs/CustomTabs.js";

// Utils
import { getAvailablePermissionsOfUser } from "utils"

// Styles
import { makeStyles } from "@material-ui/core/styles";
import checkboxStyles from "assets/jss/nextjs-material-kit/customCheckboxRadioSwitch.js";
import modalStyle from "assets/jss/nextjs-material-kit/modalStyle.js";
import typographyStyles from "assets/jss/nextjs-material-kit/pages/componentsSections/typographyStyle.js";

const useStyles = makeStyles({ ...modalStyle, ...typographyStyles, ...checkboxStyles });

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal(
    { user, courseEvaluation, closeModal }
) {
    const classes = useStyles();
    const [modalState, setModalState] = useState(
        {
            isAdministrator: user && getAvailablePermissionsOfUser(user.perms).has("Administrator"),
            perms: user && user.perms
        }
    )
    const toggleAdministrator = () => {
        const { isAdministrator } = modalState
        setModalState({ ...modalState, isAdministrator: !isAdministrator })

        // Not yet admin, so add it
        if (!isAdministrator) {
            addPerms(null, "Administrator")
        }
        else {
            removePerms(null, "Administrator")
        }
    }
    const addPerms = (course_id, role) => {
        const { perms } = modalState

        // Make sure that it doesnt exist in the list
        // TODO: Take care of duplicate names of items
        const index = perms.find(perm => perm.course_id == course_id)

        // Does not yet exist so add perm is allowed
        if (index == -1) {
            perms.push({
                course_id, role
            })
            setModalState(...modalState, perms)
        }
    }
    const removePerms = (course_id, role) => {
        const { perms } = modalState

        // Make sure that it doesnt exist in the list
        // TODO: Take care of duplicate names of items
        const index = perms.find(perm => perm.course_id == course_id && perm.role == role)

        // Does not yet exist so add perm is allowed
        if (index != -1) {
            perms.splice(index, 1) // Pop a specific index
            setModalState(...modalState, perms)
        }
    }
    return (
        <Dialog
            classes={{
                root: classes.center,
                paper: classes.modal
            }}
            open={Boolean(user)}
            TransitionComponent={Transition}
            keepMounted
            disableBackdropClick
            fullWidth
            maxWidth='lg'
            scroll='body'
            onClose={() => closeModal()}
        >
            <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={classes.modalHeader}
            >
                <IconButton
                    className={classes.modalCloseButton}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => closeModal()}
                >
                    <Close className={classes.modalClose} />
                </IconButton>
                <h4 className={classes.modalTitle}>{`Editting User - ${user && user.name}`}</h4>
            </DialogTitle>
            <DialogContent
                id="modal-slide-description"
                className={classes.modalBody}
            >
                {user &&
                    (
                        <Grid direction="row" alignItems="center" justify="center">
                            <GridItem md={4}>
                                < BasicInformationField user={user} classes={classes} isAdministrator={modalState.isAdministrator}
                                    toggleAdministrator={toggleAdministrator} />
                            </GridItem>
                            <GridItem md={8}>
                                <CustomTabs
                                    headerColor="primary"
                                    tabs={[
                                        {
                                            tabName: "Coordinator",
                                            tabIcon: Placeholder,
                                            tabContent: (
                                                <List>
                                                    {courseEvaluation}
                                                </List>
                                            )
                                        },
                                        {
                                            tabName: "Reviewer",
                                            tabIcon: Placeholder,
                                            tabContent: (
                                                <p className={classes.textCenter}>
                                                    I think that’s a responsibility that I have, to push
                                                    possibilities, to show people, this is the level that
                                                    things could be at. I will be the leader of a company
                                                    that ends up being worth billions of dollars, because I
                                                    got the answers. I understand culture. I am the nucleus.
                                                    I think that’s a responsibility that I have, to push
                                                    possibilities, to show people, this is the level that
                                                    things could be at.
                                                </p>
                                            )
                                        }
                                    ]}
                                />
                            </GridItem>
                        </Grid>
                    )
                }
            </DialogContent>
            <DialogActions
                className={classes.modalFooter + " " + classes.modalFooterCenter}
            >
                <Button onClick={() => closeModal()}>Cancel</Button>
                <Button onClick={() => { closeModal(); }} color="success">
                    Save
                </Button>
            </DialogActions>
        </Dialog >
    );
}

const BasicInformationField = ({ user, classes, isAdministrator, toggleAdministrator }) => {
    return (
        <>
            <img src={user.picture} className={classes.imgRounded + " " + classes.imgFluid} />
            <CustomInput
                labelText="Name (Cannot be editted)"
                id="disabled"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    disabled: true,
                    value: user.name
                }} />
            <CustomInput
                labelText="Email (Cannot be editted)"
                id="disabled"
                formControlProps={{
                    fullWidth: true
                }}
                inputProps={{
                    disabled: true,
                    value: user.email
                }} />
            <DesignedCheckBox onClick={toggleAdministrator} isChecked={isAdministrator}></DesignedCheckBox>
        </>
    );
}
const DesignedCheckBox = ({ onClick, isChecked }) => {
    const classes = useStyles()
    return (<FormControlLabel
        control={<Checkbox
            tabIndex={-1}
            onClick={onClick}
            checked={isChecked}
            checkedIcon={<Check className={classes.checkedIcon} />}
            icon={<Check className={classes.uncheckedIcon} />}
            classes={{ checked: classes.checked }} />}
        classes={{ label: classes.label }}
        label="Administrator" />);
}

