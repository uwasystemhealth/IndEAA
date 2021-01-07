import React, { useState, useEffect } from 'react';
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
    const initialStateModal = {
        isAdministrator: user && getAvailablePermissionsOfUser(user.perms).has("Administrator"),
        isCoordinator: user && getAvailablePermissionsOfUser(user.perms).has("Coordinator"),
        perms: user && user.perms
    }
    const [modalState, setModalState] = useState(initialStateModal)

    // Rerenders on everytime the user changes
    useEffect(() => {
        setModalState(initialStateModal)
    }, [user])

    // Creates a function that toggles a specific role
    const toggleRole = (role) => () => {
        togglePerms(null, role)
    }

    const getIndexOfPermission = (allPerms, course_id, role) => {
        // This checks done are comparison by the course Mongo Object ID
        // Returns undefined if permisions is undefineed
        return allPerms && allPerms.findIndex(perm => perm.course_id === course_id && perm.role === role)
    }

    const togglePerms = (course_id, role) => {
        const { isAdministrator, isCoordinator, perms } = modalState
        const index = getIndexOfPermission(perms, course_id, role)

        if (index == -1 || typeof index === "undefined") { // Permission Does not exist
            perms.push({ course_id, role })
        }
        else { // Permission Exists
            perms.splice(index, 1) // Pop a specific index
        }

        const changedAdminPerm = role === "Administrator" ? !isAdministrator : isAdministrator

        // Null Course Id Coordinator
        const changedCoordinatorPerm = role === "Coordinator" && course_id === null ? !isCoordinator : isCoordinator

        setModalState(
            {
                isAdministrator: changedAdminPerm,
                isCoordinator: changedCoordinatorPerm,
                perms
            })

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
            key={user}
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
                                    isCoordinator={modalState.isCoordinator} toggleRole={toggleRole} />
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
                                                    {courseEvaluation.queryResult.data.map(
                                                        course => (
                                                            <ListItem>
                                                                <DesignedCheckBox
                                                                    onClick={() => togglePerms(course._id, "Coordinator")}
                                                                    isChecked={getIndexOfPermission(modalState.perms, course._id, "Coordinator") >= 0}
                                                                    label={course.courseId}>
                                                                </DesignedCheckBox>
                                                            </ListItem>
                                                        )
                                                    )}
                                                </List>
                                            )
                                        },
                                        {
                                            tabName: "Reviewer",
                                            tabIcon: Placeholder,
                                            tabContent: (
                                                <List>
                                                    {courseEvaluation.queryResult.data.map(
                                                        course => (
                                                            <ListItem>
                                                                <DesignedCheckBox
                                                                    onClick={() => togglePerms(course._id, "Reviewer")}
                                                                    isChecked={getIndexOfPermission(modalState.perms, course._id, "Reviewer") >= 0}
                                                                    label={course.courseId}>
                                                                </DesignedCheckBox>
                                                            </ListItem>
                                                        )
                                                    )}
                                                </List>
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

const BasicInformationField = ({ user, classes, isAdministrator, isCoordinator, toggleRole }) => {
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
            <DesignedCheckBox onClick={toggleRole("Administrator")} isChecked={isAdministrator}
                label={"Administrator"}></DesignedCheckBox>
            <DesignedCheckBox onClick={toggleRole("Coordinator")} isChecked={isCoordinator}
                label={"Coordinator (can create more course reviews)"}></DesignedCheckBox>
        </>
    );
}
const DesignedCheckBox = ({ onClick, isChecked, label }) => {
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
        label={label} />);
}

