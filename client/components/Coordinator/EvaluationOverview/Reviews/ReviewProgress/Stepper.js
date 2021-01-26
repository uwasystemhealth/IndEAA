// CORE COMPONENTS
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const ReviewStepper = ({ dones }) => {
    const steps = [
        <Step key={0} active={dones[0]}>
            <StepLabel>Read EOCs & DLs</StepLabel>
        </Step>,
        <Step key={1} active={dones[1]}>
            <StepLabel>Read Documents</StepLabel>
        </Step>,
        <Step key={2} active={dones[2]}>
            <StepLabel>Review Course</StepLabel>
        </Step>,
        <Step key={3} active={dones[3]}>
            <StepLabel>Review & Submit</StepLabel>
        </Step>,
    ];

    return (
        <div>
            <Stepper nonLinear alternativeLabel>
                {steps}
            </Stepper>
        </div>
    );
};

export default ReviewStepper;
