import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Slide from '@material-ui/core/Slide';
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
import { useSnackbar } from "notistack"
// core components
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "components/MaterialKit/Snackbar/SnackbarContent.js";
import Clearfix from "components/MaterialKit/Clearfix/Clearfix.js";
import Button from "components/MaterialKit/CustomButtons/Button.js";

// Redux
import { useSelector, useDispatch } from "react-redux"
import { addNotificationMessage, removeNotificationMessage } from "actions/general"

// Styles
import styles from "assets/jss/nextjs-material-kit/pages/componentsSections/notificationsStyles.js";

const useStyles = makeStyles(styles);


export default function SectionNotifications() {
    // Built from idea of https://github.com/iamhosseindhv/notistack/issues/116
    const snackbar = useSnackbar();
    const dispatch = useDispatch()
    const { enqueueSnackbar, closeSnackbar } = snackbar


    const notifications = useSelector(state => state.general.notifications)

    notifications.forEach(({ key, message, options = {} }) => {
        enqueueSnackbar(message,
            {
                key,
                variant: 'default',
                autoHideDuration: 3000,
                action: (key) => (
                    <Button onClick={() => { closeSnackbar(key) }}>
                        Dismiss
                    </Button>
                ),
                onClose: (event, reason, key) => {
                    // Event that happens after doing a "closeSnackbar action"
                    if (reason === "timeout" || reason === "instructed") {
                        // Remove Notification in the Store
                        dispatch(removeNotificationMessage(key))
                    }
                },
                ...options // Custom Actions, overwrites defaults defined here
            }
        );
    });

    // Shell Component
    // Does not render anything, but uses hooks in order to update the store
    return (
        <></>
    )
}
