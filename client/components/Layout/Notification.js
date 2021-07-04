// React + Redux + Functionality
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotificationMessage } from 'actions/general';
import { useSnackbar } from 'notistack';

// Material Kit
import Button from 'components/MaterialKit/CustomButtons/Button.js';

// Styles
import styles from 'assets/jss/nextjs-material-kit/pages/componentsSections/notificationsStyles.js';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

export default function SectionNotifications() {
  // Built from idea of https://github.com/iamhosseindhv/notistack/issues/116
  const snackbar = useSnackbar();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = snackbar;


  const notifications = useSelector(state => state.general.notifications);

  notifications.forEach(({ key, message, variant = 'default' }) => {
    enqueueSnackbar(message,
      {
        key,
        variant,
        autoHideDuration: 3000,
        action: (key) => (
          <Button onClick={() => { closeSnackbar(key); }} simple>
                        Dismiss
          </Button>
        ),
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        onClose: (event, reason, key) => {
          // Event that happens after doing a "closeSnackbar action"
          if (reason === 'timeout' || reason === 'instructed') {
            // Remove Notification in the Store
            dispatch(removeNotificationMessage(key));
          }
        },
      }
    );
  });

  // Shell Component
  // Does not render anything, but uses hooks in order to update the store
  return (
    <></>
  );
}
