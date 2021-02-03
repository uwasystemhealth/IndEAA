import React, { useState } from 'react';
// material-ui components
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import People from '@material-ui/icons/People';
// @material-ui/icons
import Close from '@material-ui/icons/Close';

// custom components
import LoadingButton from 'components/Other/LoadingButton.js';

// core components
import Button from 'components/MaterialKit/CustomButtons/Button.js';
import CustomInput from 'components/MaterialKit/CustomInput/CustomInput.js';

// Redux
import { services } from 'store/feathersClient';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import modalStyle from 'assets/jss/nextjs-material-kit/modalStyle.js';
const useStyles = makeStyles(modalStyle);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function Modal({ setCurrentUserSelected, closeModal, isOpen }) {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [createLoading, setCreateLoading] = useState(false);

    const createUser = async (email) => {
        try {
            setCreateLoading(true);
            const response = await services.users.create({ email });
            closeModal();
            setCurrentUserSelected(response.value);
            setCreateLoading(false);
        } catch (error) {
            // Handled by Redux Saga
        }
    };

    const handleSubmit = () => {
        createUser(email);
    };
    return (
        <Dialog
            classes={{
                root: classes.center,
                paper: classes.modal,
            }}
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            disableBackdropClick
            fullWidth
            maxWidth="md"
            scroll="body"
            onClose={() => closeModal()}
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
                    onClick={() => closeModal()}
                >
                    <Close className={classes.modalClose} />
                </IconButton>
                <h4 className={classes.modalTitle}>Creating a New User</h4>
            </DialogTitle>
            <DialogContent id="modal-slide-description" className={classes.modalBody}>
                <CustomInput
                    labelText="Enter Email Address"
                    id="float"
                    formControlProps={{
                        fullWidth: true,
                    }}
                    inputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <People />
                            </InputAdornment>
                        ),
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                    }}
                />
            </DialogContent>
            <DialogActions
                className={classes.modalFooter + ' ' + classes.modalFooterCenter}
            >
                <Button onClick={() => closeModal()}>Never Mind</Button>
                <LoadingButton
                    isLoading={createLoading}
                    buttonProps={{
                        onClick: () => {
                            handleSubmit();
                        },
                        color: 'success',
                    }}
                >
          Save user
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
}
