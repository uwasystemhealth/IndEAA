import React from 'react';
// material-ui components
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "components/CustomButtons/Button.js";

// import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.js";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal(
    { title = "Are you sure?",
        description = "Are you sure you want to do this?",
        action,
        actionParameter = {},
        setModal
    }) {
    const classes = useStyles();
    return (
        <Dialog
            classes={{
                root: classes.center,
                paper: classes.modal
            }}
            open={modal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setModal(false)}
            aria-labelledby="modal-slide-title"
            aria-describedby="modal-slide-description"
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
                    onClick={() => setModal(false)}
                >
                    <Close className={classes.modalClose} />
                </IconButton>
                <h4 className={classes.modalTitle}>{title}</h4>
            </DialogTitle>
            <DialogContent
                id="modal-slide-description"
                className={classes.modalBody}
            >
                <h5>{description}</h5>
            </DialogContent>
            <DialogActions
                className={classes.modalFooter + " " + classes.modalFooterCenter}
            >
                <Button onClick={() => setModal(false)}>Never Mind</Button>
                <Button onClick={() => { setModal(false); action(...actionParameter) }} color="success">
                    Yes
                </Button>
            </DialogActions>
        </Dialog >
    );
}