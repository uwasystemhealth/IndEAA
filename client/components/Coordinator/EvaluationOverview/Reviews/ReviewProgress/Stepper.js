// CORE COMPONENTS
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const ReviewStepper = ({ step }) => {
  const steps = [
    <Step key={0}>
      <StepLabel>Read EOCs & DLs</StepLabel>
    </Step>,
    <Step key={1}>
      <StepLabel>Read Documents</StepLabel>
    </Step>,
    <Step key={2}>
      <StepLabel>Review Course</StepLabel>
    </Step>,
    <Step key={3}>
      <StepLabel>Review & Submit</StepLabel>
    </Step>,
  ];

  return (
    <div>
      <Stepper activeStep={step} alternativeLabel>
        {steps}
      </Stepper>
    </div>
  );
};

export default ReviewStepper;
