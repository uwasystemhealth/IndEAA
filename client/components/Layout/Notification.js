import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
// core components
import SnackbarContent from "components/MaterialKit/Snackbar/SnackbarContent.js";
import Clearfix from "components/MaterialKit/Clearfix/Clearfix.js";

// Redux
import { useSelector } from "react-redux"


// Styles
import styles from "assets/jss/nextjs-material-kit/pages/componentsSections/notificationsStyles.js";

const useStyles = makeStyles(styles);


export default function SectionNotifications() {
    const notification = useSelector(state => state.general.notification)
    return (
        <SnackbarContent
            message={
                <span>
                    <b>INFO ALERT:</b> {notification.message}
                </span>
            }
            close
            color={notification.color}
            icon={notification.icon}
        />
    )
}
