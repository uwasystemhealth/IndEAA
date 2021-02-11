import React, { useState } from 'react';
// material-ui components
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
// @material-ui/icons
import Close from '@material-ui/icons/Close';
// core components
import Button from 'components/MaterialKit/CustomButtons/Button.js';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import modalStyle from 'assets/jss/nextjs-material-kit/modalStyle.js';
const useStyles = makeStyles(modalStyle);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function AreYouSureButton({
    title = 'Are you sure?',
    description = 'Are you sure you want to do this?',
    action,
    actionParameter = [],
    buttonProps = {},
    children,
}) {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Button {...buttonProps} onClick={() => setIsOpen(true)}>
                {children}
            </Button>
            <Dialog
                classes={{
                    root: classes.center,
                    paper: classes.modal,
                }}
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setIsOpen(false)}
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
                        onClick={() => setIsOpen(false)}
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
                    className={classes.modalFooter + ' ' + classes.modalFooterCenter}
                >
                    <Button onClick={() => setIsOpen(false)}>Never Mind</Button>
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            action(...actionParameter);
                        }}
                        color="success"
                    >
            Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
