// React + Redux + Functionality
import React from 'react';
import { useRouter } from 'next/router';

// Utilities
import classnames from 'classnames';

// Material UI
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';

// Icons
import Done from '@material-ui/icons/CheckCircleOutline';
import NotDone from '@material-ui/icons/RadioButtonUnchecked';

// STYLES
import { makeStyles, styled } from '@material-ui/core/styles';
import stepperStyle from 'assets/jss/custom/stepper.js';
import { StepperConnector } from 'assets/jss/custom/stepper';
const useStepperStyles = makeStyles(stepperStyle);
const StyledStepButton = styled(StepButton)({
    '& .MuiStepLabel-active': {
        color: '#FFFF',
    },
});

export const StepIcon = (props) => {
    const stepperClasses = useStepperStyles();
    const icon = props.done ? <Done /> : <NotDone />;
    return (
        <div
            className={classnames(stepperClasses.root, {
                [stepperClasses.active]: props.done,
            })}
        >
            {icon}
        </div>
    );
};

const StepperPathway = ({ review, isCoordinator }) => {
    const stepperClasses = useStepperStyles();
    const router = useRouter();

    // const StepButtonCustom = whiteFont ? StyledStepButton : StepButton; // OVERWRITE BY WHITEFONT

    // Done calculation is determined to be completed or ready for next step
    // if there is an entry atleast once
    const steps = [
        {
            stepName: 'Overview & Eoc',
            done: Boolean(review.step1DevelopmentLevels),
            stepLink: 'overview-and-eoc',
        },
        {
            stepName: 'Read Documents',
            done:
        Boolean((review.step2Documents && review.step2Documents.length > 0)),
            stepLink: 'documents',
        },

        {
            stepName: 'Review Course',
            done:
        Boolean((review.step3Evaluation && review.step3Evaluation.length > 0)),
            stepLink: 'assessment',
        },

        {
            stepName: 'Review & Submit',
            done: Boolean(review.submittedDate),
            stepLink: 'review',
        },
    ];
    return (
        <Stepper alternativeLabel nonLinear className={stepperClasses.stepper}>
            {steps.map(({ stepName, done = false, stepLink }, index) => (
                <Step key={stepName} active={done} connector={<StepperConnector />}>
                    <StepButton
                        icon={StepIcon({ done })}
                        onClick={() => !isCoordinator &&
                            router.push(
                                `/reviewer/${review.course_id}/${index + 1}-${stepLink}`
                            )
                        }
                    >
                        {stepName}
                    </StepButton>
                </Step>
            ))}
        </Stepper>
    );
};

export default StepperPathway;
