import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from 'components/MaterialKit/CustomButtons/Button.js';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

const LoadingButton = ({ isLoading, buttonProps, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Button {...buttonProps} disabled={isLoading}>
                {children}
            </Button>
            {isLoading && (
                <CircularProgress size={24} className={classes.buttonProgress} />
            )}
        </div>
    );
};

export default LoadingButton;
