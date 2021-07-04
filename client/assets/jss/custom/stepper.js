import { withStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';

const stepperStyle = {
    stepper: {
        backgroundColor: 'transparent',
        padding: '0px',
    },
    root: {
        backgroundColor: '#FEBF00',
        zIndex: 1,
        color: '#FFFFFF',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // alternativeLabel: {
    // 	color: '#FFFFFF',
    // },
    active: {
        backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
};

export const StepperConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
        'linear-gradient( 95deg,#F26923 0%,#01B5AF 50%,#83C562 10%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
        'linear-gradient( 95deg,#F26923 0%,#01B5AF 50%,#83C562 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

export default stepperStyle;
